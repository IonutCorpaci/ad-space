const Loading = ({ message = "Загрузка..." }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
            <p className="text-lg text-gray-600">{message}</p>
        </div>
    );
};

export default Loading;

