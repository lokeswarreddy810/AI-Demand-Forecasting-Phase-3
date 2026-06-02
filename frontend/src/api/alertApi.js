import API from "./axiosConfig";

export const createAlertApi = (alertType, message, thresholdValue) => {
  return API.post(
    `/alerts/create?alert_type=${alertType}&message=${message}&threshold_value=${thresholdValue}`
  );
};

export const getAlertsApi = () => {
  return API.get("/alerts/");
};

export const markAlertReadApi = (alertId) => {
  return API.patch(`/alerts/mark-read/${alertId}`);
};

export const createThresholdAlertApi = (productName, thresholdValue) => {
  return API.post(
    `/alerts/threshold-alert?product_name=${productName}&threshold_value=${thresholdValue}`
  );
};

export const getAlertSettingsApi = () => {
  return API.get("/alerts/settings");
};

export const updateAlertSettingsApi = (
  emailNotifications,
  forecastFailureAlerts,
  reportCompletionAlerts
) => {
  return API.patch(
    `/alerts/settings?email_notifications=${emailNotifications}&forecast_failure_alerts=${forecastFailureAlerts}&report_completion_alerts=${reportCompletionAlerts}`
  );
};

export const sendEmailNotificationApi = (toEmail, subject, body) => {
  return API.post(
    `/alerts/send-email?to_email=${toEmail}&subject=${subject}&body=${body}`
  );
};

export const createForecastFailureAlertApi = (errorMessage) => {
  return API.post(
    `/alerts/forecast-failure?error_message=${errorMessage}`
  );
};

export const createReportCompletionAlertApi = (reportName) => {
  return API.post(
    `/alerts/report-completion?report_name=${reportName}`
  );
};