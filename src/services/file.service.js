import axios from "../config/axios.config";

const getFilePdf = async (filename) => {
  console.log(filename);
  const { data } = await axios.get(`/api/file/receivefilePdf/${filename}`, {
    headers: {
      "Content-type": "application/json",
    },
    responseType: "blob",
  });
  const a = document.createElement("a");
  const url = window.URL.createObjectURL(data);
  a.href = url;
  a.download = filename;
  document.body.append(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};
const File = {
  getFilePdf,
};
export default File;
