import logo from '../Images/logo.png';
import React from 'react';

const Header = () => {

    return (
        <div className="brand">
            <img src={logo} alt="appLogo" className="appLogo"></img>
            <h2 className="brandName">Custom Pizza Store</h2>
        </div>
     );
}

export default Header