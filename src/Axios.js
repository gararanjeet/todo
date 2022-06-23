import "axios";
import axios from "axios";

const Axios = axios.create({
  //  baseURL:"http://localhost:8000",
   baseURL:"https://3127-49-205-210-233.in.ngrok.io"
});

export default Axios;
