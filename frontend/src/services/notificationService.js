import {
  getAlertsApi,
  createAlertApi,
  markAlertReadApi,
  getAlertSettingsApi,
  updateAlertSettingsApi,
  sendEmailNotificationApi,
  createForecastFailureAlertApi,
  createReportCompletionAlertApi,
} from "../api/alertApi";

export const getAlerts = async () => {
  const response = await getAlertsApi();
  return response.data;
};

export const createAlert = async (alertType, message, threshold) => {
  const response = await createAlertApi(alertType, message, threshold);
  return response.data;
};

export const markAlertRead = async (alertId) => {
  const response = await markAlertReadApi(alertId);
  return response.data;
};

export const getAlertSettings = async () => {
  const response = await getAlertSettingsApi();
  return response.data;
};

export const updateAlertSettings = async (
  emailNotifications,
  forecastFailureAlerts,
  reportCompletionAlerts
) => {
  const response = await updateAlertSettingsApi(
    emailNotifications,
    forecastFailureAlerts,
    reportCompletionAlerts
  );

  return response.data;
};

export const sendEmailNotification = async (toEmail, subject, body) => {
  const response = await sendEmailNotificationApi(toEmail, subject, body);
  return response.data;
};

export const createForecastFailureAlert = async (errorMessage) => {
  const response = await createForecastFailureAlertApi(errorMessage);
  return response.data;
};

export const createReportCompletionAlert = async (reportName) => {
  const response = await createReportCompletionAlertApi(reportName);
  return response.data;
};