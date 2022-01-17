import React, { useRef, useEffect, useReducer, createContext } from "react";
import "./Tile.css";
import CircleIcon from "@mui/icons-material/Circle";
import { useToggleModal } from "../../customHook/useToggleModal";
import ChildPage from "./ChildComponent/ChildPage";
import _ from "lodash";
import { getDormantAcct } from "../../graph";

const formatDate = (value) => {
  let date = new Date(value);
  const day = date.toLocaleString("default", { day: "2-digit" });
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.toLocaleString("default", { year: "numeric" });
  return day + "-" + month + "-" + year;
};
//Get the dormant devices
const getDaysDiff = (lastSignIn) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  let firstDate = new Date(lastSignIn);
  let secondDate = Date.now();
  let noOfDaysFromLastSignIn = Math.round(Math.abs((secondDate - firstDate) / oneDay));

  return noOfDaysFromLastSignIn;
};

const _countDormantDevices = (manageDevices, unManageDevices) => {
  let dormantManageDevices = _.filter(manageDevices, ({ lastSyncDateTime }) => {
    const countDay = getDaysDiff(lastSyncDateTime);
    return countDay > 30;
  });

  let dormantUnManageDevices = _.filter(unManageDevices, ({ approximateLastSignInDateTime }) => {
    const countDay = getDaysDiff(approximateLastSignInDateTime);
    return countDay > 30;
  });

  return dormantManageDevices.length + dormantUnManageDevices.length;
};

export const DevicesContext = React.createContext();

const initialState = {
  picture: "",
  name: "",
  totalDevices: 0,
  mobile: [],
  nonMobile: [],
  unManage: [],
  manageDevices: [],
  lastLogin: "",
  dormantDevices: 0,
  error: "",
};

const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case "GET_PHOTO":
      return { ...state, picture: payload };

    case "FILTER_DEVICES":
      let manageDevices = _.filter(payload, { manageDevices: true });
      let unManageDevices = _.filter(payload, { manageDevices: false });
      let mobileDevices = _.filter(payload, { mobile: true });
      let nonMobile = _.filter(payload, { mobile: false });
      let dormantDevices = _countDormantDevices(manageDevices, unManageDevices);

      return { ...state, mobile: mobileDevices, nonMobile: nonMobile, unManage: unManageDevices, manageDevices: manageDevices, dormantDevices: dormantDevices };

    case "LAST_LOGIN":
      return { ...state, lastLogin: formatDate(payload) };
    case "CLEAN_UP":
      return { ...state, picture: "", name: "", totalDevices: 0, mobile: [], nonMobile: [], unManage: [], manageDevices: [], lastLogin: "", dormantDevices: 0, error: "" };

    default:
      return { ...state };
  }
};

const Tile = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { mobile, nonMobile, unManage } = state;
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  useEffect(() => {
    if (isMounted.current) {
      props.devices[0].photo.then((res) => {
        dispatch({ type: "GET_PHOTO", payload: res });
      });

      dispatch({ type: "FILTER_DEVICES", payload: props.devices });
      getDormantAcct(props.devices[0].ownerID)
        .then((res) => {
          dispatch({ type: "LAST_LOGIN", payload: res[0].signInActivity.lastSignInDateTime });
        })
        .catch((err) => console.log(err));
    }
    return () => {
      isMounted.current = false;
      dispatch({ type: "CLEAN_UP" });
    };
  }, []);

  const [toggle, handleToggle] = useToggleModal(false);

  return (
    <>
      <div className="tile" onClick={handleToggle}>
        <div className="tile__head">
          <CircleIcon className="tile__icon" />
          <div className="tile__name__logo">
            <p>{props.name}</p>
            <img src={state.picture} alt="UserPhoto" />
          </div>
        </div>
        <div className="tile__body">
          <div className="first__column">
            {/* iconcircle */}
            <p>Total Devices: {props.devices.length}</p>
            <p>Dormant Devices: {state.dormantDevices}</p>
            <p>Last Log in: {state.lastLogin}</p>
          </div>
          <div className="second_column">
            <p>Mobile Devices: {state.mobile.length}</p>
            <p>Non-Mobile Devices: {state.nonMobile.length}</p>
            <p>Manage Devices: {state.manageDevices.length}</p>
          </div>
        </div>
      </div>
      <DevicesContext.Provider value={{ mobile, nonMobile, unManage }}>
        <ChildPage isOPen={toggle} close={handleToggle}  userPhoto={state.picture} />
      </DevicesContext.Provider>
    </>
  );
};

export default Tile;
