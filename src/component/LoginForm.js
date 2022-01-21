import React from "react";
import { Image } from "react-bootstrap";
import Logo from "../logo/InTune-image.png";
import MSButton from "../logo/Assets/ms-symbollockup_signin_dark.png";
import "./LoginForm.css";
import { Paper, Button } from "@material-ui/core";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

function LoginForm() {
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


  return (
    <div className="loginFormContainer">
      <Paper elevation={6} variant="outlined" square>
        <div id="LoginForm">
          <Image src={Logo} fluid />
          <div className="signInWithMicrosoft">
            <Button onClick={() => __handleMsLogin("popup")}>
              <Image src={MSButton} />
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default LoginForm;
