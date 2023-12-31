import React,{useContext} from "react";
import Card from "../components/Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus,faMagnifyingGlass,faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import MyContext from "../components/MyContext";
import { v4 as uuidv4 } from 'uuid';
import "./Notes.css";
import "../components/IconStyle.css";
import {Delete} from "../../Api";
import Cookies from 'js-cookie';

const Notes = (props) => {
    const navigate=useNavigate();
    const {notes,setNotes,isHeld,setHoldId,setHeld,holdId}=useContext(MyContext);
    
    const deleteNotes=async()=>{

        const oldAuthData = Cookies.get("data_validation");          
        await Delete( {data:holdId,selector:oldAuthData} );
        
        const updateNotes=notes.filter((item)=>!holdId.some((holdItem)=>holdItem.id===item.id));
        setNotes(updateNotes);
        setHoldId([]);
        setHeld(false);
    }

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
            <div className={notes.length<6?"controlledContainer":"notesContainer"} >
                {
                    notes.map((value)=>{
                        const keyValue=uuidv4();
                        return(
                            <Card key={keyValue} id={value.id} title={value.title} description={value.description} date={value.date} />
                        )
                    })
                }
            </div>
            <div className="addIcon">
            {
                isHeld?
                <FontAwesomeIcon onClick={deleteNotes} icon={faTrashCan} style={{color: "#c92115",fontSize:"3rem"}}/>
                :
                <FontAwesomeIcon onClick={()=>navigate("/addNote")} icon={faCirclePlus} style={{color: "#0a0a0a",fontSize:"5rem"}} />
            }
            </div>
        </div>
    )
}

export default Notes;