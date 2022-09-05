import axios from "../config/axios.config";
const getNotificationByStudentId = (studentId) => {
  return axios.get(`/api/notification/student/${studentId}`);
};
const addNotiAgency = (agencyId, description) => {
  console.log(agencyId, description);
  return axios.post(`/api/notification/agency/addNoti`, {
    description: description,
    agencyId: agencyId,
  });
};
const getNotificationOfAgency = () => {
  return axios.get(`/api/notification/agency`);
};
const Notification = {
  getNotificationByStudentId,
  getNotificationOfAgency,
  addNotiAgency,
};
export default Notification;
