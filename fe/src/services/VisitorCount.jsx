import axios from "axios";

export const VisitorCount = async () => {
    try{
        const response = await axios.post("http://localhost:8000/api/v1.0/hit");
        return response.data;
    } catch (err) {
        console.error("Error fetching Visitor count:", err);
        return null;
    }
}