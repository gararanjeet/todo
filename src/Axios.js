import "axios";
import axios from "axios";

const Axios = axios.create({
  //  baseURL:"http://localhost:8000",
   baseURL:"https://8f2c-49-205-211-28.in.ngrok.io"
});

export default Axios;
