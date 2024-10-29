from django.contrib.auth import get_user_model
from django_otp.plugins.otp_totp.models import TOTPDevice
from django_otp import verify_token
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .forms import UserRegistrationForm, UserProfileUpdateForm
from .serializers import UserSerializer, UserProfileSerializer
from rest_framework.views import APIView
from django.core.mail import send_mail

User = get_user_model()


class HomeView(APIView):
    """View to check if user is authenticated and return basic profile info if authenticated."""
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request):
        if request.user.is_authenticated:
            serializer = UserProfileSerializer(request.user)
            return Response({'user': serializer.data}, status=status.HTTP_200_OK)
        return Response({'message': 'User is not authenticated.'}, status=status.HTTP_200_OK)


class UserRegistrationView(generics.CreateAPIView):
    """View for user registration with email OTP."""
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        form = UserRegistrationForm(request.data)
        if form.is_valid():
            user = form.save()

            # TOTP device for the user and generate an OTP
            device = TOTPDevice.objects.create(user=user, name="default")
            otp_code = device.token()  # Generate OTP

            subject = "Your StatIQ Registration OTP"
            message = f"Hi {user.first_name},\n\nYour OTP for completing registration is: {otp_code}.\n\nThank you for registering with StatIQ."
            send_mail(
                subject,
                message,
                'swayampatil7918@gmail.com',
                [user.email],
                fail_silently=False,
            )

            return Response({'message': 'User registered successfully. Check your email for OTP.'},
                            status=status.HTTP_201_CREATED)

        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)


class OTPVerifyView(generics.GenericAPIView):
    """View for OTP verification."""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        otp = request.data.get('otp')

        try:
            device = TOTPDevice.objects.get(user=user)
            if verify_token(device, otp):
                user.is_verified = True
                user.save()
                return Response({'message': 'OTP verified successfully.'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid OTP.'}, status=status.HTTP_400_BAD_REQUEST)
        except TOTPDevice.DoesNotExist:
            return Response({'error': 'OTP device not found.'}, status=status.HTTP_400_BAD_REQUEST)


class UserProfileUpdateView(generics.UpdateAPIView):
    """View for updating user profile."""
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def put(self, request, *args, **kwargs):
        user = self.get_object()
        form = UserProfileUpdateForm(request.data, instance=user)
        if form.is_valid():
            form.save()
            return Response({'message': 'Profile updated successfully.'}, status=status.HTTP_200_OK)
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    """View for logging out by blacklisting the JWT token."""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Successfully logged out."}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
