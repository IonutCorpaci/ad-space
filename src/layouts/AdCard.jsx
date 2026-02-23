import {memo, useContext} from "react";
import {AuthContext} from "../context/Auth/AuthContext.jsx";
import {Link} from "react-router";

const AdCard = memo((props) => {
    const { title, price, images, id } = props.ad;
    const isMy = props.isMy;

    const {user, toggleFavorite, onDeleteAd} = useContext(AuthContext);

    const isFavorite = user?.favorites.includes(id);

    return (
        <li className="relative group cursor-pointer">

            <nav className="absolute right-2 top-2 hidden group-hover:flex">
                {isMy && (
                    <>
                        <button className="bg-red-300 rounded flex items-center justify-center p-1 mr-2 cursor-pointer" onClick={() => onDeleteAd(id)}>
                            <span className="_icon-cancel-circle w-5 h-5 font-semibold text-xl text-red-600"></span>
                        </button>
                        <Link to={`/edit/${id}`} className="bg-blue-700 rounded flex items-center justify-center p-1 mr-2 cursor-pointer">
                            <span className="_icon-pencil w-5 h-5 font-semibold text-xl text-white"></span>
                        </Link>
                    </>
                )}
                <button
                    className="bg-blue-700 rounded flex items-center justify-center p-1 cursor-pointer"
                    onClick={() => toggleFavorite(id)}
                >
                    <span className={`${isFavorite ? "_icon-star-full" : "_icon-star-empty"} w-5 h-5 font-semibold text-xl text-yellow-400`}></span>
                </button>
            </nav>
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