import axios from "../config/axios.config";
import authHeader from "./auth-header";
const dateOfTerm = () => {
  const dateNow = new Date();
  const month = dateNow.getMonth();
  const year = dateNow.getFullYear();
  let term;
  if (month >= 0 && month < 7) {
    term = "1";
  } else {
    term = "2";
  }
  return `${term}/${year}`;
};

const TermService = {
  dateOfTerm,
};
export default TermService;
