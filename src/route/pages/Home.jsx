import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import Notes from "./Notes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import bakcgrondImage from "../images/homeLogoBackground.png";
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
                        <img src={bakcgrondImage} alt="notepadImage" />
                    </div>
                    <div className="homeLogin">
                        <h1>Sign in with</h1>
                        <form action="https://kitten-teddy.cyclic.app/auth/google" method="Get">
                            <button className="formDiv">
                                <img src={googleImage} alt="googleIcon" />
                                <h1>Google</h1>
                            </button>
                        </form>

                    </div>
                    </>
            }
        </div>
    )
}

export default Home;