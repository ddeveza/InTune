import React, { useEffect, useRef, useState } from "react";
import Tile from "./Tile";
import "./ListofTile.css";
import { blobToBase64, getAllDevices, getMemberPhoto, getOwnerDetails, getUserAvatar, imgPlaceHolder, manageDevices } from "../../graph";
import _ from "lodash";

const ListofTile = () => {
  const isMounted = useRef(false);
  const [devicesPerUser, setDevicesPerUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const _getAllDevice = async () => {
    const allDevices = await getAllDevices();

    if (allDevices?.error) {
      console.log("There is an error in api calling all devices");
    } else {
      console.log("Successfully call the api for all devices");

      if (allDevices.length > 0) {
        setError(false);
        
        let listOfManageDevices = await _getAllManageDevices();
       
        let newListoFDevices = [];
        for (const device of allDevices) {
          let temp = {};
          let mobile = false;

          if (device.operatingSystem === "Android" || device.operatingSystem === "iOS" || device.operatingSystem === "iPhone") {
            mobile = true;
          }

          let foundManageDevices = _.findIndex(listOfManageDevices, { azureActiveDirectoryDeviceId: device.deviceId });
          
          if (foundManageDevices > -1) {
            let managed = _.find(listOfManageDevices, { azureActiveDirectoryDeviceId: device.deviceId });
            let lastSyncDateTime = managed.lastSyncDateTime;
            temp = { ...device, manageDevices: true, lastSyncDateTime , managed};
            console.log(temp);
          } else {
            temp = { ...device, manageDevices: false };
          }

          let detailsDeviceOwner = await _getOwnerProfile(device.id);

          const { displayName: devOwner, photo, id: ownerID } = await detailsDeviceOwner[0];

          temp = { ...temp, mobile, devOwner, photo, ownerID };
          newListoFDevices = [...newListoFDevices, temp];
          
          temp = {};
        }
          
        const groupListByUser = _.groupBy(newListoFDevices, "devOwner");

        setDevicesPerUser(groupListByUser);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError(true);
        console.log("0 Devices");
      }
    }

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

  const ArrayOfTiles = () => {
    return _.map(devicesPerUser, (eachDevice, index) => {
      return <Tile key={index} devices={eachDevice} name={index} />;
    });
  };

  return (
    <div className="container">
      <div className="tiles__container">
        {isLoading && <h1>Loading.......</h1>}

        {error && <h1 style={{ color: "red" }}>0 devices found......</h1>}

        {!isLoading && <ArrayOfTiles />}
      </div>
    </div>
  );
};

export default ListofTile;
