import API from "./axiosConfig";

export const loginApi = (data) => {
  return API.post("/auth/login", data);
};

export const registerApi = (data) => {
  return API.post("/auth/register", data);
};

export const forgotPasswordApi = (email) => {
  return API.post(`/password-reset/forgot-password?email=${email}`);
};

export const resetPasswordApi = (email, newPassword) => {
  return API.post(
    `/password-reset/reset-password?email=${email}&new_password=${newPassword}`
  );
};