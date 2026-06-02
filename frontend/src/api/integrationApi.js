import API from "./axiosConfig";

export const createIntegrationApi = (name, type, apiUrl) => {
  return API.post(
    `/integrations/create?integration_name=${name}&integration_type=${type}&api_url=${apiUrl}`
  );
};

export const getIntegrationsApi = () => {
  return API.get("/integrations/");
};

export const toggleIntegrationApi = (integrationId) => {
  return API.patch(`/integrations/toggle/${integrationId}`);
};

export const testExternalApi = (apiUrl) => {
  return API.post(`/integrations/external-api-test?api_url=${apiUrl}`);
};