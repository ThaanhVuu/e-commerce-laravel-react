import axios from "axios";

export const GeolocationAPI = async () => {
    try {
        const url = `https://ipgeolocation.abstractapi.com/v1/?api_key=873a72b2175a4ca7b7e38670a0f3745e`;
        const res = await axios.get(url);
        return res.data;
    } catch (err) {
        console.error("Error fetching geolocation:", err);
        return null;
    }
};
