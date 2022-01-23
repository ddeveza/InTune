/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from "@azure/msal-browser";
import { baseURL } from "./utility/reusableFunctions";

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */

export const msalConfig = {
  auth: {
    clientId: "37986ce2-d468-4e8b-97f3-2ec853bd3d83",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: `${baseURL}`,
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        // eslint-disable-next-line default-case
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return message;
          case LogLevel.Info:
            //console.info(message);
            if (message.indexOf("msal:loginFailure") !== -1) {
              //sessionStorage.clear();
              alert("Unable to acquire your token from Microsoft. Please login again.");
              window.location.replace(`${baseURL}`);
            }
            if (message.indexOf("msal:loginSuccess") !== -1) {
              //window.location.replace(`${baseURL}/members`);

              console.log("MS Login Success!");
            }
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: [
    "AuditLog.Read.All",
    "Directory.Read.All",
    "SecurityEvents.Read.All",
    "SecurityEvents.ReadWrite.All",
    "openid",
    "profile",
    "email",
    "User.Read",
    "User.ReadBasic.All",
    "DeviceManagementConfiguration.Read.All",
    "DeviceManagementConfiguration.ReadWrite.All",
    "DeviceManagementManagedDevices.Read.All",
    "DeviceManagementManagedDevices.ReadWrite.All",
    "DeviceManagementServiceConfig.Read.All",
    "DeviceManagementServiceConfig.ReadWrite.All",
  ],
};

export const tokenRequest = {
  // scopes: ["Calendars.Read", "Group.ReadWrite.All", "openid", "profile", "Tasks.ReadWrite", "User.Read", "User.ReadBasic.All"]
  scopes: [
    "AuditLog.Read.All",
    "Directory.Read.All",
    "SecurityEvents.Read.All",
    "SecurityEvents.ReadWrite.All",
    "openid",
    "profile",
    "email",
    "User.Read",
    "User.ReadBasic.All",
    "DeviceManagementConfiguration.Read.All",
    "DeviceManagementConfiguration.ReadWrite.All",
    "DeviceManagementManagedDevices.Read.All",
    "DeviceManagementManagedDevices.ReadWrite.All",
    "DeviceManagementServiceConfig.Read.All",
    "DeviceManagementServiceConfig.ReadWrite.All",
  ],
};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
//const group_id = "4d54d079-6aaa-4cc4-aa79-c4c980f0e513";
//const group_id = "5aadb601-c55b-41d8-9c1d-f9cda33c50fa";

export const graphConfig = {
  tenant: "https://graph.microsoft.com/v1.0/organization",
  profile: "https://graph.microsoft.com/v1.0/me",
  photo: "https://graph.microsoft.com/v1.0/me/photos/64x64/$value",
  createAvatar: "https://ui-avatars.com/api/?background=random&size=64&bold=true&name=[user-name]",
  createGroup: `https://graph.microsoft.com/v1.0/groups`,
  addMember: `https://graph.microsoft.com/v1.0/groups/[group-id]/members/$ref`,
  getMembers: `https://graph.microsoft.com/v1.0/groups/[group-id]/members`,
  getMemberPhoto: `https://graph.microsoft.com/v1.0/users/[user-id]/photos/64x64/$value`,
  testingDennis: `https://graph.microsoft.com/beta/me`,
  users: `https://graph.microsoft.com/v1.0/users`,
  currentScore: `https://graph.microsoft.com/v1.0/security/secureScores?$orderby=createDateTime&$top=1`,
  numGlobalAdminAcct: `https://graph.microsoft.com/v1.0/security/secureScores?$orderby=createDateTime&$top=1`,
  percentAcctMFA: `https://graph.microsoft.com/v1.0/security/secureScores?$orderby=createDateTime&$top=1`,
  dormant: `https://graph.microsoft.com/beta/users?$select=displayName,userPrincipalName,mail,id,CreatedDateTime,signInActivity,UserType`,
  dormantUser:`https://graph.microsoft.com/beta/users/[userID]/?$select=displayName,userPrincipalName,mail,id,CreatedDateTime,signInActivity,UserType`,
  devices: `https://graph.microsoft.com/beta/devices?$select=displayName, id, deviceId, registrationDateTime, approximateLastSignInDateTime, operatingSystem, operatingSystemVersion, profileType,trustType`,
  manageDevices: `https://graph.microsoft.com/beta/deviceManagement/managedDevices?$select=deviceName,operatingSystem,osVersion,deviceType,serialNumber,model,manufacturer,imei,phoneNumber,userDisplayName,subscriberCarrier,joinType,enrolledDateTime,lastSyncDateTime,ownerType,managedDeviceName,azureActiveDirectoryDeviceId,autopilotEnrolled`,
  deviceOwner:`https://cors-anywhere.herokuapp.com/https://graph.microsoft.com/beta/devices/[deviceID]/registeredOwners?$select=displayName,mobilePhone,mail,id`
  // getPlans: `https://graph.microsoft.com/v1.0/groups/[group-id]/planner/plans`,
  // getBuckets: "https://graph.microsoft.com/v1.0/planner/plans/[plan-id]/buckets",
  // postBucket: "https://graph.microsoft.com/v1.0/planner/buckets",
  // postPlan: "https://graph.microsoft.com/v1.0/planner/plans",
  // postTask: "https://graph.microsoft.com/v1.0/planner/tasks",
  // updateTask: "https://graph.microsoft.com/v1.0/planner/tasks/[task-id]",
  // updatePlan: "https://graph.microsoft.com/v1.0/planner/plans/[plan-id]",
  // postTaskDetails: "https://graph.microsoft.com/v1.0/planner/tasks/[task-id]/details"
};

/**
 * Payloads:
 * createNewGroup:
 *  {
      "displayName": "Library Assist",
      "mailEnabled": true",
      "mailNickname": "library",
      "securityEnabled": true"
    }
  * addMemberToGroup:
    {
      "@odata.id": "https://graph.microsoft.com/v1.0/directoryObjects/{id}"
    }
 */
