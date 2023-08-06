import React from 'react';

import Nav from './Nav';
import './Header.css';

const Header = ()=>{


    return(
        <div className='header'>
            <h3>Typical Login Page</h3>
            <Nav>Log Out</Nav>
        </div>
    )
}

export default Header;