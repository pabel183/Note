import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "./MyContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faEllipsis, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import { fetchData,Delete } from "../../Api";
import Cookies from 'js-cookie';

import "./Card.css";

const Card = (props) => {
    const navigate = useNavigate();
    const { notes, setNotes, isHeld, setHoldId, setHeld, holdId, tempNotes, setTempNotes } = useContext(MyContext);
    const [cardId,setCardId]=useState([]);
    const [selectedCard,setSelectedCard]=useState(false);
    const cardColor = ["#E6E6FA", "#B0E0E6", "#FFB6C1", "#FFE4E1", "#FFDAB9", "#FFFACD", "#AFEEEE", "#F0FFF0", "#FFF0F5", "#F0F8FF"];
    //   const cardColor = ["Lavender", "PowderBlue", "LightPink", "MistyRose", "PeachPuff", "LemonChiffon", "PaleTurquoise", "Honeydew", "LavenderBlush", "AliceBlue"];
    // let colorIndex=0;
    // notes.map((object)=>{
    //     if(object.id===props.id){
    //         colorIndex=object.colorIndex;
    //     }
    // });

    // console.log(notes);
    const style = {
        '--backgroundColor': cardColor[props.colorIndex],
    }
    
    const deleteCard = async (event) => {
        event.stopPropagation();
        const oldAuthData = Cookies.get("data_validation");
        await Delete({ data: cardId, selector: oldAuthData });
        const updateNotes = notes.filter((item) => !cardId.some((holdItem) => holdItem.id === item.id));
        setNotes(updateNotes);
        setCardId([]);
        setSelectedCard(false);
    }

    let timer = null;
    const handleMouseDown = () => {
        timer = setTimeout(() => {
            setHeld(true);
        }, 1000);
    }
    const handleMouseUp = () => {
        clearTimeout(timer);
    }
    const handleClick = (event) => {
        const handleCard = event.currentTarget.dataset.name;
        if (handleCard === "handleCard") {
            event.stopPropagation();
            setCardId([...cardId, { id: props.id }]);
            setSelectedCard(true);
            // console.log(props.id);
        }
        else {
            console.log("else");
            if (isHeld === false) {
                navigate("/showNote", { state: { data: { id: props.id, title: props.title, description: props.description, date: props.date, colorIndex: props.colorIndex } } });
            }
            else {
                const foundedId = holdId.filter((item) => item.id === props.id);
                const holdIdLength = holdId.length;
                const foundedIdLength = foundedId.length;

                if (foundedIdLength === 1 && holdIdLength === 1) {
                    const updatedId = holdId.filter((item) => item.id !== props.id);
                    setHoldId(updatedId);
                    setHeld(false);
                }
                else {
                    if (foundedIdLength === 1) {
                        const updatedId = holdId.filter((item) => item.id !== props.id);
                        setHoldId(updatedId);
                    }
                    else {
                        setHoldId([...holdId, { id: props.id }]);
                    }
                }
            }
        }
    }
    return (
        <div
        className={"card " + (isHeld ? "deleteEnv" : "")}
        style={style} onClick={handleClick}
            // onMouseDown={handleMouseDown}
            // onMouseUp={handleMouseUp}

            // onTouchStart={handleMouseDown}
            // onTouchEnd={handleMouseUp}
        >
            <div className="menu">
            
            {selectedCard
            ?<FontAwesomeIcon onClick={deleteCard} icon={faTrashCan} style={{ color: "#c92115", fontSize: "1rem" }} />
            // <button onClick={deleteCard}>delete</button>
            :<FontAwesomeIcon onClick={handleClick} data-name="handleCard" icon={faEllipsis} />
            }
            {/* {selectedCard?<button onClick={deleteCard}>cancel</button>:""} */}
            {/* {holdId.map((item) => {
                if (item.id === props.id) {
                    const keyValue = uuidv4();
                    return (
                        <FontAwesomeIcon key={keyValue} icon={faCircleXmark} className="crossIcon" />
                    );
                }
                else {
                    return "";
                }
            })} */}
            </div>
            <h3>
                {/* {props.title} */}
                {props.title.length===0?"Undefined":props.title}
            </h3>
            <h5>{props.date}</h5>
            {/* <p>{props.description}</p> */}
            <p>{props.description.length>150?props.description.slice(0,150):props.description}</p>
        </div>
    );
}
export default Card;