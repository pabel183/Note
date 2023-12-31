import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from 'js-cookie';
import Notes from "./route/pages/Notes";
import Home from "./route/pages/Home";
import AddNote from "./route/pages/AddNote";
import MyContext from "./route/components/MyContext";
import ShowNote from "./route/pages/ShowNote";
import { fetchData,addData } from "./Api";

import "./App.css"
const App = () => {
    const [notes, setNotes] = useState([]);
    const [holdId, setHoldId] = useState([]);
    const [isHeld, setHeld] = useState(false);
    const [authData, setAuthData] = useState(null);
    const searchParams = new URLSearchParams(window.location.search);
    let tokenParam = null;
    if (searchParams.size > 0) {
        tokenParam = searchParams.get('token');
    }
    useEffect(() => {
        if (tokenParam === null) {
            const oldAuthData = Cookies.get("data_validation");
            // console.log(oldAuthData);
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
    // useEffect(() => {
    //     // Axio get
    //     const fetch=async()=>{
    //         const oldAuthData = Cookies.get("data_validation");
    //         const dummynotes=await fetchData(oldAuthData);
    //         console.log(dummynotes.length);
    //         // setServerNotes(newNotesData);
    //     }
    //     fetch();
    // },[])
    useEffect(() => {
        const fetch=async()=>{
            const oldAuthData = Cookies.get("data_validation");
            const dummynotes=await fetchData(oldAuthData);
            
            const notesData = Cookies.get(authData);
            
            if (notesData) {
                //it is mandatory to parse data before store in useState;
                const parseNotesData = JSON.parse(notesData);
                console.log("db array");
                console.log(parseNotesData);
                const filteredArray = parseNotesData.filter((item1) => !dummynotes.some((item2)=>item2.id===item1.id || item2.title===item1.title || item2.description===item1.description));
                if(filteredArray){
                    console.log("filter array");
                  console.log(filteredArray);
                     await addData({data:filteredArray,selector:oldAuthData});
                     setNotes(filteredArray);
                }
                else{
                    console.log(dummynotes)
                    setNotes(dummynotes);
                }
            }
        }
        fetch();
        
    },[]);
    useEffect(()=>{
        const notesData = Cookies.get(authData);
        
        if (notesData) {
            //it is mandatory to parse data before store in useState;
            const parseNotesData = JSON.parse(notesData)
            setNotes(parseNotesData);
        }
    },[authData])
    
    useEffect(() => {
        //Axio Post
        //it is mandatory to stringify data before store in useState;
        const stringData = JSON.stringify(notes);
        Cookies.set(authData, stringData);
    }, [notes]);

    return (
        <MyContext.Provider value={{ notes: notes, setNotes: setNotes, holdId, setHoldId, isHeld, setHeld }}>
            <Router>
                <Routes>
                    {
                        authData ?
                            <>
                                <Route path="/*" element={<Home authData={authData} />} />
                                <Route path="/notes" element={<Notes />} />
                                <Route path="/addNote" element={<AddNote />} />
                                <Route path="/showNote" element={<ShowNote />} />
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