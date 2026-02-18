import AdsList from "../layouts/AdsList.jsx";
import {useContext} from "react";
import {FavoritesContext} from "../context/Favorites/FavoritesContext.jsx";

const FavoritesPage = () => {

    const { favorites } = useContext(FavoritesContext);

    return (
        <div className="container mx-auto mt-10 px-4">
            <h1 className="text-3xl mb-10">Избранные</h1>
            {favorites.length === 0 ? <p>Вы не ничего не добавляли в избранные.</p> : <AdsList ads={favorites} />}
        </div>
    )
}

export default FavoritesPage;