import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";



const LoginFormLogic = () => {
  const { instance } = useMsal();

  const __handleMsLogin = async (loginType) => {
    if (loginType === "popup") {
      // localStorage.clear();
      await instance
        .loginPopup(loginRequest)
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          const error = JSON.stringify(e);
          console.log(error);
        });
    }
  };

  return __handleMsLogin;
};

export default LoginFormLogic;
