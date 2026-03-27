const PersonalHeaderSection = ({user}) => {
    return (
        <div className="bg-blue-800 pt-10 pb-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center gap-3 md:flex-row md:gap-6">
                    {/* Аватар */}
                    <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-xl shrink-0">
                            <span className="text-blue-800 text-4xl font-semibold uppercase">
                                {user.name?.[0]}
                            </span>
                    </div>
                    {/* Имя и почта */}
                    <div className="text-center md:text-left pb-1">
                        <h1 className="text-white text-2xl font-semibold">{user.name}</h1>
                        <p className="text-blue-200 text-sm mt-0.5">{user.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalHeaderSection;