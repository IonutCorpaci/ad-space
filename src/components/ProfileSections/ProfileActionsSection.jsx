

const ProfileActionsSection = ({logout}) => {
    return (
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Быстрые действия</h2>

            <a href="/create-ad" className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white rounded-xl px-4 py-3 transition-colors">
                <span className="text-xl font-bold leading-none">+</span>
                <span className="text-sm font-medium">Подать объявление</span>
            </a>

            <a href="/my-ads" className="flex items-center gap-3 bg-blue-800 hover:bg-blue-900 text-white rounded-xl px-4 py-3 transition-colors">
                <span className="_icon-home text-base"></span>
                <span className="text-sm font-medium">Мои объявления</span>
            </a>

            <a href="/favorites" className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl px-4 py-3 transition-colors">
                <span className="_icon-star-empty text-base text-yellow-500"></span>
                <span className="text-sm font-medium">Избранное</span>
            </a>

            <button
                onClick={logout}
                className="flex items-center gap-3 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl px-4 py-3 transition-colors cursor-pointer mt-auto"
            >
                <span className="_icon-cancel-circle text-base"></span>
                <span className="text-sm font-medium">Выйти из аккаунта</span>
            </button>
        </div>
    )
}

export default ProfileActionsSection