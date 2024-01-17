import React, { useContext, useEffect, useState, useRef } from "react";
import Card from "../components/Card";
import SignOUt from "../components/Signout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faCirclePlus, faMagnifyingGlass, faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate,useLocation } from "react-router-dom";
import Swal from 'sweetalert2'
import MyContext from "../components/MyContext";
import { v4 as uuidv4 } from 'uuid';
import "./Notes.css";
import "../components/IconStyle.css";
import { fetchData, Delete } from "../../Api";
import Cookies from 'js-cookie';

const Notes = (props) => {
    const navigate = useNavigate();
    const { notes, setNotes, isHeld, setHoldId, setHeld, holdId, tempNotes, setTempNotes } = useContext(MyContext);
    const ref = useRef(null);
    const [isSerachButtonClicked, setSerachButtonClicked] = useState(false);
    const [isSubmit, setSubmit] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    // const deleteNotes = async () => {
    //     const oldAuthData = Cookies.get("data_validation");
    //     await Delete({ data: holdId, selector: oldAuthData });
    //     const updateNotes = notes.filter((item) => !holdId.some((holdItem) => holdItem.id === item.id));
    //     setNotes(updateNotes);
    //     setHoldId([]);
    //     setHeld(false);
    // }

    const handleClick = (event) => {
        const name = event.target.getAttribute("name");
        if (name === "backButton") {
            setNotes(tempNotes);
            setSubmit(false);
            setSerachButtonClicked(false);
        }
        else {
            setSerachButtonClicked(true);
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setSerachButtonClicked(false);
        setSubmit(true);
        console.log("submitted")
    }
    const handleChange = (event) => {
        const value = event.target.value;
        const result = tempNotes.filter(obj => Object.values(obj).some(val => val.toString().toLowerCase().includes(value.toLowerCase())));
        setSearchValue(value);
        if (value === null || value === "") {
            setNotes(tempNotes);
        }
        else {
            setNotes(result);
        }
    }
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setSerachButtonClicked(false);
                setSubmit(true);
                console.log("submitted")
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);

    return (
        <div className={"notes"} >
            <div className="notesHeader">
                {isSubmit
                    ? <FontAwesomeIcon onClick={handleClick} name='backButton' icon={faAngleLeft} className='iconStyle' />
                    // : <h1>Notes</h1>}
                    : <h1 className={isSerachButtonClicked ? "title" : ""} >Notes</h1>}
                <div className={"rightHeader " + (isSerachButtonClicked ? "searchBarRightHeader" : "searchIconRightHeader")}>
                    {isSerachButtonClicked
                        ?
                        <form onSubmit={handleSubmit}>
                            <input onChange={handleChange} value={searchValue} placeholder="Search..." />
                        </form>
                        :
                        <FontAwesomeIcon onClick={handleClick} name='searchButton' icon={faMagnifyingGlass} className="iconStyle" />
                    }
                    <SignOUt />
                </div>
            </div>
            <div className={notes.length < 6 ? "controlledContainer" : "notesContainer"} >
                {
                    notes.map((value) => {
                        const keyValue = uuidv4();
                        return (
                            <Card key={keyValue} id={value.id} title={value.title} description={value.description} date={value.date} colorIndex={value.colorIndex} />
                        )
                    })
                }
            </div>
            <div className="addIcon">
                {/* {
                    isHeld ?
                        <FontAwesomeIcon onClick={deleteNotes} icon={faTrashCan} style={{ color: "#c92115", fontSize: "2.5rem" }} />
                        :
                        // <FontAwesomeIcon onClick={() => navigate("/addNote")} icon={faCirclePlus} style={{ color: "#252525", fontSize: "4rem", backgroundColor: "white", borderRadius: "100%" }} />
                        <FontAwesomeIcon onClick={() => navigate("/addNote")} icon={faPenToSquare} style={{ color: "#252525", fontSize: "2.5rem", backgroundColor: "white", borderRadius: "100%" }} />
                } */}
                <FontAwesomeIcon onClick={() => navigate("/addNote")} icon={faPenToSquare} style={{ color: "#252525", fontSize: "2.5rem", backgroundColor: "white", borderRadius: "100%" }} />
            </div>
        </div>
    )
}

export default Notes;