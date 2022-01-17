import { Backdrop, Modal } from "@material-ui/core";

import "./ChildPage.css";
import { useReducer, useEffect, useRef , useState , useContext } from "react";
import logo from "../../../logo/Assets/icons8-multiple_devices.png";
import forwardArrow from "../../../logo/icons8-forward.png";
import backwardArrow from "../../../logo/icons8-back.png";
import {DevicesContext} from "../Tile"

let initialState = {
  title: "",
  body: [],
  isMobileExist: false,
  isNonMobileExist: false,
  isUnManageExist: false,
  showForwardArrow: true,
  showBackwardArrow: false,
  count: 0,
};

const reducer = (state, action) => {
  const { payload } = action;
 
  if (action.type === "forward") {
  } else if (action.type === "backward") {
  } else if (action.type === "initialize") {
    if (payload.mobile.length > 0) return {...state , title: "Mobile Devices" , body:payload.mobile }
    else if (payload.nonMobile.length > 0) return { ...state, title: "Non-Mobile Devices", body: payload.nonMobile ,  };
    else if (payload.unManage.length > 0) return {  ...state , title: "Non-Mobile Devices", body: payload.unManage ,  };
    else  return {...state}
     
  }
};

const ChildPage = ({ isOPen, close, userPhoto }) => {
  const devices = useContext(DevicesContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  

 
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isMounted.current && (devices.mobile.length > 0 || devices.nonMobile.length > 0 || devices.unManage.length > 0 )  ) {
     dispatch({ type: "initialize", payload: devices });
    }
    return () => {
      isMounted.current = false;
      
    };
  }, [isOPen]);

  return (
    <Modal
      className="modal"
      open={isOPen}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      hideBackdrop={false}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        invisible: true,
      }}
    >
      <>
        <div className="child__container">
          <div className="child__header">
            <div className="child__userphoto">
              <img src={userPhoto} alt="userPhoto" />
            </div>
            <div className="child__logo__title">
              <img src={logo} alt="logo" />
              <h1>{state?.title}</h1>
              <div className="child__body">
                {state?.showBackwardArrow && <img src={backwardArrow} alt="backward Arrow" />}
                <textarea name="" id="" cols="30" rows="10" value={state?.body[0]?.displayName}></textarea>
                {state?.showForwardArrow && <img src={forwardArrow} alt="forward Arrow" />}
              </div>
            </div>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default ChildPage;
