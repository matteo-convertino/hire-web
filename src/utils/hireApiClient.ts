import axios from "axios";

const hireApiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 30000
});

export default hireApiClient;
