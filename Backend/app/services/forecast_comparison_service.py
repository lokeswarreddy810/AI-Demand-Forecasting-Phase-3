def get_model_comparison():
    return [
        {"model_name": "Linear Regression", "accuracy": 90, "confidence_score": 88},
        {"model_name": "Random Forest", "accuracy": 94, "confidence_score": 91},
        {"model_name": "Gradient Boosting", "accuracy": 96, "confidence_score": 93},
    ]


def get_accuracy_trends():
    return [
        {"month": "January", "linear_regression": 88, "random_forest": 91, "gradient_boosting": 93},
        {"month": "February", "linear_regression": 89, "random_forest": 92, "gradient_boosting": 94},
        {"month": "March", "linear_regression": 90, "random_forest": 94, "gradient_boosting": 96},
    ]


def get_business_recommendations():
    return [
        {"recommendation": "Increase inventory for high-demand products"},
        {"recommendation": "Use Gradient Boosting for complex demand patterns"},
        {"recommendation": "Monitor low-stock items weekly"},
    ]