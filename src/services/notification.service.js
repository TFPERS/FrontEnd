import axios from "../config/axios.config";
const getNotificationByStudentId = (studentId) => {
  console.log("typeof ", typeof studentId);
  return axios.get(`/api/notification/student/${studentId}`);
};
const Notification = {
  getNotificationByStudentId,
};
export default Notification;
