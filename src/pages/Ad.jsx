import {useState} from "react";
import {Swiper} from "swiper/react";
import {SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import {FreeMode, Navigation, Thumbs} from "swiper/modules";
import {useLoaderData, useNavigation} from "react-router";
import Loading from "../components/Loading.jsx";


const Ad = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [imageErrors, setImageErrors] = useState(new Set());
    const ad = useLoaderData();
    const navigation = useNavigation();

    const handleImageError = (index) => {
        setImageErrors(prev => new Set([...prev, index]));
    };

    // Показываем загрузку во время навигации
    if (navigation.state === "loading") {
        return (
            <div className="container mx-auto mt-10 px-3">
                <Loading message="Загрузка объявления..." />
            </div>
        );
    }

    // Проверка на наличие данных
    if (!ad) {
        return (
            <div className="container mx-auto mt-10 px-3 text-center">
                <h1 className="text-3xl font-bold mb-4">Объявление не найдено</h1>
                <p className="text-lg text-gray-600">Данные объявления отсутствуют</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto mt-10 px-3">
            <h1 className="text-4xl flex items-center gap-2">
                {ad.title}
                <button
                    className="cursor-pointer p-0"
                    // onClick={() => toggleFavorite(id)}
                >
                    <span className="_icon-star-empty text-2xl text-yellow-400"></span>
                </button>
            </h1>

            <div className="mt-10 flex flex-col lg:flex-row gap-8">
                <div className="lg:w-3/4">
                    {ad.images && ad.images.length > 0 ? (
                        <>
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={20}
                                loop={ad.images.length > 1}
                                navigation={true}
                                thumbs={{swiper: thumbsSwiper}}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="w-full h-[350px] md:h-[450px] lg:h-[650px] rounded-xl overflow-hidden"
                            >
                                {ad.images.map((img, i) => (
                                    <SwiperSlide key={i}>
                                        {imageErrors.has(i) ? (
                                            <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                                                <span className="text-gray-500">Изображение не загружено</span>
                                            </div>
                                        ) : (
                                            <img 
                                                src={img} 
                                                alt={`${ad.title} - изображение ${i + 1}`}
                                                className="w-full h-full object-cover rounded-lg"
                                                onError={() => handleImageError(i)}
                                            />
                                        )}
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {ad.images.length > 1 && (
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    slidesPerView={4}
                                    spaceBetween={10}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mt-4 h-[80px]"
                                >
                                    {ad.images.map((img, i) => (
                                        <SwiperSlide key={i}>
                                            {imageErrors.has(i) ? (
                                                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                                                    <span className="text-xs text-gray-500">Ошибка</span>
                                                </div>
                                            ) : (
                                                <img 
                                                    src={img} 
                                                    alt={`${ad.title} - миниатюра ${i + 1}`}
                                                    className="w-full h-full object-cover rounded-lg cursor-pointer opacity-70 hover:opacity-100 transition"
                                                    onError={() => handleImageError(i)}
                                                />
                                            )}
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}
                        </>
                    ) : (
                        <div className="w-full h-[350px] md:h-[450px] lg:h-[650px] bg-gray-200 rounded-xl flex items-center justify-center">
                            <span className="text-gray-500 text-lg">Нет изображений</span>
                        </div>
                    )}
                </div>

                <div className="lg:w-1/4 space-y-2 p-2 border rounded-lg bg-gray-50 shadow-sm">
                    <p className="text-lg font-semibold">Категория: <span className="font-normal">{ad.category || "Не указана"}</span></p>
                    <p className="text-lg font-semibold">Город: <span className="font-normal">{ad.city || "Не указан"}</span></p>
                    <p className="text-lg font-semibold">Цена: <span className="font-normal">{ad.price !== undefined ? `${ad.price}$` : "Не указана"}</span></p>
                </div>
            </div>

            {ad.description && (
                <div className="mt-10 text-md">
                    <h2 className="text-2xl font-semibold mb-4">Описание</h2>
                    <p className="whitespace-pre-wrap">{ad.description}</p>
                </div>
            )}

        </div>
    )
}

export default Ad;