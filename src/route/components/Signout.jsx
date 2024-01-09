import React,{useContext} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import MyContext from "./MyContext";
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

import "./IconStyle.css";

const SignOUt = () => {
    const navigate=useNavigate();
    const {setAuthData}=useContext(MyContext);
    const handleClick=()=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You will SignOut!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Sign Out"
          }).then((result) => {
            if (result.value) {
                  Cookies.remove("data_validation");
                  setAuthData(null);
                  navigate("/");
            }
          });
    }

    return (
        <div className='signOut' onClick={handleClick}>
            <FontAwesomeIcon className='iconStyle' icon={faArrowRightFromBracket} />
        </div>
    );
}
export default SignOUt;
