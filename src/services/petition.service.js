import axios from "../config/axios.config";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const update = (petitionId, status, note) => {
  return axios.put(`/api/petition/update/${petitionId}`, {
    status: status,
    note: note,
  });
};
const updateDescription = (petitionId, status, description) => {
  return axios.put(`/api/petition/update/description/${petitionId}`, {
    status: status,
    description: description,
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
  return axios.post(`/api/petition/waiverfees?studentId=${studentId}`, files, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
const getOnePetition = (petitionId, studentId) => {
  return axios.get(`/api/petition/one/${petitionId}/${studentId}`);
};
const updateFile = (files, studentId, petitionId) => {
  return axios.put(
    `/api/petition/update/waiverfees/${petitionId}?studentId=${studentId}`,
    files,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

const Petition = {
  update,
  getPetitionByStudentId,
  getPetitionAll,
  uploadFile,
  getOnePetition,
  updateFile,
  updateDescription,
};
export default Petition;
