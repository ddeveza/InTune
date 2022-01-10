import { graphConfig, msalConfig, loginRequest } from "../src/authConfig";
import { PublicClientApplication } from "@azure/msal-browser";
import axios from "axios";

const instance = new PublicClientApplication(msalConfig);
//const accounts = instance.getAllAccounts();
/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken
 */

export async function getUsers(accessToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  const options = {
    headers: headers,
  };

  return axios
    .get(graphConfig.users, options)
    .then((response) => response)
    .catch((error) => console.log(error));
}

export async function __checkBreach(value) {
  const myHeaders = new Headers();
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append("hibp-api-key", "2d2e33cafe3f460aba6d185d810aa27b")
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  const eUrl = Buffer.from(`https://haveibeenpwned.com/api/v3/breachedaccount/${value}?truncateResponse=false`).toString("base64");

  return fetch(`https://api.ppm.one/hibp/?url=${eUrl}`, requestOptions)
    .then((response) => response.text())
    .then((result) => result)
    .catch((error) => console.log(error));





}

export async function getUserProfile() {
  const accounts =  instance.getAllAccounts();
  const requestMsal = { ...loginRequest, account: accounts[0] };
  const token = await instance.acquireTokenSilent(requestMsal);

  if (token) {
    const headers = {
      Authorization: `Bearer ${token.accessToken}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };

    const options = {
      headers: headers,
    };
    return axios
      .get(graphConfig.profile, options)
      .then((res) => {
        //console.log(res.data);
        const userData = res.data;
        userData.tenantid = accounts[0].tenantId;
        return userData;
      })
      .catch(function (error) {
        return { error: error };
      });
  } else {
    return { error: "Something went wrong during API Call" };
  }
}

export async function getUserTenant() {
  const accounts =  instance.getAllAccounts();
  const requestMsal = { ...loginRequest, account: accounts[0] };
  const token = await instance.acquireTokenSilent(requestMsal);

  if (token) {
    const headers = {
      Authorization: `Bearer ${token.accessToken}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };

    const options = {
      headers: headers,
    };
    return axios
      .get(graphConfig.tenant, options)
      .then((res) => {
        //console.log(res.data);
        return res.data;
      })
      .catch(function (error) {
        return { error: error };
      });
  } else {
    return { error: "Something went wrong during API Call" };
  }
}

export const getSecurityAPI = async () => {
  const accounts =  instance.getAllAccounts();
  const requestMsal = { ...loginRequest, account: accounts[0] };
  const token = await instance.acquireTokenSilent(requestMsal);

  if (token !== undefined) {
    const headers = {
      Authorization: `Bearer ${token.accessToken}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };

    const options = {
      headers: headers,
    };
    return axios
      .get(graphConfig.numGlobalAdminAcct, options)
      .then(async (res) => {
        const controlScores = await res.data.value[0].controlScores.filter((eachData) => eachData.controlCategory === "Identity");
        
        const { currentScore } = await res.data.value[0]; 
        const { maxScore } = await res.data.value[0];
        //console.log(currentScore)
        //console.log(maxScore)
        const MSSecureScore = (currentScore / maxScore)*100; //calculate the actual Secure score
        
        return { controlScores, MSSecureScore };
      })
      .catch(function (error) {
        return { error: error };
      });
  } else {
    return { error: "Something went wrong during API Call" };
  }
};

export const getDormantAcct = async () => {
  const accounts = instance.getAllAccounts();
  const requestMsal = { ...loginRequest, account: accounts[0] };
  const token = await instance.acquireTokenSilent(requestMsal);

  if (token !== undefined) {
    const headers = {
      Authorization: `Bearer ${token.accessToken}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };

    const options = {
      headers: headers,
    };

    return axios
      .get(graphConfig.dormant, options)
      .then(async (res) => {
        const account = res.data.value;

        const dormantAccount = await account
          .map((eachAccount) => {
            let noOfDaysFromLastSignIn = 0;
            let signInData = eachAccount.signInActivity;
            if (signInData !== undefined) {
              const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
              let firstDate = new Date(signInData.lastSignInDateTime);
              let secondDate = Date.now();
              noOfDaysFromLastSignIn = Math.round(Math.abs((secondDate - firstDate) / oneDay));
            }
            return { ...eachAccount, noOfDaysFromLastSignIn };
          })
          .filter((eachAccount) => eachAccount.signInActivity !== undefined && eachAccount.noOfDaysFromLastSignIn >= 30);

        return dormantAccount;
      })
      .catch(function (error) {
        return { error: error };
      });
  } else {
    return { error: "Something went wrong during API Call" };
  }
};

export async function getUserPhoto() {
  const accounts = await instance.getAllAccounts();
  const requestMsal = { ...loginRequest, account: accounts[0] };
  const token = await instance.acquireTokenSilent(requestMsal);
  if (token !== undefined) {
    const headers = {
      Authorization: `Bearer ${token.accessToken}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };

    const options = {
      headers: headers,
      responseType: "blob",
    };

    return axios
      .get(graphConfig.photo, options)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        return { error: error };
      });
  } else {
    return { error: "Something went wrong during API Call" };
  }
}

export async function getMemberPhoto(userId) {
  const accounts = await instance.getAllAccounts();
  const requestMsal = { ...loginRequest, account: accounts[0] };
  const token = await instance.acquireTokenSilent(requestMsal);
  if (token !== undefined) {
    const headers = {
      Authorization: `Bearer ${token.accessToken}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };

    const options = {
      headers: headers,
      responseType: "blob",
    };

    return axios
      .get(graphConfig.getMemberPhoto.replace("[user-id]", userId), options)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        return { error: error };
      });
  } else {
    return { error: "Something went wrong during API Call" };
  }
}

export async function getUserAvatar(name) {
  const axcon = { responseType: "blob" };
  return axios
    .get(graphConfig.createAvatar.replace("[user-name]", name), axcon)
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      return { error: error };
    });
}

export async function blobToBase64(blob) {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
}

export const imgPlaceHolder =
  "data:image/png;base64,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";
