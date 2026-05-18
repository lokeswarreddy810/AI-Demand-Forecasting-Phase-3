from app.ml.models.linear_regression import (
    train_linear_model
)

from app.ml.models.random_forest import (
    train_random_forest
)


def get_best_model(X, y):

    linear_model = train_linear_model(
        X,
        y
    )

    random_forest = train_random_forest(
        X,
        y
    )

    linear_score = linear_model.score(
        X,
        y
    )

    rf_score = random_forest.score(
        X,
        y
    )

    if rf_score > linear_score:

        return {
            "model": random_forest,
            "name": "Random Forest"
        }

    return {
        "model": linear_model,
        "name": "Linear Regression"
    }