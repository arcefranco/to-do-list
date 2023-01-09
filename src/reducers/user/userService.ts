import axios from "axios";
const URL = "https://api-3sxs63jhua-uc.a.run.app/v1/";

const getUser = async () => {
  const response = await axios.get<string>(`${URL}userId`);

  if (response.data) {
    localStorage.setItem("user", response.data);
  } else {
    return false;
  }

  return response.data;
};

const userService = {
  getUser,
};

export default userService;
