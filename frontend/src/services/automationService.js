import {
  createScheduleApi,
  getSchedulesApi,
  runScheduleNowApi,
  toggleScheduleApi,
} from "../api/automationApi";

export const createSchedule = async (
  jobName,
  intervalType,
  intervalValue
) => {
  const response = await createScheduleApi(
    jobName,
    intervalType,
    intervalValue
  );

  return response.data;
};

export const getSchedules = async () => {
  const response = await getSchedulesApi();
  return response.data;
};

export const runScheduleNow = async (jobId) => {
  const response = await runScheduleNowApi(jobId);
  return response.data;
};

export const toggleSchedule = async (jobId) => {
  const response = await toggleScheduleApi(jobId);
  return response.data;
};