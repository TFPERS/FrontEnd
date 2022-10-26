import axios from "../config/axios.config";
import authHeader from "../services/auth-header";
const getStudentById = (studentId) => {
  return axios.get(`/api/student/me/${studentId}`);
};
const updateProfile = (studentId, formData) => {
  return axios.put(`/api/student/update/${studentId}`, formData, {
    headers: authHeader(),
  });
};
const forgotPassword = (email) => {
  return axios.post(`/api/student/forgot-password`, { email });
};
const getVerify = (studentId, token) => {
  return axios.get(`/api/student/reset-password/${studentId}/${token}`);
};
const resetPassword = (studentId, token, password) => {
  return axios.post(`/api/student/reset-password/${studentId}/${token}`, {
    password,
  });
};
const StudentService = {
  getStudentById,
  updateProfile,
  resetPassword,
  forgotPassword,
  getVerify,
};
export default StudentService;
