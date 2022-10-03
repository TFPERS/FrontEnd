import axios from "../config/axios.config";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

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
const uploadFile = (files, studentId) => {
  console.log(files, studentId);
  return axios.post(`/api/petition/waiverfees?studentId=${studentId}`, files, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
const Petition = {
  updateStatus,
  getPetitionByStudentId,
  getPetitionAll,
  uploadFile,
};
export default Petition;
