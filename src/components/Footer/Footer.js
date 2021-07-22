import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div className="main-footer">
            <div className="container">
            <div className="row">
                {/* Column*/}
                <div className="col">
             
                <ui className="list-unstyled">
                    <li><a href="https://www.instagram.com/davegnarly/">¡ DE GERENTE !</a></li>
                    <li><a href="https://www.instagram.com/nothing_loops/">¡ MUSIC !</a></li>
                    <li><a href="https://github.com/armankabir">¡ WEB DEVELOPER !</a></li>
                </ui>
                </div>
            </div>
            <hr />
            <div className="row">
                <p className="col-sm">
                &copy;{new Date().getFullYear()} MENSOZ | All rights reserved 
                </p>
            </div>
            </div>
      </div>
    )
}

export default Footer
