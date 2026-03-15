import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
const getData = async () => {
    try {
        const response = await axios(`${baseURL}/nepse/livedata`);
        const result = response.data.result;
        return result;
    } catch (error) {
        console.error("Failed to fetch live NEPSE data:", error);
        return [];
    }

}

export default getData;