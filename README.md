# Advanced AI Demand Forecasting Project

## Project Overview

Advanced AI Demand Forecasting is a full-stack web application designed to forecast future product demand using historical sales data. The system allows users to register, login, upload sales datasets, analyze business performance, generate demand forecasts, and export reports.

The project uses FastAPI for the backend, MySQL for database storage, Pandas and Scikit-learn for data processing and prediction, and React.js with Tailwind CSS for the frontend dashboard.

---

## Tech Stack

### Backend

- FastAPI
- MySQL
- SQLAlchemy
- JWT Authentication
- Pandas
- Scikit-learn
- Python-Jose
- Passlib
- PyMySQL
- ReportLab
- OpenPyXL

### Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Recharts
- Lucide React Icons

---

## Main Features

### Authentication Module

- User registration
- User login
- JWT token generation
- Protected API access
- Secure password hashing

### Dataset Upload Module

- Upload CSV and Excel datasets
- Validate required columns
- Clean missing and duplicate records
- Store sales data in MySQL database

### AI Forecasting Module

- Preprocess uploaded dataset using Pandas
- Train forecasting model using Linear Regression
- Generate future product demand predictions
- Store forecast results in database
- Display forecast output in frontend chart

### Dashboard and Analytics

The dashboard displays:

- Total Sales
- Total Quantity Sold
- Total Products
- Forecast Accuracy
- Monthly Sales Trends
- Top Products

### Reports Module

- Export forecast report as Excel
- Export forecast report as PDF

---

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
Run Backend
python -m uvicorn app.main:app --reload

Backend runs at:

http://127.0.0.1:8000

Swagger API documentation:

http://127.0.0.1:8000/docs
Backend API Endpoints
Authentication
POST /auth/register
POST /auth/login
Users
GET /users/me
Dataset
POST /dataset/upload
GET /dataset/
Analytics
GET /analytics/summary
GET /analytics/monthly-sales
GET /analytics/top-products
Forecast
GET /forecast/predict
Reports
GET /reports/export-excel
GET /reports/export-pdf
Dataset Format

Uploaded dataset must be CSV or Excel.

Required columns:

date
product_name
category
quantity_sold
sales_amount

Example:

date,product_name,category,quantity_sold,sales_amount
2026-01-01,Laptop,Electronics,10,500000
2026-02-01,Laptop,Electronics,15,750000
2026-03-01,Laptop,Electronics,20,1000000
2026-01-05,Mobile,Electronics,25,500000
2026-02-05,Mobile,Electronics,35,700000
2026-03-05,Mobile,Electronics,45,900000
2026-01-08,Headphones,Accessories,40,80000
2026-02-08,Headphones,Accessories,48,96000
2026-03-08,Headphones,Accessories,55,110000

For forecasting, each product should have multiple records on different dates.

Frontend Setup

Go to frontend folder:

cd frontend

Install dependencies:

npm install

Install required packages:

npm install axios react-router-dom recharts lucide-react

Install Tailwind CSS:

npm install -D tailwindcss@3 postcss autoprefixer

Initialize Tailwind:

npx tailwindcss init -p
Run Frontend
npm run dev

Frontend runs at:

http://localhost:5173
Frontend Pages
Login Page

Allows registered users to login using email and password.

Register Page

Allows new users to create an account.

Dashboard Page

Displays analytics such as total sales, total quantity, total products, forecast accuracy, monthly sales trends, and top products.

Dataset Upload Page

Allows users to upload CSV or Excel files containing sales data.

Forecast Page

Generates future product demand predictions and displays them using a line chart.

Reports Page

Allows users to download forecast reports in Excel or PDF format.

Application Flow
1. Start MySQL server
2. Create database
3. Start backend server
4. Start frontend server
5. Register new user
6. Login user
7. Upload sales dataset
8. View dashboard analytics
9. Generate forecast
10. Download reports
Important Notes
Backend must run on port 8000
Frontend must run on port 5173
User must login before accessing protected pages
JWT token is stored in browser localStorage
Dataset must contain required columns
Forecast works better when each product has multiple historical records
MySQL must be running before starting backend
Troubleshooting
PyMySQL Error

If you get:

ModuleNotFoundError: No module named 'pymysql'

Run:

pip install pymysql
Pandas Error

If you get:

ModuleNotFoundError: No module named 'pandas'

Run:

pip install pandas
Bcrypt Error

If registration fails due to bcrypt/passlib issue:

pip uninstall bcrypt -y
pip uninstall passlib -y
pip install bcrypt==4.0.1
pip install passlib[bcrypt]==1.7.4
CORS Error

Make sure backend main.py has CORS enabled for frontend.

Forecast Empty

Make sure:

1. You are logged in
2. Dataset is uploaded
3. Dataset has repeated products on different dates
4. You clicked Refresh Forecast
Conclusion

This project demonstrates a complete full-stack AI-powered demand forecasting system. It includes authentication, dataset upload, data cleaning, machine learning prediction, analytics dashboard, chart visualization, and report generation using FastAPI, MySQL, React, Tailwind CSS, Pandas, and Scikit-learn.