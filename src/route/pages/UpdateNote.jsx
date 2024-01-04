import { useState, useContext } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import MyContext from '../components/MyContext';
import Swal from 'sweetalert2';
import SignOUt from '../components/Signout';
import "./UpdateNote.css";
import "../components/IconStyle.css";

import { updateData } from "../../Api";

const UpdateNote = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id, title, description } = location.state?.data;
    const { notes, setNotes } = useContext(MyContext);
    const date = new Date();
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    const currentDate = date.toLocaleDateString('en-US', options).toString();
    const [notesValue, setTitleValue] = useState(
        {
            id,
            title,
            date: null,
            description,
        }
    );

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTitleValue({ ...notesValue, [name]: value, date: currentDate });
    }

    const handleClick = (event) => {
        if (event.target.name === "updateButton") {
                const updatedNotes=notes.map(item=>{
                    if(item.id===notesValue.id) return notesValue;
                    else return item
                }) 
                setNotes(updatedNotes);
                const oldAuthData = Cookies.get("data_validation");
                updateData({data:notesValue,selector:oldAuthData});
                navigate("/notes");
        }
        else {
            navigate("/notes");
        }
    }
    return (
        <div className='updateNote'>
            <div className='updateNoteHeader'>
                <FontAwesomeIcon onClick={handleClick} name='backButton' icon={faAngleLeft} className='iconStyle' />
                <div className="rightHeader">
                    <button onClick={handleClick} name='updateButton'>Update</button>
                    <SignOUt />
                </div>
            </div>
            <div className='updateNoteMain'>
                <input onChange={handleChange} value={notesValue.title} name='title' placeholder='Title' />
                <textarea onChange={handleChange} value={notesValue.description} name='description' placeholder="Type something..." />
            </div>
        </div>
    )
}

export default UpdateNote;