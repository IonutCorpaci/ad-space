import {useContext, useRef} from "react";
import {CategoriesContext} from "../context/Categories/CategoriesContext.jsx";
import {Link} from "react-router";
// import useClickOutside from "../hooks/useClickOutside.jsx";

const Categories = ({showCategories, toggleCategories}) => {

    const { categories } = useContext(CategoriesContext);
    const categoriesRef = useRef(null);
    // useClickOutside(categoriesRef, () => setShowCategories(false));


    return (
        <div className={showCategories ? 'absolute left-0 top-full shadow-xl container mx-auto bg-white px-4 rounded-2xl py-3 block z-10' : 'hidden'}>
            <h3 className="text-2xl">Все категории</h3>
            <ul className="flex flex-col gap-2 mt-4">
                {categories.map(category => (
                    <Link key={category.id} to={`/categories/${category.id}`} onClick={toggleCategories}>
                        <li>{category.name}</li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default Categories