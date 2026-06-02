import API from "./axiosConfig";

export const createScheduleApi = (jobName, intervalType, intervalValue) => {
  return API.post(
    `/automation/schedule?job_name=${jobName}&interval_type=${intervalType}&interval_value=${intervalValue}`
  );
};

export const getSchedulesApi = () => {
  return API.get("/automation/schedules");
};

export const runScheduleNowApi = (jobId) => {
  return API.post(`/automation/run-now/${jobId}`);
};

export const toggleScheduleApi = (jobId) => {
  return API.patch(`/automation/toggle/${jobId}`);
};