def predict_quantity(model, future_day):
    prediction = model.predict([[future_day]])[0]

    if prediction < 0:
        prediction = 0

    return round(float(prediction), 2)