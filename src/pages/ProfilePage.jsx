import { useContext } from "react";
import { AuthContext } from "../context/Auth/AuthContext.jsx";
import {Navigate} from "react-router";

const ProfilePage = () => {
    const { user, logout } = useContext(AuthContext);

    if (!user) return <Navigate to="/" />;

    return (
        <div className="container mx-auto mt-6">
            <h1 className="text-3xl font-semibold">Личный кабинет</h1>

            <button onClick={logout} className="mt-4 mx-auto block bg-red-500 text-white cursor-pointer w-80 py-2 px-4 rounded">
                Выйти
            </button>
        </div>
    );
};

export default ProfilePage;