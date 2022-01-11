import React from 'react'
import './Header.css'
import { Button } from '@material-ui/core';
import SignOut from '../SignOut';
import logo from '../../logo/Assets/BeCloudSafe Logo Cropped.png';
const Header = ({userProfile}) => {
    
    return (
        <div className='header'>
            <img src={logo} alt="InTuneLogo" />
            <div className="header__info">
                <div className="header__userProfile">
                    <p className="header__welcomeuse">
                        Welcome, {`${userProfile?.givenName} ${userProfile?.surname}`}
                    </p>
                    <img src= {userProfile?.photo} alt="user" />
                </div>
                <div className="header__btn">
                    <Button className='home_btn'>Home</Button>
                    <SignOut/>
                </div>
            </div>
            
        </div>
    )
}

export default Header
