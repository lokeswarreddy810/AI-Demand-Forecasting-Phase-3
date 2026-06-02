def create_notification(message, notification_type="Info"):
    return {
        "message": message,
        "type": notification_type
    }


def send_forecast_failure_notification():
    return {
        "message": "Forecast failure notification sent"
    }


def send_report_completion_notification():
    return {
        "message": "Report completion notification sent"
    }