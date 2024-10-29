from django.urls import path
from .views import UserRegistrationView, OTPVerifyView, UserProfileUpdateView, HomeView, LogoutView

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('otp/verify/', OTPVerifyView.as_view(), name='otp-verify'),
    path('profile/update/', UserProfileUpdateView.as_view(), name='profile-update'),
    path('logout/', LogoutView.as_view(), name='logout')
]

