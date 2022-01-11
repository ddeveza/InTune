import React from "react";
import "./Tile.css";
import CircleIcon from "@mui/icons-material/Circle";
import userLogo from "../../logo/Avatar.png";
import { useToggleModal } from "../../customHook/useToggleModal";
import ChildPage from "./ChildComponent/ChildPage";

const Tile = () => {

  const [toggle, handleToggle] = useToggleModal(false);

  return (
    <div className="tile" onClick={()=>handleToggle()}>
      <div className="tile__head">
        <CircleIcon className="tile__icon" />
        <div className="tile__name__logo">
          <p>Dennis Deveza</p>
          <img src={userLogo} alt="UserPhoto" />
        </div>
      </div>
      <div className="tile__body">
        <div className="first__column">
          {/* iconcircle */}
          <p>Total Devices: 5</p>
          <p>Dormant Devices: 5</p>
          <p>Last Log in: 6-Jan-2021</p>
        </div>
        <div className="second_column">
          <p>Mobile Devices: 5</p>
          <p>Non-Mobile Devices: 5</p>
          <p>Manage Devices</p>
        </div>
      </div>

          <ChildPage toggle={toggle} handleToggle={handleToggle}/>
    </div>
  );
};

export default Tile;
