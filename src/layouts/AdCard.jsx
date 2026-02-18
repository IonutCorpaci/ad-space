import {memo, useContext} from "react";
import {AuthContext} from "../context/Auth/AuthContext.jsx";
import {Link} from "react-router";

const AdCard = memo((props) => {
    const { title, price, images, id } = props.ad;

    const {user, toggleFavorite} = useContext(AuthContext);

    const isFavorite = user?.favorites.includes(id);

    return (
        <li className="relative group cursor-pointer">
            <button
                className="absolute right-2 top-2 cursor-pointer hidden group-hover:block"
                onClick={() => toggleFavorite(id)}
            >
                <span className={`${isFavorite ? "_icon-star-full" : "_icon-star-empty"} font-semibold text-xl text-yellow-400`}></span>
            </button>
            {
                images.length === 0 ? <Link to={`/ads/${id}`} className="h-45 md:h-70 xl:h-60 bg-blue-950 rounded-lg block"></Link> : <Link to={`/ads/${id}`} className="h-45 md:h-70 xl:h-60 rounded-lg block">
                    <img src={images[0]} alt="image" className="w-full h-full object-cover rounded-lg"/></Link>
            }
            <div className="name text-lg font-medium mt-1">{title}</div>
            <div className="price font-semibold mt-1">{price}$</div>
        </li>
    )
})

export default AdCard;