import axios from "axios";
const url=process.env.REACT_APP_URL;
const fetchData = async (selector) => {
    try {
        const value = (await axios.post(url+"/fetchdata", {selector:selector} )).data;
        return value;
    } catch (error) {
        console.error(error);
    }
}
const addData = async (props) => {
    try {
        await axios.post(url+"/addData", { data: props.data,selector:props.selector });
    } catch (error) {
        console.error(error);
    }
}
const updateData = async (props) => {
    try {
        await axios.put(url+"/update", { data: props.data,selector:props.selector });
    } catch (error) {
        console.error(error);
    }
}
const Delete = async (props) => {
    try {
        await axios.delete(url+"/delete", { data:props });
    } catch (error) {
        console.log(error);
    }
}

export {fetchData, addData,Delete,updateData};