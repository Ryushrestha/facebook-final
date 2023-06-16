import axios from "axios";

export const getProductData = async () =>{
        const response = await axios.get('https://api.unsplash.com/photos/?client_id=DAii1-WBYPZhRIkHoHQicqGkhCMcpJqJoSCEPF5uzQQ')
        // console.log(response.data)
        const data = response.data
        return data
}