import React,{useContext} from "react";
import Card from "../components/Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import MyContext from "../components/MyContext";

import "./Notes.css";
import "../components/IconStyle.css";

const Notes = () => {
    const navigate=useNavigate();
    const {notes,setNotes}=useContext(MyContext);

    const handleClick=()=>{
      Swal.fire({
        text:"upcomming!",
        position:"top-end",
        width:"10rem",
        timer:500,
        showConfirmButton:false,
      }
      );
    }

    
    return (
        <div className="notes">
            <div className="notesHeader">
                <h1>Notes</h1>
                 <FontAwesomeIcon onClick={handleClick} icon={faMagnifyingGlass} className="iconStyle" /> 
            </div>
            <div className="notesContainer">
                {
                    notes.map((value)=>{
                        return(
                            <Card key={value.id} id={value.id} title={value.title} description={value.description} date={value.date} />
                        )
                    })
                }
            </div>
            <div className="addIcon">
            <FontAwesomeIcon onClick={()=>navigate("/addNote")} icon={faCirclePlus} style={{color: "#0a0a0a",fontSize:"5rem"}} />
            </div>
        </div>
    )
}

export default Notes;