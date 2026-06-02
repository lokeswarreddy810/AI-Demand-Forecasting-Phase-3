import {
  createIntegrationApi,
  getIntegrationsApi,
  toggleIntegrationApi,
  testExternalApi,
} from "../api/integrationApi";

export const createIntegration = async (
  name,
  type,
  apiUrl
) => {
  const response = await createIntegrationApi(
    name,
    type,
    apiUrl
  );

  return response.data;
};

export const getIntegrations = async () => {
  const response = await getIntegrationsApi();
  return response.data;
};

export const toggleIntegration = async (
  integrationId
) => {
  const response = await toggleIntegrationApi(
    integrationId
  );

  return response.data;
};

export const testApiConnection = async (
  apiUrl
) => {
  const response = await testExternalApi(apiUrl);
  return response.data;
};