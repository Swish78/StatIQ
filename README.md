# # StatIQ

**StatIQ** is a SaaS application that allows users to upload CSV datasets and receive a detailed data analysis report, complete with customizable visualizations and optional machine learning model building. The application outputs reports in `.tex` format, which can be compiled to PDF for professional-quality documentation.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Project Structure](#project-structure)
6. [Functionality](#functionality)
7. [API Endpoints](#api-endpoints)
8. [Future Enhancements](#future-enhancements)
9. [License](#license)

## Features

- **CSV Upload**: Users can securely upload CSV files for analysis.
- **Customizable Analysis**: Users choose from a range of analyses, including:
  - Descriptive statistics
  - Correlation analysis
  - Data visualizations (histograms, scatter plots, etc.)
  - Trend analysis
  - Outlier detection
- **Machine Learning Model Building**:
  - Users can select features and algorithms to train a model on their dataset.
  - Models are downloadable as `.pkl` files.
- **Report Generation**:
  - Generate LaTeX reports with detailed insights.
  - Option to download as `.tex` or compiled PDF.
  
## Tech Stack

- **Backend**: Django, Django REST Framework
- **Frontend**: React, Bootstrap (or any preferred CSS framework)
- **Machine Learning**: scikit-learn, pandas, numpy
- **Data Visualization**: Matplotlib, Seaborn, Plotly
- **Report Generation**: LaTeX, Jinja2 templates
- **Deployment**: Cloudflare (for security and caching)

## Installation

### Prerequisites
- Python 3.8+
- Node.js 14+
- LaTeX (for report compilation)
- Docker (optional, for containerized deployment)

### Clone the Repository
```bash
git clone https://github.com/yourusername/statiq.git
cd statiq
```

### Backend Setup

1. **Create a Virtual Environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/macOS
   venv\Scripts\activate     # Windows
   ```

2. **Install Requirements**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run Migrations**:
   ```bash
   python manage.py migrate
   ```

4. **Start Django Development Server**:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to Frontend Directory**:
   ```bash
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start React Development Server**:
   ```bash
   npm start
   ```

## Usage

1. **Register and Login**: Access the application by creating an account and logging in.
2. **Upload CSV**: Go to the "Upload" page to upload your CSV file.
3. **Select Analysis Options**: Choose specific analyses, visualizations, and ML models if required.
4. **Generate Report**: Review the analysis and download the `.tex` or PDF report.
5. **Download Model**: If a machine learning model was created, it can be downloaded as a `.pkl` file for offline use.

## Functionality

1. **User Authentication**: Secure login and registration.
2. **Data Upload**: Upload and validate CSV files.
3. **Analysis Selection**: Select options for analysis:
   - **Descriptive Statistics**: Basic statistics like mean, median, etc.
   - **Correlation Analysis**: Correlation matrix to understand relationships.
   - **Visualizations**: Histogram, scatter plots, etc.
   - **Trend Analysis**: Analyze time series data.
   - **Outlier Detection**: Identify data anomalies.
4. **Machine Learning**:
   - Allow users to train a model using scikit-learn.
   - Models are saved and downloadable in `.pkl` format.
5. **Report Generation**:
   - Create a detailed `.tex` report with customizable sections.
   - Download as `.tex` or PDF format.


## Future Enhancements

- **Expanded ML Algorithms**: Add more algorithms (e.g., clustering, neural networks for advanced users).
- **Natural Language Queries**: Allow users to interact using natural language.
- **Advanced Visualizations**: Interactive dashboards with customizable visualizations.
- **Auto-summarization**: Use LLaMA 3 to automatically interpret data and generate insights.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

