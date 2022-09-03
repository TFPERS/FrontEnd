import axios from "../config/axios.config";
const getNotificationByStudentId = (studentId) => {
  return axios.get(`/api/notification/student/${studentId}`);
};
const Notification = {
  getNotificationByStudentId,
};
export default Notification;
