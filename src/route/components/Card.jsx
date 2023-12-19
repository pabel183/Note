import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "./MyContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import "./Card.css";

const Card = (props) => {
    const navigate = useNavigate();
    const cardColor = ["Lavender", "PowderBlue", "LightPink", "MistyRose", "PeachPuff", "LemonChiffon", "PaleTurquoise", "Honeydew", "LavenderBlush", "AliceBlue"];
    const colorIndex=Math.floor(Math.random()*10);
    const style={
        '--backgroundColor':cardColor[colorIndex],
    }

    const { holdId, setHoldId,isHeld, setHeld } = useContext(MyContext);
    let timer = null;
    const handleMouseDown = () => {
        timer = setTimeout(() => {
            setHeld(true);
        }, 1000);
    }
    const handleMouseUp = () => {
        clearTimeout(timer);
    }
    const handleClick = () => {
        if (isHeld === false) {
            navigate("/showNote", { state: { data: { id: props.id, title: props.title, description: props.description, date: props.date } } });
        }
        else {
            const foundedId=holdId.filter((item)=>item.id===props.id);
            const holdIdLength=holdId.length;
            const foundedIdLength=foundedId.length;
            
            if(foundedIdLength===1 && holdIdLength===1) {
                const updatedId=holdId.filter((item)=>item.id!==props.id);
                setHoldId(updatedId);
                setHeld(false);
            }
            else{
                if(foundedIdLength===1){         
                    const updatedId=holdId.filter((item)=>item.id!==props.id);
                    setHoldId(updatedId);
                    }
                else{
                    setHoldId([...holdId,{id:props.id}]);
                }
            }
            
            
            
        }
    }
    return (
        <div 
        className={"card " + (isHeld?"deleteEnv":"" )  } 
        style={style} onClick={handleClick}
         onMouseDown={handleMouseDown} 
         onMouseUp={handleMouseUp}

         onTouchStart={handleMouseDown}
         onTouchEnd={handleMouseUp}
         >
            <h3>
                {props.id}
            </h3>
            <h5>{props.date}</h5>
            {holdId.map((item)=>{
                if(item.id===props.id){
                    return(
                        <FontAwesomeIcon icon={faCircleXmark} className="crossIcon" />
                    );
                }
                else{
                    return "";
                }
            })}
            
        </div>
    );
}
export default Card;