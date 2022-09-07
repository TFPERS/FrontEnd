import axios from "../config/axios.config";
const updateStatus = (petitionId, status) => {
  console.log(petitionId);
  return axios.put(`/api/petition/update/status/${petitionId}`, {
    status: status,
  });
};
const Petition = {
  updateStatus,
};
export default Petition;
