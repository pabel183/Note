import axios from "axios";
const fetchData = async (selector) => {
    // console.log(selector);
    try {
        const value = (await axios.post("http://localhost:4000/fetchdata", {selector:selector} )).data;
        // console.log("here is your fetched data: ");
        // console.log(value);
        return value;
    } catch (error) {
        console.error(error);
    }
}
const addData = async (props) => {
    try {
        await axios.post("http://localhost:4000/addData", { data: props.data,selector:props.selector });
    } catch (error) {
        console.error(error);
    }
}
const updateData = async (props) => {
    try {
        await axios.put("http://localhost:4000/update", { data: props.data,selector:props.selector });
    } catch (error) {
        console.error(error);
    }
}
const Delete = async (props) => {
    // console.log(props);
    try {
        //specifically this (await axios.delete(url, { data:props });) might me passdata only this {data:value} format
        await axios.delete("http://localhost:4000/delete", { data:props });
    } catch (error) {
        console.log(error);
    }
}

export {fetchData, addData,Delete,updateData};