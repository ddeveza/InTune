import { Backdrop, Modal } from "@material-ui/core";

import "./ChildPage.css";
import { useReducer, useEffect, useRef } from "react";
import logo from "../../../logo/Assets/icons8-multiple_devices.png";
import forwardArrow from "../../../logo/icons8-forward.png";
import backwardArrow from "../../../logo/icons8-back.png";

let initialState = {
  title: "",
  body: [],
  existingDevices : {isMobileExist: false, isNonMobileExist: false, isUnManageExist: false},
  showForwardArrow: true,
  showBackwardArrow: false,
  count: 0,
  devices : []
  
};

const reducer = (state, action) => {
  const { payload } = action;
  let count = state.count;
  let newTitle = ""
  if (action.type === "forward") {
       if (state.count < state.devices.length-2  ) {
          newTitle = state.devices[state.count+1].name;
           return {...state, title:newTitle , showBackwardArrow: true , count:state.count + 1}
       }else {
         newTitle = state.devices[count+1].name;

         return {...state , title:newTitle ,showBackwardArrow:true , showForwardArrow:false , count:count+1 }
       }
  } else if (action.type === "backward") {
  } else if (action.type === "initialize") {
    
    
   

   let newList = payload.map( (each,index) =>{
        if(index === 0 && each.length > 0) return {name:"MOBILE" , devices:each}
        if(index === 1 && each.length > 0) return {name:"NON-MOBILE" , devices:each}
        if(index === 2 && each.length > 0) return {name:"NON-MANAGED", devices:each}
   }).filter(each => each !== undefined);

    
   // how to know if mobile , nonmobile or unmanage are existing
    if(newList.length === 1) {
        return {...state ,showForwardArrow: false, title:newList[0].name , body:newList[0].devices}
    }else if (newList.length > 0) {
        return {...state , showForwardArrow: true , title:newList[state.count].name, body:newList[state.count].devices , devices : newList}
    }else {
      return {...state}
    }
   
  



  
    

   /*  if (payload.mobile.length > 0)  return { ...state, title: "Mobile Devices", body: payload.mobile , isMobileExist:true }
    else if (payload.nonMobile.length > 0) return { ...state, title: "Non-Mobile Devices", body: payload.nonMobile , isNonMobileExist:true}
    else if (payload.unManage.length > 0) return { ...state, title: "Non-Mobile Devices", body: payload.unManage,  isUnManageExist:true}
    else return { ...state }; */
  }
};

const ChildPage = ({ isOPen, close, userPhoto, devices }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state.count);
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


  const __handleForward = () =>{
    dispatch({type:"forward" })
  }

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
              <h1>{state?.title} DEVICES {state?.count}</h1>
              <div className="child__body">
                {state?.showBackwardArrow && <img src={backwardArrow} alt="backward Arrow" />}
                <textarea name="" id="" cols="30" rows="10" value={state?.body[0]?.displayName}></textarea>
                {state?.showForwardArrow && <img src={forwardArrow} alt="forward Arrow" onClick={__handleForward}/>}
              </div>
            </div>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default ChildPage;
