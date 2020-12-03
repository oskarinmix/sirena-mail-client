import Axios from "axios";
const useAuth = () => {
  const logOut = async () => {
    try {
      const result = await Axios({
        method: "post",
        url: "http://localhost:4000/auth/logout",
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
        url: "http://localhost:4000/auth/isauth",
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
