import AdsList from "../layouts/AdsList.jsx";
import useAds from "../hooks/useAds.jsx";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage/errorMessage.jsx";
import {Link} from "react-router";

const MyAdsPage = () => {

    const { ads, loading, error } = useAds({isMyAds: true})

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl md:text-3xl mb-4">Мои обьявления</h1>
            {loading && <Loading message="Загрузка объявлений..." />}
            {error && <ErrorMessage />}
            {!loading && !error && (
                ads.length === 0
                    ? (
                        <div className="text-center py-10">
                            <p className="text-gray-500 text-lg">У вас нету своих обьявлений. <Link to={'/create-ad'} className="text-blue-500 cursor-pointer">Хотите создать?</Link></p>
                        </div>
                    )
                    : <AdsList ads={ads} isMy={true}/>

            )}
        </div>
    )
}

export default MyAdsPage;