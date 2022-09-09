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
const StudentService = {
  getStudentById,
  updateProfile,
};
export default StudentService;
