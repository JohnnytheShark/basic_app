import React from 'react';
import logo from '../../assets/icons/Logo.png';
import './Logo.css'

const WebsiteLogo = (props) =>(
    <div>
        <img className="Logo" src={logo} alt="Logo"/>
    </div>
);

export default WebsiteLogo;