import React, { useEffect, useRef, useState } from "react";
import Tile from "./Tile";
import "./ListofTile.css";
import { blobToBase64, getAllDevices, getMemberPhoto, getOwnerDetails, getUserAvatar, imgPlaceHolder, manageDevices } from "../../graph";
import _ from "lodash";
import { ContactPageOutlined } from "@mui/icons-material";

const ListofTile = () => {
  const isMounted = useRef(false);
  const [devicesPerUser, setDevicesPerUser] = useState([]);

  const _getAllDevice = async () => {
    const allDevices = await getAllDevices();

    if (allDevices?.error) {
      console.log("There is an error in api calling all devices");
    } else {
      console.log(allDevices);
      console.log("Successfully call the api for all devices");

      if (allDevices.length > 0) {
        /*  */
        //iterate each devices
        let listOfManageDevices = await _getAllManageDevices();
        console.log(listOfManageDevices);

        /*   let newListoFDevices = _.map(allDevices, (device) => {
          let temp = {};
          let mobile = false;
          //check if mobile or nonmobile  //Android, iOS, iPhone
          if (device.operatingSystem === "Android" || device.operatingSystem === "iOS" || device.operatingSystem === "iPhone") {
            mobile = true;
          }
          //check if manage or unmanage devices
          let foundManageDevices = _.findIndex(listOfManageDevices, { azureActiveDirectoryDeviceId: device.deviceId });
          if (foundManageDevices > -1) {
            let { lastSyncDateTime } = _.find(listOfManageDevices, { azureActiveDirectoryDeviceId: device.deviceId });

            temp = { ...device, manageDevices: true, lastSyncDateTime };
          } else {
            temp = { ...device, manageDevices: false };
          }

          //Get the owner profile
          let devOwner =await _getOwnerProfile(device.id);

          return { ...temp, mobile, devOwner };

          // console.log(owner);
        });
 */
        let newListoFDevices = [];
        for (const device of allDevices) {
          //console.log(device);
          let temp = {};
          let mobile = false;
          //check if mobile or nonmobile  //Android, iOS, iPhone
          if (device.operatingSystem === "Android" || device.operatingSystem === "iOS" || device.operatingSystem === "iPhone") {
            mobile = true;
          }
          //check if manage or unmanage devices
          let foundManageDevices = _.findIndex(listOfManageDevices, { azureActiveDirectoryDeviceId: device.deviceId });
          if (foundManageDevices > -1) {
            let { lastSyncDateTime } = _.find(listOfManageDevices, { azureActiveDirectoryDeviceId: device.deviceId });

            temp = { ...device, manageDevices: true, lastSyncDateTime };
          } else {
            temp = { ...device, manageDevices: false };
          }

          //Get the owner profile
          let detailsDeviceOwner = await _getOwnerProfile(device.id);

          const { displayName: devOwner, photo } = detailsDeviceOwner[0];

          temp = { ...temp, mobile, devOwner, photo };
          newListoFDevices = [...newListoFDevices, temp];
          temp = {};
        }

        const groupListByUser = _.groupBy(newListoFDevices, "devOwner");
        console.log(groupListByUser);
        setDevicesPerUser(groupListByUser);
        //look each devices from alldevices to search in listOfManageDevices
        //if found this manageDevice : true : manageDevice false
        //
      } else {
        console.log("0 Devices");
      }
    }
    //console.log(allDevices);
    return allDevices;
  };

  const _getOwnerProfile = async (id) => {
    let deviceOwner = await getOwnerDetails(id);
    if (deviceOwner?.error) {
      console.log("Error calling the owner details");
    } else {
      //console.log("Successfully Called the  api");
      //console.log(deviceOwner);
      deviceOwner[0].photo = _getOwnerPhoto(deviceOwner[0].id, deviceOwner[0].displayName);

      return deviceOwner;
    }
  };

  const _getOwnerPhoto = async (id, displayName) => {
    const photoBlob = await getMemberPhoto(id);
    if (photoBlob && !photoBlob?.error) {
      const photo = await blobToBase64(photoBlob);
      return photo;
    } else {
      console.log("No user photo");
      const name = displayName;
      const result = await getUserAvatar(name);
      if (result?.error) {
        return imgPlaceHolder;
      } else {
        const photo = await blobToBase64(result);
        return photo;
      }
    }
  };

  const _getAllManageDevices = async () => {
    const listOfManageDevices = await manageDevices();
    if (listOfManageDevices?.error) {
      console.log("There is an error in api calling all devices");
    } else {
      console.log("Successfully call all manage devices");
      return listOfManageDevices;
    }
  };

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      _getAllDevice();
    }
    return () => {
      isMounted.current = false;
    };
  }, []);
  // let arrayTiles = [`Tile1` , `Tile2`,`Tile3`];

  const ArrayOfTiles = () => {
     return  _.map(devicesPerUser, (eachDevice , index) => {
      return <Tile key={index} {...eachDevice} />;
    });

   
  };

  const Tiles = () => {
    return <Tile />;
  };

  return (
    <div className="container">
      <div className="tiles__container">
        <ArrayOfTiles />
        {/*  <Tile />
        <Tile />
        <Tile />
        <Tile /> */}
      </div>
      {/*  */}
    </div>
  );
};

export default ListofTile;
