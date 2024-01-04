import React,{useContext} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import MyContext from "./MyContext";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

import "./IconStyle.css";
// import "./Signout.css";

const SignOUt = () => {
    const navigate=useNavigate();
    const {setAuthData}=useContext(MyContext);
    const handleClick=()=>{
        Cookies.remove("data_validation");
        setAuthData(null);
        navigate("/");
    }

    return (
        <div className='signOut' onClick={handleClick}>
            <FontAwesomeIcon className='iconStyle' icon={faArrowRightFromBracket} />
        </div>
    );
}
export default SignOUt;
