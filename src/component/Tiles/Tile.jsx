import React, { useRef, useState, useEffect } from "react";
import "./Tile.css";
import CircleIcon from "@mui/icons-material/Circle";
import { useToggleModal } from "../../customHook/useToggleModal";
import ChildPage from "./ChildComponent/ChildPage";
import _ from "lodash";
import { getDormantAcct } from "../../graph";

const Tile = (props) => {
  const [photo, setPhoto] = useState("");
  const [manageDevices, setManageDevices] = useState([]);
  const [unManageDevices, setUnManageDevices] = useState([]);
  const [nonMobile, setNonMobile] = useState([]);
  const [mobile, setMobile] = useState([]);
  const isMounted = useRef(false);
  const [listOfDormanAccount,setListOfDormanAccount] = useState([]);
  const [lastLogIn, setLastLogIn] = useState('');
  const [allDevices , setAllDevices] = useState([]);
  //console.log(props);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);
const formatDate = (value)=> {
    let date = new Date(value);
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    return day + '-' + month + '-' + year;
}
//Get the dormant devices 
  const getDaysDiff = (lastSignIn) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    let firstDate = new Date(lastSignIn);
    let secondDate = Date.now();
    let noOfDaysFromLastSignIn = Math.round(Math.abs((secondDate - firstDate) / oneDay));

    return noOfDaysFromLastSignIn;
  };

  const dormantManageDevices = _.filter(manageDevices, ({ lastSyncDateTime }) => {
    const countDay = getDaysDiff(lastSyncDateTime);
    return countDay > 30;
  });

  const dormantUnManageDevices = _.filter(unManageDevices, ({ approximateLastSignInDateTime }) => {
    const countDay = getDaysDiff(approximateLastSignInDateTime);
    return countDay > 30;
  });
///end of getting dormant devices
  useEffect(() => {
      getDormantAcct(props.devices[0].ownerID).then(res=>{
        setLastLogIn(formatDate(res[0].signInActivity.lastSignInDateTime));
      })
   
  }, [props])
  
  useEffect(() => {
    if (isMounted.current) {
      props.devices[0].photo.then((res) => {
        setPhoto(res);
      });

      setManageDevices(_.filter(props.devices, { manageDevices: true }));
      setUnManageDevices(_.filter(props.devices, { manageDevices: false }));
      setMobile(_.filter(props.devices, { mobile: true }));
      setNonMobile(_.filter(props.devices, { mobile: false }));
      return () => {
        isMounted.current = false;
      };
    }
  }, [props]);

  useEffect(() => {
      setAllDevices([ {mobile},{nonMobile},{unManageDevices}])
   
  }, [mobile,nonMobile,unManageDevices])

  const [toggle, handleToggle] = useToggleModal(false);

  return (
      
    <div className="tile" onClick={() => handleToggle()}>
     
      <div className="tile__head">
        <CircleIcon className="tile__icon" />
        <div className="tile__name__logo">
          <p>{props.name}</p>
          <img src={photo} alt="UserPhoto" />
        </div>
      </div>
      <div className="tile__body">
        <div className="first__column">
          {/* iconcircle */}
          <p>Total Devices: {props.devices.length}</p>
          <p>Dormant Devices: {dormantManageDevices.length + dormantUnManageDevices.length}</p>
          <p>Last Log in: {lastLogIn}</p>
        </div>
        <div className="second_column">
          <p>Mobile Devices: {mobile.length}</p>
          <p>Non-Mobile Devices: {nonMobile.length}</p>
          <p>Manage Devices: {manageDevices.length}</p>
        </div>
      </div>

      <ChildPage toggle={toggle} handleToggle={handleToggle}  devices={allDevices} />
    </div>
  );
};

export default Tile;
