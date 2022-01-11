import React from "react";
import { useMsal } from "@azure/msal-react";

import { Button, makeStyles } from "@material-ui/core";
import { baseURL } from "../utility/reusableFunctions";


const useStyles = makeStyles({
  logOutBtn: {
    minWidth: "50%",
    maxWidth: "100%",
    fontFamily: "Arial",
    fontWeight: "700",
    width: "160px",
    color: "white",
    padding: "7px",
    backgroundColor: "rgba(54, 54, 54, 1)",
  },
});

function SignOut() {
  const { instance } = useMsal();
  const classes = useStyles();
  const signOutClickHandler = async (instance) => {
    const accounts = await instance.getAllAccounts()[0].homeAccountId;

    const logoutRequest = {
      account: instance.getAccountByHomeId(accounts),
      postLogoutRedirectUri: `${baseURL}`,
    };
    instance.logoutRedirect(logoutRequest);
  };

  return (
    <Button variant="contained" component="label" onClick={() => signOutClickHandler(instance)} className={classes.logOutBtn}>
      <span>Log Out</span>
    </Button>
  );
}

export default SignOut;
