import axios from "../config/axios.config";
const getNotificationByStudentId = (studentId) => {
  return axios.get(`/api/notification/student/${studentId}`);
};
const addNotiAgency = (agencyId, description) => {
  return axios.post(`/api/notification/agency/addNotiForAllStd`, {
    description: description,
    agencyId: agencyId,
  });
};
const getNotificationOfAgency = () => {
  return axios.get(`/api/notification/agency`);
};
const getNotiPaginate = (page, size, searchWord) => {
  return axios.get(
    `api/notification/agency/paginate?page=${page}&size=${size}&search=${searchWord}`
  );
};
const deleteNoti = (notiId) => {
  return axios.delete(`api/notification/agency/delete/${notiId}`);
};
const updateNoti = (notiId, descript) => {
  return axios.put(`/api/notification/agency/update/descript/${notiId}`, {
    descript: descript,
  });
};
const Notification = {
  getNotificationByStudentId,
  getNotificationOfAgency,
  addNotiAgency,
  getNotiPaginate,
  deleteNoti,
  updateNoti,
};
export default Notification;
