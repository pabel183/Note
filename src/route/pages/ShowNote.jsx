import { useLocation,useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft,faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

import "../components/IconStyle.css";
import "./ShowNote.css";

const ShowNote=()=>{
    const location=useLocation();
    const navigate=useNavigate();
    const {id,title,description,date,colorIndex}=location.state?.data;
    const handleClick=(event)=>{
        if (event.currentTarget.dataset.name==="editButton"){
        navigate("/updateNote", { state: { data: { id: id, title: title, description: description, colorIndex:colorIndex} } });
        }
        else{
        navigate("/notes");
        }
    }
    return(
        <div className="showNote">
             <div className='showNoteHeader'>
            <FontAwesomeIcon onClick={handleClick} icon={faAngleLeft} data-name='backButton' className="iconStyle" /> 
            <div className="showNoterightHeader">
            <FontAwesomeIcon onClick={handleClick} icon={faPenToSquare} data-name='editButton' className="iconStyle" />           
            </div>
            </div>
           <div className="showNoteMain">
            <h1>{title}</h1>
            <h2>{date}</h2>
            <h3>{description}</h3>
            </div>
        </div>
    )
}

export default ShowNote;