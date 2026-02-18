import {useState, useEffect, useContext, useCallback} from "react";
import useServerRequest from "../api/ServerRequest.jsx";
import {AuthContext} from "../context/Auth/AuthContext.jsx";

const useAds = (options = {}) => {

    const {
        categoryId = null,
        filters = {},
        enabled = true,
        isMyAds = false,
        isFavorites = false
    } = options;

    const {getAllAds, getCategoryAds, getFavorites, getMyAds} = useServerRequest();
    const { user } = useContext(AuthContext);

    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAds = useCallback(async () => {
        try {
            let data;

            if (isFavorites) {
                data = await getFavorites(user.id);
            } else if (categoryId) {
                data = await getCategoryAds(categoryId);
            } else if (isMyAds) {
                data = await getMyAds(user);
            } else {
                data = await getAllAds();
            }

            setAds(data);
        } catch (error) {
            setError(error.message || 'Ошибка загрузки');
            console.error(error);
            setAds([]);
        } finally {
            setLoading(false);
        }

    }, [categoryId, isFavorites, user?.id]);

    useEffect(() => {
        if (enabled) {
            fetchAds();
        }
    }, [fetchAds, enabled]);

    return {
        ads,
        loading,
        error,
        refetch: fetchAds,
        clearError: () => setError(null)
    };
}

export default useAds;