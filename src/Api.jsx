import axios from "axios";
const fetchData=async()=>{
    try{
        const value= (await axios.get("http://localhost:4000/fetchdata")).data ;
        console.log("here is your fetched data: ");
        console.log(value);
        
        // return value;
    }catch(error){
        console.error(error);
    }
}
const authenticate=async()=>{
    try{
        await axios.post("");
    }catch(error){
        console.log(error);
    }
}
export {fetchData,authenticate};