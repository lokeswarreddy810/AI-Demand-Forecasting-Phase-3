from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score
)

import numpy as np


def calculate_metrics(y_true, y_pred):

    mae = mean_absolute_error(y_true, y_pred)

    mse = mean_squared_error(y_true, y_pred)

    rmse = np.sqrt(mse)

    r2 = r2_score(y_true, y_pred)

    accuracy = max(0, min(100, r2 * 100))

    return {
        "mae": round(mae, 2),
        "rmse": round(rmse, 2),
        "r2_score": round(r2, 2),
        "accuracy": round(accuracy, 2)
    }