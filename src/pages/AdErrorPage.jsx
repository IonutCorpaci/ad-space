import { useRouteError, useNavigate, Link } from "react-router";
import ErrorMessage from "../components/ErrorMessage/errorMessage.jsx";

const AdErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    let errorMessage = "Произошла ошибка при загрузке объявления";
    let statusCode = null;

    if (error instanceof Response) {
        statusCode = error.status;
        errorMessage = error.statusText || errorMessage;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }

    return (
        <div className="container mx-auto mt-10 px-3 text-center">
            <ErrorMessage />
            <h1 className="text-3xl font-bold mt-6 mb-4">
                {statusCode === 404 ? "Объявление не найдено" : "Ошибка загрузки"}
            </h1>
            <p className="text-lg text-gray-600 mb-6">{errorMessage}</p>
            <div className="flex gap-4 justify-center">
                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    Назад
                </button>
                <Link
                    to="/"
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                >
                    На главную
                </Link>
            </div>
        </div>
    );
};

export default AdErrorPage;

