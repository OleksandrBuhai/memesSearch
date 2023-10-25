import axios from "axios";
import { useState } from "react";

const [memes, setMemes] = useState<any[]>([]);

const searchMemes = (searchTerm: string) => {
    const apiKey = 'DoPGRvp1BVmbGNWdzUyfgiE8gWA2TH0S';
    const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}`;

    axios.get(apiUrl)
        .then(response => setMemes(response.data.data))
        .catch(error => console.error('Error fetching memes:', error));
};