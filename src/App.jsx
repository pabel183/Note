import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from 'js-cookie';
import Notes from "./route/pages/Notes";
import Home from "./route/pages/Home";
import AddNote from "./route/pages/AddNote";
import MyContext from "./route/components/MyContext";
import ShowNote from "./route/pages/ShowNote";
import UpdateNote from "./route/pages/UpdateNote";
import { fetchData,addData } from "./Api";

import "./App.css"
const App = () => {
    const [notes, setNotes] = useState([]);
    const [holdId, setHoldId] = useState([]);
    const [isHeld, setHeld] = useState(false);
    const [authData, setAuthData] = useState(null);
    const [tempNotes,setTempNotes]=useState("");
    const searchParams = new URLSearchParams(window.location.search);
    let tokenParam = null;
    if (searchParams.size > 0) {
        tokenParam = searchParams.get('_ticket');
    }
    useEffect(() => {
        if (tokenParam === null) {
            const oldAuthData = Cookies.get("data_validation");
            if (oldAuthData === null) {
                setAuthData(null);
            }
            else {
                setAuthData(oldAuthData);
            }
        }
        else {
            setAuthData(tokenParam);
            Cookies.set("data_validation", tokenParam);

        }
    }, [tokenParam]);

    useEffect(() => {
        const oldAuthData = Cookies.get("data_validation");
        if (oldAuthData === null) {
            setAuthData(null);
        }
        else {
            setAuthData(oldAuthData);
        }
    });
    useEffect(() => {
        const fetch=async()=>{
            const oldAuthData = Cookies.get("data_validation");
            const dummynotes=await fetchData(oldAuthData);
            if(dummynotes){
                setNotes(dummynotes);
                setTempNotes(dummynotes);
            }
    
        }
        
        fetch();
        
    },[]);
    

    return (
        <MyContext.Provider value={{ notes: notes, setNotes: setNotes, holdId, setHoldId, isHeld, setHeld,setAuthData,tempNotes,setTempNotes }}>
            <Router>
                <Routes>
                    {
                        authData ?
                            <>
                                <Route path="/*" element={<Home authData={authData} />} />
                                <Route path="/notes" element={<Notes />} />
                                <Route path="/addNote" element={<AddNote />} />
                                <Route path="/showNote" element={<ShowNote />} />
                                <Route path="/updateNote" element={<UpdateNote />}/>
                            </>
                            :
                            <Route path="/*" element={<Home authData={authData} />} />
                    }
                </Routes>
            </Router>
        </MyContext.Provider>
    )
}

export default App;