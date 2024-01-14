import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import Notes from "./Notes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import "./Home.css";

const Home = (props) => {

    return (
        <div className="Home" >
            {props.authData
                ? <Notes />
                 // : <form action="http://localhost:4000/auth/google" method="Get">
                 : <form action="https://kitten-teddy.cyclic.app/auth/google" method="Get">
                    <button className="googleSignInButton">
                        <FontAwesomeIcon className="googelIcon" icon={faGoogle} style={{ color: "#c12115" }} />
                        google signin
                    </button>
                </form>
            }
        </div>
    )
}

export default Home;