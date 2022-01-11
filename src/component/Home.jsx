import React, { useEffect, useRef, useState } from "react";
import { blobToBase64, getUserAvatar, getUserPhoto, getUserProfile, imgPlaceHolder } from "../graph";

import Header from "./Header/Header";
import ListofTile from "./Tiles/ListofTile";
import "./Home.css";

const Home = () => {
  const isMounted = useRef(false);
  const [userProfile, setUserProfile] = useState();

  const __getFullUserProfile = async () => {
    const userProfile = await getUserProfile();
    if (userProfile?.error) {
      console.log("Error getting profile");
    } else {
      const photoBlob = await getUserPhoto();
      if (photoBlob && !photoBlob?.error) {
        const photo = await blobToBase64(photoBlob);
        userProfile.photo = photo;
      } else {
        console.log("No user photo");
        const name = userProfile.displayName ? userProfile.displayName : userProfile.userPrincipalName;
        const result = await getUserAvatar(name);
        if (result?.error) {
          userProfile.photo = imgPlaceHolder;
        } else {
          const photo = await blobToBase64(result);
          userProfile.photo = photo;
        }
      }

      setUserProfile(userProfile);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isMounted.current === true) {
      __getFullUserProfile();

      console.log(`get user profile ....`);
      //fetch user profile
      //fetch all device
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className="home">
      <Header userProfile={userProfile} />
      <ListofTile />
    </div>
  );
};

export default Home;
