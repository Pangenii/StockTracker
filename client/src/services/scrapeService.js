import axios from "axios";

const getData = async () => {
    const response = await axios("http://localhost:3000/api/nepse/livedata");
    const data = response.data;
    const result = data.result;
    return result;
}

export default getData;