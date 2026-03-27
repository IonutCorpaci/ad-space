const Skeleton = () => {
    return (
        <li className="animate-pulse">
            {/* Изображение */}
            <div className="h-45 md:h-70 xl:h-60 bg-gray-200 rounded-lg"></div>
            {/* Название */}
            <div className="h-5 bg-gray-200 rounded mt-2 w-3/4"></div>
            {/* Цена */}
            <div className="h-4 bg-gray-200 rounded mt-2 w-1/4"></div>
        </li>
    );
};

export default Skeleton;
