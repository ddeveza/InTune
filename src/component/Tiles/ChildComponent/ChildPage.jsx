import { Backdrop, Modal, Button } from "@material-ui/core";
import { Scrollbars } from "react-custom-scrollbars";

import "./ChildPage.css";
import { useReducer, useEffect, useRef } from "react";
import logo from "../../../logo/Assets/icons8-multiple_devices.png";
import forwardArrow from "../../../logo/icons8-forward.png";
import backwardArrow from "../../../logo/icons8-back.png";
import ChildBody from "./ChildBody";

let initialState = {
  title: "",
  body: [],
  existingDevices: { isMobileExist: false, isNonMobileExist: false, isUnManageExist: false },
  showForwardArrow: true,
  showBackwardArrow: false,
  count: 0,
  listOfDevices: [],
};

const reducer = (state, action) => {
  const { payload } = action;
  let count = state.count;
  let newTitle = "";
  if (action.type === "forward") {
    if (state.count < state.listOfDevices.length - 2) {
      newTitle = state.listOfDevices[state.count + 1].name;
      return { ...state, title: newTitle, showBackwardArrow: true, count: state.count + 1, body: state.listOfDevices[state.count + 1].devices };
    } else {
      newTitle = state.listOfDevices[count + 1].name;

      return { ...state, title: newTitle, showBackwardArrow: true, showForwardArrow: false, count: count + 1, body: state.listOfDevices[state.count + 1].devices };
    }
  } else if (action.type === "backward") {
    //check if state.count < state.devices.length - 2 && state.count !== 0
    //else state.count === 0 removebackward and showforwardarrow
    //2==2
    //2 > 1
    //2 > 0
    let newTitle = "";
    let newBody = [];
    let newCount = 0;

    if (state.count <= state.listOfDevices.length - 1 && state.count !== 1) {
      newCount = state.count - 1;
      newTitle = state.listOfDevices[newCount].name;
      newBody = state.listOfDevices[newCount].devices;

      return { ...state, title: newTitle, showForwardArrow: true, count: newCount, body: newBody };
    } else {
      newCount = state.count - 1;
      newTitle = state.listOfDevices[newCount].name;
      newBody = state.listOfDevices[newCount].devices;
      return { ...state, title: newTitle, showForwardArrow: true, showBackwardArrow: false, count: newCount, body: newBody };
    }
  } else if (action.type === "initialize") {
    let newList = payload
      .map((each, index) => {
        if (index === 0 && each.length > 0) return { name: "MOBILE", devices: each };
        if (index === 1 && each.length > 0) return { name: "NON-MOBILE", devices: each };
        if (index === 2 && each.length > 0) return { name: "NON-MANAGED", devices: each };
      })
      .filter((each) => each !== undefined);

    // how to know if mobile , nonmobile or unmanage are existing
    if (newList.length === 1) {
      return { ...state, showForwardArrow: false, title: newList[0].name, body: newList[0].devices, count: 0 };
    } else if (newList.length > 0) {
      return { ...state, showForwardArrow: true, title: newList[state.count].name, body: newList[state.count].devices, listOfDevices: newList, count: 0 };
    } else {
      return { ...state };
    }

    /*  if (payload.mobile.length > 0)  return { ...state, title: "Mobile Devices", body: payload.mobile , isMobileExist:true }
    else if (payload.nonMobile.length > 0) return { ...state, title: "Non-Mobile Devices", body: payload.nonMobile , isNonMobileExist:true}
    else if (payload.unManage.length > 0) return { ...state, title: "Non-Mobile Devices", body: payload.unManage,  isUnManageExist:true}
    else return { ...state }; */
  } else if (action.type === "CLOSE_CHILD_PAGE") {
    return { ...state, count: 0 };
  }
};

const ChildPage = ({ isOPen, close, userPhoto, devices, name }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      dispatch({ type: "initialize", payload: devices });
    }
    return () => {
      isMounted.current = false;
    };
  }, [devices]);

  const __handleForward = () => {
    dispatch({ type: "forward" });
  };

  const __handleBackward = () => {
    dispatch({ type: "backward" });
  };

  

  return (
    <Modal
      className="modal"
      open={isOPen}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      hideBackdrop={true}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        invisible: true,
      }}
    >
      <>
        <div className="child__container">
          <div className="child__header">
            <div className="child__logo__title">
              <img src={logo} alt="logo" />
              <h1>{state?.title} DEVICES</h1>
            </div>
            <div className="child__name__userPhoto">
              <p>{name}</p>
              {/* <p>Denis DEnis dasdasd asdasd</p> */}
              <img src={userPhoto} alt="userPhoto" />
            </div>
          </div>

          <div className="child__body">
            <div className="child__backward">{state?.showBackwardArrow && <img src={backwardArrow} alt="backward Arrow" onClick={__handleBackward} />}</div>

            <Scrollbars autoHide={false}>

              {state?.body?.map((data, index) => {
                /* return <p>{datas.displayName}</p>; */
                  return <ChildBody title={state.title} data={data}></ChildBody>
              })}
            </Scrollbars>

            <div className="child__forward">{state?.showForwardArrow && <img src={forwardArrow} alt="forward Arrow" onClick={__handleForward} />}</div>
          </div>

         
            <Button onClick={close} className="child__btn">CLOSE</Button>
          
        </div>
      </>
    </Modal>
  );
};

export default ChildPage;
