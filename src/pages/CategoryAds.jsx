import {useLoaderData} from "react-router";
import useAds from "../hooks/useAds.jsx";
import AdsList from "../layouts/AdsList.jsx";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage/errorMessage.jsx";
import FilterBar from "../components/FilterBar.jsx";
import {useEffect, useMemo, useState} from "react";
import useServerRequest from "../api/ServerRequest.jsx";
import {useDebounce} from "../hooks/useDebounce.js";


const CategoryAds = () => {

    const [cities, setCities] = useState([]);
    const [city, setCity] = useState("");
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [sortBy, setSortBy] = useState(null);

    const {getAllCities} = useServerRequest();
    const category = useLoaderData();
    const { ads, loading, error} = useAds({categoryId: category.name})

    useEffect(() => {
        getAllCities().then(res => setCities(res));
    },[category, getAllCities]);

    const debouncedMinPrice = useDebounce(minPrice);
    const debouncedMaxPrice = useDebounce(maxPrice);

    const filteredAds = useMemo(() => {
        let result = ads;
        if (city) {
            result = result.filter(ad => ad.city === city);
        }

        if (debouncedMinPrice) {
            result = result.filter(ad => Number(ad.price) >= Number(debouncedMinPrice));
        }
        if (debouncedMaxPrice) {
            result = result.filter(ad => Number(ad.price) <= Number(debouncedMaxPrice));
        }

        if (sortBy === "price_asc") {
            result = [...result].sort((a, b) => Number(a.price) - Number(b.price));
        }
        if (sortBy === "price_desc") {
            result = [...result].sort((a, b) => Number(b.price) - Number(a.price));
        }
        // if (sortBy === "date_desc") {
        //     result = [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        // }
        if (sortBy === "title_asc") {
            result = [...result].sort((a, b) => a.title.localeCompare(b.title));
        }

        return result;
    }, [city, ads, debouncedMinPrice, debouncedMaxPrice, sortBy]);

    const resetFilter = () => {
        setCity("");
        setMinPrice("");
        setMaxPrice("");
        setSortBy(null);
    }

    const renderAds = (arr) => {
        if (arr.length === 0) {
            return (
                <div className="text-center py-10">
                    <p className="text-gray-500 text-lg">Объявления не найдены</p>
                </div>
            );
        } else {
            return <AdsList ads={arr} />;
        }
    }

    const items = renderAds(filteredAds);
    const spinner = loading ? <Loading message="Загрузка объявлений..." /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;



    return (
        <div className="container mx-auto px-4">
            <FilterBar
                cities={cities}
                setCity={setCity}
                minPrice={minPrice}
                maxPrice={maxPrice}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                setSortBy={setSortBy}
                city={city}
                sortBy={sortBy}
                resetFilter={resetFilter}
            />
            <h2 className="text-2xl md:text-3xl mb-4">{category.name}</h2>
            {spinner}
            {errorMessage}
            {items}
        </div>
    )
}

export default CategoryAds;