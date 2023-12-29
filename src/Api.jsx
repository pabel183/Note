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
    console.log("data is sending to addData route.")
    try {
        await axios.post("http://localhost:4000/update", { data: props.data,selector:props.selector });
    } catch (error) {
        console.error(error);
    }
}
const updateData = async (props) => {
    try {
        await axios.post("http://localhost:4000/update", { slector: props.data });
    } catch (error) {
        console.error(error);
    }
}
const Delete = async (props) => {
    try {
        await axios.delete("http://localhost:4000/delete", { slector: props.data });
    } catch (error) {
        console.log(error);
    }
}

export {fetchData, addData, updateData, Delete };