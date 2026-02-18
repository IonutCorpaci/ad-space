import {useEffect, useRef, useState} from "react";
import useServerRequest from "../api/ServerRequest.jsx";
import {Link} from "react-router";

const Search = () => {

    const [search, setSearch] = useState("");
    const [ads, setAds] = useState([]);
    const searchRef = useRef(null);
    const {getSearchAds} = useServerRequest();

    const handleClickSearch = () => {
        searchRef.current.focus();
    }

    useEffect(() => {
        if (!search) {
            setAds([]);
            return;
        }
        const timer = setTimeout(() => {
            getSearchAds(search).then(ads => setAds(ads));
        }, 500);

        return () => {
            clearTimeout(timer);
        }
    }, [getSearchAds, search]);

    return (
        <div className="w-full md:max-w-5/5 relative">
            <input
                type="text"
                placeholder="Что ищете?"
                className="outline-0 border border-gray-300 rounded-lg py-2 px-4 w-full"
                ref={searchRef}
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <button className="absolute right-3 w-7 h-7 top-1/2 -translate-y-1/2 cursor-pointer" onClick={handleClickSearch}>
                <img src="/img/search.png" alt="search" className="w-full h-full object-contain"/>
            </button>
            {
                ads.length !== 0 && <div className="absolute top-full left-0 z-30 p-3 rounded bg-white shadow-xl flex flex-col w-full md:w-5/6">
                    {
                        ads.map(ad =>
                            <Link
                                to={`/ads/${ad.id}`}
                                key={ad.id}
                                className="flex items-center gap-2 p-2 border-b border-gray-300 cursor-pointer hover:bg-gray-100 transition"
                                onClick={() => setSearch("")}
                            >
                                <div className="w-24 h-24">
                                    {ad.images?.length === 0
                                        ? <div className="h-full w-full bg-blue-950 rounded-lg"></div>
                                        : <img src={ad.images[0]} alt="image" className="w-full h-full object-cover rounded-lg"/>
                                    }
                                </div>
                                <div className="font-semibold">{ad.title}</div>
                            </Link>
                        )
                    }
                </div>
            }
        </div>
    )
}

export default Search;