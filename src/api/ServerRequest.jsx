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
    }, []);

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

    const getMyAds = useCallback(async (user) => {
        const ads = await getAllAds();

        const myAds = ads.filter(ad => user?.ads.includes(ad.id));

        return myAds;
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

    const addAdToUser = useCallback(async (id, data) => {
        const res = await axios.patch(`${_apiBase}/users/${id}`, data);
        return res.data;
    },[])

    const createAd = useCallback(async (data) => {
        const response = await axios.post(`${_apiBase}/ads`, data);
        return response.data.id;  // Возвращаем только ID
    }, [])

    const editAd = useCallback(async (id, data) => {
        await axios.patch(`${_apiBase}/ads/${id}`, data);
    }, [])

    const deleteAd = useCallback(async (id) => {
        await axios.delete(`${_apiBase}/ads/${id}`);
    }, [])


    return {
        getAllAds,
        getCategoryAds,
        getAllCategories,
        getFavorites,
        changeFavorite,
        getUser,
        createAd,
        editAd,
        deleteAd,
        getAd,
        getSearchAds,
        getMyAds,
        addAdToUser,
    }

}

export default useServerRequest;