import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import Notes from "./Notes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import notepadImage from "../images/Layer 0.png";
import googleImage from "../images/google.png";
import "./Home.css";

const Home = (props) => {

    return (
            <div className="Home" >
            {props.authData
                ? <Notes />
                :
                <>
                    <div className="homeLogo">
                        <img src={notepadImage} alt="notepadImage" />
                    </div>
                    <div className="homeLogin">
                        <h1>Sign In With</h1>
                        {/* <form action="http://localhost:4000/auth/google" method="Get"> */}
                        <form action="https://kitten-teddy.cyclic.app/auth/google" method="Get">
                            {/* : <form action="https://kitten-teddy.cyclic.app/auth/google" method="Get"> */}
                            {/* <button className="googleSignInButton">
                                <FontAwesomeIcon className="googelIcon" icon={faGoogle} style={{ color: "#c12115" }} />
                                google
                            </button> */}
                            <button className="formDiv">
                                <img src={googleImage} alt="googleIcon" />
                                <h1>google</h1>
                            </button>
                        </form>

                    </div>
                    </>
            }
        </div>
    )
}

export default Home;