import { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import MyContext from '../components/MyContext';
import Swal from 'sweetalert2';
import "./AddNote.css";
import "../components/IconStyle.css";

import {addData} from "../../Api";

const AddNote = () => {
    const navigate = useNavigate();
    const { notes, setNotes } = useContext(MyContext);
    const inputRef=useRef(null);
    const textareaRef=useRef(null);
    const date = new Date();
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    const currentDate = date.toLocaleDateString('en-US', options).toString();
    const [notesValue, setTitleValue] = useState(
        {
            id: null,
            title: "",
            date: null,
            description: "",
            colorIndex:null
        }
    );
    const notesLength=notes.length+1;
    const colorIndex = notesLength%10;
    const handleChange = (event) => {
        const id=uuidv4();
        const { name, value } = event.target;
        if(name==="title"){
            let sliceValue=value.slice(0,80);
            if(value.length>80){
                
                Swal.fire({
                    text:"please give the title within 100 letters",
                    position:"center",
                    width:"15rem",
                    timer:1000,
                    showConfirmButton:false,
                  }
                  );
            }
            setTitleValue({ ...notesValue,id:id, [name]: sliceValue, date: currentDate,colorIndex });
        }
        else{
            let sliceValue=value;
            setTitleValue({ ...notesValue,id:id, [name]: sliceValue, date: currentDate,colorIndex });
        }
    }
    const handleClick = (event) => {

        if (event.target.name === "saveButton" ) { 
            if((notesValue.description==="")){
                Swal.fire({
                    text:"Please fill up your notes",
                    position:"center",
                    width:"15rem",
                    timer:1000,
                    showConfirmButton:false,
                  }
                  );
            }
            else{
                setNotes([...notes, notesValue]);
                 const oldAuthData = Cookies.get("data_validation");
                 addData({data:notesValue,selector:oldAuthData});
                navigate("/notes");
            }
        }
        else {
            navigate("/notes");
        }
        
    }
    useEffect(()=>{
        inputRef.current.focus();
    },[])
    const handleKeyDown=(event)=>{
        if (event.key === "Enter") {
            event.preventDefault();
            textareaRef.current.focus();
          }
        // if(event.key==="Enter"){
        //     event.preventDefault();
        //     textareaRef.current.focus();
        // }
    }
    return (
        <div className='addNote'>
            <div className='addNoteHeader'>
                <FontAwesomeIcon onClick={handleClick} name='backButton' icon={faAngleLeft} className='iconStyle' />
                <div className="addNoterightHeader">
                <button onClick={handleClick} name='saveButton'>Save</button>
                </div>
            </div>
            <div className='addNoteMain'>
                <input ref={inputRef} tabIndex={1} onKeyDown={handleKeyDown} onChange={handleChange} value={notesValue.title} name='title' placeholder='Title' />
                <textarea ref={textareaRef} tabIndex={2} onChange={handleChange} value={notesValue.description} name='description' placeholder="Type something..." />
            </div>
        </div>
    )
}

export default AddNote;