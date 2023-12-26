import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { fetchData } from "../../Api";
import { useHistory } from "react-router-dom";

const Home = () => {
    const history = useHistory();
    const [token, setToken] = useState(null);
    let tokenParam = null;
    const data = Cookies.get("data_validation");

    if (data !== undefined) {
        tokenParam = data;
    }
    const searchParams = new URLSearchParams(window.location.search);
    tokenParam = searchParams.get('token');
    useEffect(() => {
        setToken(tokenParam);
        if (tokenParam !== data) {
            Cookies.set("data_validation", tokenParam);
        }
    }, [tokenParam])
    if (tokenParam) {
        console.log(tokenParam);
    }

    const handleClicktoShow=async()=>{
        await fetchData();
    }

    return (
        <div className="Home" >
            {data === undefined ? <form action="http://localhost:4000/auth/google" method="Get">
                <button>google signin</button>
            </form> :
                <div>
                    <button onClick={handleClicktoShow}>showNote</button>
                </div>}
        </div>
    )
}

export default Home;