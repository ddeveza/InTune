import React from "react";
import "./ChildBody.css";

const ChildBody = (props) => {

  const _formatDate = (value) => {
    let date = new Date(value);
    const day = date.toLocaleString("default", { day: "2-digit" });
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.toLocaleString("default", { year: "numeric" });
    return day + "-" + month + "-" + year;
  };
  console.log(props)

  const { data } = props;
  return (
    <div className="childbody__container">
      <p>
        <span>Device Name:</span>
        {data.displayName}
      </p>
      <p>
        <span>Device: </span>
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
            <span>Enrolment Type: </span>
          </p>
        </>
      )}
      <p>
        <span>Owner: </span>
        {data.devOwner}
      </p>
      <p>
        <span>Date Enrolled: </span>
        {_formatDate(data?.managed?.enrolledDateTime)}
      </p>
      <p>
        <span>Last Seen:</span>
      </p>
      <p>
        <span>Ownership:</span>
      </p>
      <p>
        <span>Status:</span>
      </p>
    </div>
  );
};

export default ChildBody;
