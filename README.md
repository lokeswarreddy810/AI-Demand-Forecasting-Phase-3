# Advanced AI Demand Forecasting System

## 📌 Project Description

The **Advanced AI Demand Forecasting System** is a full-stack AI-powered business analytics application designed to help organizations analyze sales data, forecast future demand, optimize inventory management, and generate intelligent business insights using Machine Learning models.

This project was developed using **FastAPI** for the backend, **React.js** for the frontend, **MySQL** for database management, and multiple Machine Learning algorithms such as **Linear Regression**, **Random Forest**, and **Gradient Boosting** for accurate demand forecasting and revenue prediction.

The system allows users to upload sales datasets in CSV or Excel format, process the data, visualize analytics through interactive dashboards, generate AI-based forecasting reports, monitor activities, and manage business operations efficiently.

---

# 🚀 Key Features

## 🔐 Authentication & Security
- User Registration & Login
- JWT Token-Based Authentication
- Protected APIs & Secure Access

## 📂 Dataset Management
- Upload CSV/Excel Sales Datasets
- Dataset Validation
- Store Datasets in MySQL Database
- Dataset Listing & Management

## 📊 Dashboard Analytics
- Total Sales Analytics
- Monthly Sales Trends
- Top Product Analysis
- Region-wise Sales Analytics
- Category-wise Sales Analytics
- Forecast Accuracy Metrics
- Revenue Prediction Analytics
- Inventory Risk Analysis

## 🤖 AI Demand Forecasting
- Demand Prediction using Machine Learning
- Multiple Forecasting Models:
  - Linear Regression
  - Random Forest
  - Gradient Boosting
- Seasonal Sales Prediction
- Forecast Revenue Calculation
- Inventory Recommendations

## 📑 Reports Module
- AI Business Insights
- Forecast Reports
- Revenue Reports
- Forecast Comparison Reports
- Downloadable Analytics Reports

## 👨‍💼 Admin Dashboard
- User Monitoring
- Dataset Monitoring
- Forecast Monitoring
- Activity Tracking
- Centralized System Management

## 📈 Monitoring System
- Dataset Upload Logs
- Forecast Activity Logs
- User Activity Monitoring
- System Tracking

## 🌙 Frontend Features
- Responsive UI Design
- Dark Mode Support
- Interactive Charts & Graphs
- Global Search Functionality
- Scrollable Data Tables
- Real-Time Dashboard Updates

---

# 🛠️ Technologies Used

## Backend
- FastAPI
- Python
- SQLAlchemy ORM
- Pydantic
- JWT Authentication
- Pandas
- Scikit-learn
- MySQL

## Frontend
- React.js
- Tailwind CSS
- Axios
- Recharts

## Machine Learning Models
- Linear Regression
- Random Forest
- Gradient Boosting

---

# 🤖 Machine Learning Models Used

## Linear Regression
Used for simple trend forecasting based on historical sales patterns.

## Random Forest
Used for accurate and stable forecasting using multiple decision trees.

## Gradient Boosting
Used for advanced AI forecasting by improving previous prediction errors step-by-step.

---

# 📌 Project Workflow

```text
User Login/Register
        ↓
Upload Dataset
        ↓
Dataset Validation & Storage
        ↓
Analytics Processing
        ↓
AI Forecast Generation
        ↓
Revenue Prediction
        ↓
Inventory Risk Analysis
        ↓
Dashboard Visualization
        ↓
Reports & Monitoring



## Project Structure

```txt
Task5/
│
├── Backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── endpoints/
│   │   │       │   ├── auth.py
│   │   │       │   ├── users.py
│   │   │       │   ├── datasets.py
│   │   │       │   ├── forecasting.py
│   │   │       │   ├── analytics.py
│   │   │       │   └── reports.py
│   │   │       └── router.py
│   │   │
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── database.py
│   │   │   ├── security.py
│   │   │   └── dependencies.py
│   │   │
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   ├── dataset.py
│   │   │   ├── forecast.py
│   │   │   └── report.py
│   │   │
│   │   ├── schemas/
│   │   │   ├── auth.py
│   │   │   ├── user.py
│   │   │   ├── dataset.py
│   │   │   ├── forecast.py
│   │   │   └── report.py
│   │   │
│   │   ├── services/
│   │   │   ├── auth_service.py
│   │   │   ├── dataset_service.py
│   │   │   ├── forecasting_service.py
│   │   │   ├── analytics_service.py
│   │   │   └── report_service.py
│   │   │
│   │   ├── ml/
│   │   │   ├── preprocessing.py
│   │   │   ├── train_model.py
│   │   │   └── predict.py
│   │   │
│   │   ├── utils/
│   │   │   ├── csv_handler.py
│   │   │   ├── excel_handler.py
│   │   │   ├── pdf_generator.py
│   │   │   └── validators.py
│   │   │
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axiosConfig.js
    │   │
    │   ├── components/
    │   │   ├── Layout.jsx
    │   │   ├── Sidebar.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── StatCard.jsx
    │   │   └── charts/
    │   │       ├── SalesTrendChart.jsx
    │   │       ├── TopProductsChart.jsx
    │   │       └── ForecastChart.jsx
    │   │
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Upload.jsx
    │   │   ├── Forecast.jsx
    │   │   └── Reports.jsx
    │   │
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    │
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.js
Database Setup

Create a MySQL database:

CREATE DATABASE ai_demand_db;

Tables are automatically created by SQLAlchemy when the backend starts.

Backend Setup

Go to backend folder:

cd Backend

Create virtual environment:

python -m venv venv

Activate virtual environment:

venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt
Backend .env File

Create .env inside the Backend folder:

DATABASE_URL=mysql+pymysql://root:your_mysql_password@localhost/ai_demand_db
JWT_SECRET=advanced_ai_secret_key
JWT_ALGORITHM=HS256

Replace your_mysql_password with your actual MySQL password.

Backend Requirements
fastapi
uvicorn
sqlalchemy
pymysql
pandas
numpy
scikit-learn
python-dotenv
python-multipart
passlib[bcrypt]==1.7.4
bcrypt==4.0.1
python-jose
openpyxl
reportlab
pydantic[email]


📂 Backend Modules
Authentication Module
Dataset Upload Module
Forecasting Module
Analytics Module
Reports Module
Monitoring Module
Admin Module
AI Optimization Module

📂 Frontend Modules
Dashboard
Datasets
Upload Dataset
Forecast
Reports
AI Optimization
Admin Dashboard
Monitoring
Notifications

📌 Database Tables
users
sales_data
forecast_results
activity_logs
📈 Analytics Included
Monthly Sales Trends
Top Product Analysis
Category-wise Sales Analytics
Region-wise Sales Analytics
Revenue Prediction Analytics
Inventory Risk Analysis
Forecast Accuracy Analysis

📌 Future Enhancements
Deep Learning Forecasting Models
Real-Time Forecasting
Cloud Deployment
Redis Caching
Automated Report Scheduling
Live Notifications
Advanced Business Intelligence
Role-Based Access Control


📚 Learning Outcomes

This project helped in learning:

Full Stack Development
FastAPI Backend Development
React Frontend Development
JWT Authentication
Machine Learning Integration
AI Forecasting Techniques
Dashboard Analytics
Database Management
API Integration
Error Handling
Monitoring Systems


📌 Conclusion

The Advanced AI Demand Forecasting System is a scalable AI-powered analytics platform that helps businesses perform demand forecasting, inventory optimization, sales analysis, revenue prediction, and intelligent decision-making through a modern full-stack web application.