import React, { useEffect, useState , useRef } from "react";
import "./ChildBody.css";
import CircleIcon from "@mui/icons-material/Circle"

const ChildBody = (props) => {

  const [status, setStatus] = useState("");
  const isMounted = useRef(false);



  const _formatDate = (value) => {
    let date = new Date(value);
    const day = date.toLocaleString("default", { day: "2-digit" });
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.toLocaleString("default", { year: "numeric" });
    return day + "-" + month + "-" + year;
  };


  const _getDaysDiff = (lastSignIn) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    let firstDate = new Date(lastSignIn);
    let secondDate = Date.now();
    let noOfDaysFromLastSignIn = Math.round(Math.abs((secondDate - firstDate) / oneDay));
  
    return noOfDaysFromLastSignIn;
  };

  useEffect ( ()=> {
      isMounted.current = true
      return ()=>{
        isMounted.current = false
      }
  },[])


  useEffect (()=> {

      if (isMounted.current) {
        const lastLoginDate =   data.manageDevices? _formatDate(data.managed.lastSyncDateTime) : _formatDate(data.approximateLastSignInDateTime)
        const noOfDayse = _getDaysDiff (lastLoginDate);
        if (noOfDayse > 90) setStatus("F5055B") 
        else if (noOfDayse > 30) setStatus("FFBF00")
        else setStatus("5BF505")
        
      }
   
  }, [props])

 
  const { data } = props;
  return (
    <div className="childbody__container">
      <p>
        <span>Device Name:</span>
        {data.manageDevices ? data.managed.deviceName : data.displayName}
      </p>
      <p>
        <span>Device:</span>
        {data?.managed?.manufacturer}
      </p>
      <p>
        <span>Operating System:</span>
        {data.operatingSystem}
      </p>
      {(props.title === "MOBILE" || props.title === "NON-MOBILE") && (
        <p>
          <span>Serial Number:</span>
          {data.managed?.serialNumber}
        </p>
      )}
      {props.title === "MOBILE" && (
        <>
          <p>
            <span>IMEI:</span>
            {data?.managed?.imei}
          </p>
          <p>
            <span>Phone Number:</span>
            {data.managed.phoneNumber}
          </p>
          <p>
            <span>Carrier:</span>
             {data.managed?.subscriberCarrier}
          </p>
        </>
      )}
      {props.title === "NON-MOBILE" && (
        <>
          <p>
            <span>Autopilot Enrolled:</span>
            {data?.managed?.autopilotEnrolled ? "Yes" : "No"}
          </p>
          <p>
            <span>Enrolment Type:</span>
            {data.managed.joinType}
          </p>
        </>
      )}
      <p>
        <span>Owner:</span>
        {data.devOwner}
      </p>
      <p>
        <span>Date Enrolled: </span>
        {data.manageDevices ?  _formatDate(data?.managed?.enrolledDateTime) : _formatDate(data.registrationDateTime)}
      </p>
      <p>
        <span>Last Seen:</span>
        {data.manageDevices? _formatDate(data.managed.lastSyncDateTime) : _formatDate(data.approximateLastSignInDateTime)}
      </p>
      <p>
        
        {data.manageDevices && <><span>Ownership:</span>{data.managed.ownerType}</>}
      </p>
      <p className="childbody__status">
        <span>Status:</span>
        <CircleIcon className="tile__icon" style={{ color:status }} />
      </p>
    </div>
  );
};

export default ChildBody;
