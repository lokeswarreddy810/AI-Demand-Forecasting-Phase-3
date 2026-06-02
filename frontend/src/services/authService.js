import {
  loginApi,
  registerApi,
  forgotPasswordApi,
  resetPasswordApi,
} from "../api/authApi";

export const loginUser = async (data) => {
  const response = await loginApi(data);
  return response.data;
};

export const registerUser = async (data) => {
  const response = await registerApi(data);
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await forgotPasswordApi(email);
  return response.data;
};

export const resetPassword = async (email, password) => {
  const response = await resetPasswordApi(email, password);
  return response.data;
};