import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../images/PngItem_1674290.png";
import "./footer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons"

const Footer = ()=>{
  return (
    <div className='footer-container'>
        <div>
        <Link to="/">
          <img className="footer-logo" src={logo} alt="logo" />
        </Link>
        </div>
        <div>
      
        </div>
        <div>
        <FontAwesomeIcon className='icon' icon={faFacebook}/>
        
        <FontAwesomeIcon className='icon' icon={faInstagram}/>

        <FontAwesomeIcon className='icon' icon={faLinkedin}/>
        </div>
        
    </div>
  )
}

export default Footer