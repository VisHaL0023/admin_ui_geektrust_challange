import axios from "axios";

const BACKEND_ENDPOINT =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

export const fetchUserData = async () => {
  try {
    const response = await axios.get(`${BACKEND_ENDPOINT}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
