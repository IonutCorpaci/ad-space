import {useLoaderData} from "react-router";
import useAds from "../hooks/useAds.jsx";
import AdsList from "../layouts/AdsList.jsx";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage/errorMessage.jsx";


const CategoryAds = () => {

    const category = useLoaderData();
    const { ads, loading, error} = useAds({categoryId: category.name})

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

    const items = renderAds(ads);
    const spinner = loading ? <Loading message="Загрузка объявлений..." /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;



    return (
        <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl mb-4">{category.name}</h2>
            {spinner}
            {errorMessage}
            {items}
        </div>
    )
}

export default CategoryAds;