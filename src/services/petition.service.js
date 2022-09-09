import axios from "../config/axios.config";
const updateStatus = (petitionId, status) => {
  return axios.put(`/api/petition/update/status/${petitionId}`, {
    status: status,
  });
};
const getPetitionByStudentId = (studentId, page, size, searchWord) => {
  return axios.get(
    `/api/petition/student/${studentId}?page=${page}&size=${size}&search=${searchWord}`
  );
};
const getPetitionAll = (page, size, searchWord) => {
  return axios.get(
    `/api/petition/paginate?page=${page}&size=${size}&search=${searchWord}`
  );
};
const Petition = {
  updateStatus,
  getPetitionByStudentId,
  getPetitionAll,
};
export default Petition;
