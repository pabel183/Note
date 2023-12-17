import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import "./AddNote.css";
import "../components/IconStyle.css";
const AddNote=()=>{
    const navigate=useNavigate();
    const [titleValue,setTitleValue]=useState(null);
    const [descriptionValue,setDescriptionValue]=useState(null);
    const handleChange=(event)=>{
        const tempValue=event.target.value;
        if(event.target.name==="title")
        setTitleValue(tempValue);
        else
        setDescriptionValue(tempValue);
    }

    const handleClick=(event)=>{
        if (event.target.name==="saveButton"){
        console.log(event.target.name);
            
        }
        navigate("/notes");
    }
    return(
        <div className='addNote'>
            <div className='addNoteHeader'>
            <FontAwesomeIcon onClick={handleClick} name='backButton' icon={faAngleLeft} className='iconStyle'/>
            <button onClick={handleClick} name='saveButton'>Save</button>
            </div>
            <div className='addNoteMain'>
                <input onChange={handleChange} value={titleValue} name='title' placeholder='Title'/>
                <textarea onChange={handleChange} value={descriptionValue} name='description' placeholder="Type something..."/>
            </div>
        </div>
    )
}

export default AddNote;