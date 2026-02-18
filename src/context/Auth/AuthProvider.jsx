import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext.jsx";
import useServerRequest from "../../api/ServerRequest.jsx";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const {getUser, changeFavorite, addAdToUser} = useServerRequest();

    useEffect(() => {
        const userObj = localStorage.getItem("user");
        if (userObj) {
            const parsedUser = JSON.parse(userObj);
            const userId = parsedUser.id;
            getUser(userId)
                .then(res => setUser(res))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [getUser]);

    const login = async (email, password) => {
        if (!email || !password) {
            throw new Error("Введите логин и пароль");
        }

        const res = await axios.get(`http://localhost:3000/users?email=${email}`);

        const user = res.data[0];

        if (!user || user.password !== password) {
            throw new Error("Неверный логин или пароль");
        }

        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    };

    const registerUser = async (name, email, password) => {

        const existing = await axios.get(`http://localhost:3000/users?email=${email}`);
        if (existing.data.length > 0) {
            throw new Error("Email уже используется");
        }

        const res = await axios.post("http://localhost:3000/users", {
            name,
            email,
            password,
            role: "user",
            city: "",
            ads: [],
            favorites: []
        });

        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    const toggleFavorite = async (adId) => {
        if (!user) return;

        const isFavorite = user.favorites.includes(adId);

        const updatedFavorites = isFavorite
            ? user.favorites.filter(id => id !== adId)
            : [...user.favorites, adId];

        try {
            changeFavorite(user.id, {favorites: updatedFavorites})
                .then(res => setUser(res));
        } catch (err) {
            console.log("Ошибка обновления избранного", err);
        }
    };

    const addUserAd = async (adId) => {
        if (!user) return;

        const updatedAds = [...(user.ads || []), adId];

        try {
            const res = await addAdToUser(user.id, {ads: updatedAds});
            setUser(res);
        } catch (err) {
            console.log("Ошибка добавления объявления", err);
        }
    };


    return (
        <AuthContext.Provider value={{ user, setUser, loading, login, registerUser, logout, toggleFavorite, addUserAd }}>
            {children}
        </AuthContext.Provider>
    );
};
