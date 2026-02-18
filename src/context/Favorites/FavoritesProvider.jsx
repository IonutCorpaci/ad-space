import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../Auth/AuthContext.jsx";
import {FavoritesContext} from "./FavoritesContext.jsx";
import useServerRequest from "../../api/ServerRequest.jsx";


export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const { user } = useContext(AuthContext);

    const { getFavorites } = useServerRequest();

    useEffect(() => {
        if (user) {
            getFavorites(user).then(data => setFavorites(data));
        }
    }, [user, getFavorites]);

    return (
        <FavoritesContext.Provider value={{favorites}}>
            {children}
        </FavoritesContext.Provider>
    )
}