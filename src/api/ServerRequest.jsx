import axios from "axios";
import {useCallback} from "react";

const useServerRequest = () => {
    const _apiBase = 'http://localhost:3000';

    const getUser = useCallback(async (id) => {
        const res = await axios.get(`${_apiBase}/users/${id}`);
        return res.data;
    }, [])

    const getAd = useCallback(async (id) => {
        const res = await axios.get(`${_apiBase}/ads/${id}`);
        return res.data;
    }, [])

    const getAllAds = useCallback(async () => {
        const res = await axios.get(`${_apiBase}/ads`);
        return res.data;
    }, [])

    const getCategoryAds = useCallback(async (categoryName) => {
        const res = await axios.get(`${_apiBase}/ads?category=${categoryName}`);
        return res.data;
    }, [])

    const getAllCategories = useCallback(async () => {
        const res = await axios.get(`${_apiBase}/categories`);
        return res.data;
    }, []);

    const getFavorites = useCallback(async (user) => {
        const ads = await getAllAds();

        const favoritesAds = ads.filter(ad =>
            user?.favorites.includes(ad.id)
        );

        return favoritesAds;
    }, [getAllAds]);

    const getSearchAds = useCallback(async (query) => {
        const ads = await getAllAds();

        const searchAds = ads.filter(ad => ad.title.toLowerCase().includes(query.toLowerCase()));

        return searchAds;
    }, [getAllAds])

    const changeFavorite = useCallback(async (id, data) => {
        const res = await axios.patch(`${_apiBase}/users/${id}`, data);
        return res.data;
    }, [])

    const createAd = useCallback(async (data) => {
        await axios.post(`${_apiBase}/ads`, data);
        // await fetch(`${_apiBase}/ads`, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(data)
        // });
    }, [])


    return {
        getAllAds,
        getCategoryAds,
        getAllCategories,
        getFavorites,
        changeFavorite,
        getUser,
        createAd,
        getAd,
        getSearchAds,
    }

}

export default useServerRequest;