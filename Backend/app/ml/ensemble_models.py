from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.linear_model import LinearRegression


def train_ensemble_models(X, y):
    models = {
        "Linear Regression": LinearRegression(),
        "Random Forest": RandomForestRegressor(
            n_estimators=100,
            random_state=42
        ),
        "Gradient Boosting": GradientBoostingRegressor(
            n_estimators=100,
            random_state=42
        )
    }

    trained_models = {}

    for name, model in models.items():
        model.fit(X, y)
        score = model.score(X, y)

        trained_models[name] = {
            "model": model,
            "score": score
        }

    best_model_name = max(
        trained_models,
        key=lambda name: trained_models[name]["score"]
    )

    return {
        "model": trained_models[best_model_name]["model"],
        "name": best_model_name,
        "score": trained_models[best_model_name]["score"],
        "all_scores": {
            name: round(data["score"], 4)
            for name, data in trained_models.items()
        }
    }