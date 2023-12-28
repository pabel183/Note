import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import Notes from "./Notes";

const Home = (props) => {

    return (
        <div className="Home" >
            {props.authData 
            ?<Notes />
            :<form action="http://localhost:4000/auth/google" method="Get">
                <h1>{props.authData}</h1>
                <button>google signin</button>
            </form> 
                }
        </div>
    )
}

export default Home;