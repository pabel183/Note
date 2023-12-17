import React from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";

const Card = (props) => {
    const navigate=useNavigate();
    const cardColor = ["Lavender", "PowderBlue", "LightPink", "MistyRose", "PeachPuff", "LemonChiffon", "PaleTurquoise", "Honeydew", "LavenderBlush", "AliceBlue"];
    const handleClick=()=>{
        navigate("/showNote",{state: {data:{title:props.title,description:props.description,date:props.date}} });
    }
    return (
        <div onClick={handleClick} className="card">
            <h3>
                {props.title}
            </h3>
            <h5>{props.date}</h5>
        </div>
    );
}
export default Card;