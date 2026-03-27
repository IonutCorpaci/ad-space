const FilterBar = ({cities, city, setCity, minPrice, maxPrice, setMinPrice, setMaxPrice, sortBy, setSortBy, resetFilter}) => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:flex-wrap">

                {/* Город */}
                <div className="flex flex-col gap-1 md:min-w-40">
                    <label className="text-sm text-gray-500">Город</label>
                    <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white">
                        <option value="">Все города</option>
                        {cities.map((city) => (
                            <option key={city.id} value={city.name}>{city.name}</option>
                        ))}
                    </select>
                </div>

                {/* Цена от / до */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-500">Цена ($)</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            placeholder="От"
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 w-24"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <span className="text-gray-400">—</span>
                        <input
                            type="number"
                            placeholder="До"
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 w-24"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                </div>

                {/* Сортировка */}
                <div className="flex flex-col gap-1 md:min-w-48">
                    <label className="text-sm text-gray-500">Сортировка</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 bg-white">
                        <option value="">По умолчанию</option>
                        <option value="price_asc">Цена: сначала дешевле</option>
                        <option value="price_desc">Цена: сначала дороже</option>
                        {/*<option value="date_desc">Дата: сначала новые</option>*/}
                        <option value="title_asc">Название: А → Я</option>
                    </select>
                </div>

                {/* Сброс */}
                <button
                    onClick={resetFilter}
                    className="text-sm text-gray-400 hover:text-red-500 transition-colors cursor-pointer self-end">
                    Сбросить
                </button>

            </div>
        </div>
    );
};

export default FilterBar;
