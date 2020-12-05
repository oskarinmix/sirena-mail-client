/* eslint-disable no-undef */
import Axios from "axios";
const useAuth = () => {
  const logOut = async () => {
    try {
      const result = await Axios({
        method: "post",
        url: `${process.env.REACT_APP_HOST}/auth/logout`,
        withCredentials: true,
      });
      return result;
    } catch (error) {
      return error;
    }
  };
  const isAuth = async () => {
    try {
      const result = await Axios({
        method: "get",
        url: `${process.env.REACT_APP_HOST}/auth/isauth`,
        withCredentials: true,
      });
      return result;
    } catch (error) {
      return error;
    }
  };

  return { isAuth, logOut };
};

export default useAuth;
