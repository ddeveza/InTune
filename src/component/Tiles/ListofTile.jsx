import React, { useEffect, useRef, useState } from "react";
import Tile from "./Tile";
import "./ListofTile.css";
import { getAllDevices, manageDevices } from "../../graph";

const ListofTile = () => {

   
  const isMounted = useRef(false);
  const [devices, setDevices] = useState([]);

  const _getAllDevice =async () => {
    const allDevices = await getAllDevices();

    if (allDevices?.error){
      console.log('There is an error in api calling all devices');
    }else {
      console.log(allDevices);
      console.log('Successfully call the api for all devices');
      
      if (allDevices.length > 0) {
         //iterate each devices
         let listOfManageDevices = _getAllManageDevices();
      }else {
        console.log('0 Devices');
      }
    }
    //console.log(allDevices);
    return allDevices;
  }


  const _getAllManageDevices = async () => {
    const listOfManageDevices = await manageDevices();
    if (listOfManageDevices?.error) {
      console.log('There is an error in api calling all devices')
    }else {
      console.log('Successfully call all manage devices');
      return listOfManageDevices;
    }
  }

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    }
  }, [])
  
  useEffect(() => {
    if (isMounted.current) {
       _getAllDevice();
    }
    return () => {
      isMounted.current = false;
    }
  }, [])
  // let arrayTiles = [`Tile1` , `Tile2`,`Tile3`];

  /*  const Tiles = ()=> {
        return arrayTiles.map(tile => {
            return <Tile/>
        })
    } */

  const Tiles = () => {
    return <Tile />;
  };

  return (
    <div className="container">
      <div className="tiles__container">
        {/* <Tiles/> */}
        <Tile />
        <Tile />
        <Tile />
        <Tile />
      </div>
      {/*  */}
    </div>
  );
};

export default ListofTile;
