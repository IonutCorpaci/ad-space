import AdsList from "../layouts/AdsList.jsx";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage/errorMessage.jsx";
import useAds from "../hooks/useAds.jsx";

const Home = () => {

    const {ads, loading, error} = useAds();

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl mb-4">Все обьявления</h2>
            {loading && <Loading message="Загрузка объявлений..." />}
            {error && <ErrorMessage />}

            {!loading && !error && (
                ads.length === 0
                    ? (
                        <div className="text-center py-10">
                            <p className="text-gray-500 text-lg">Объявления не найдены</p>
                        </div>
                    )
                    : <AdsList ads={ads} />

            )}
        </div>
    )
}

export default Home;