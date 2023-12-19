import React, { useState } from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Notes from "./route/pages/Notes";
import Home from "./route/pages/Home";
import AddNote from "./route/pages/AddNote";
import MyContext from "./route/components/MyContext";
import defaultNotes from "../src/route/pages/DummyNotes";
import ShowNote from "./route/pages/ShowNote";

import "./App.css"
const App=()=>{
    const [notes,setNotes]=useState(defaultNotes);
    const [holdId,setHoldId]=useState([]);
    const [ isHeld, setHeld ] = useState(false);
    return(
        <MyContext.Provider value={ {notes:notes,setNotes:setNotes,holdId,setHoldId,isHeld, setHeld} }>
        <Router>
            <Routes>
                {/* Home page is repalced by Notes */}
                <Route path="/" element={<Notes />}/>
                <Route path="/notes"  element={<Notes />}/>
                <Route path="/addNote" element={<AddNote />}/>
                <Route path="/showNote" element={<ShowNote />}/>
            </Routes>
        </Router>
        </MyContext.Provider>
    )
}

export default App;