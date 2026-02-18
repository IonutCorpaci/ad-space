import {useContext} from "react";
import {CategoriesContext} from "../context/Categories/CategoriesContext.jsx";
import {Link} from "react-router";

const Categories = ({showCategories, toggleCategories}) => {

    const { categories } = useContext(CategoriesContext);

    return (
        <div className={showCategories ? 'absolute left-0 top-full container mx-auto bg-white px-2 py-3 block z-10' : 'hidden'}>
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