import {useCallback, useContext, useState} from "react";
import {AuthContext} from "../context/Auth/AuthContext.jsx";
import {Link} from "react-router";
import Categories from "./Categories.jsx";
import Search from "./Search.jsx";

const Header = () => {

    const {user} = useContext(AuthContext);
    const [showCategories, setShowCategories] = useState(false);

    const toggleCategories = useCallback(() => setShowCategories(prev => !prev), []);

    return (
        <header className="header py-5 relative">
            <div className="container px-2 mx-auto flex justify-between items-center gap-1">
                <Link to="/" className="header__logo text-2xl">Ad<span className="text-blue-800">Space</span></Link>
                <ul className="menu hidden items-center gap-6 md:flex">
                    <li className="bg-green-600 text-white px-3 py-2 rounded-3xl"><Link to="/create-ad">+ Подать обьявления</Link></li>
                    <li className={user ? 'hover:text-blue-800 delay-75' : 'hidden'}><Link to="/favorites"><span className="_icon-star-empty"></span> Избранные</Link></li>
                    <li className={user ? 'hover:text-blue-800 delay-75' : 'hidden'}><Link to="/profile" className="flex items-center gap-1"><span className="_icon-user text-4xl"></span></Link></li>
                    <li className={user ? 'hidden' : 'hover:text-blue-800 delay-75'}><Link to='/login'>Войти</Link></li>
                </ul>
            </div>
            <div className="container relative px-2 mx-auto mt-2 flex items-center gap-2">
                <button className="bg-blue-800 text-white py-2 px-6 rounded-3xl cursor-pointer" onClick={() => toggleCategories()}>Категории</button>
                <Search/>
                <Categories showCategories={showCategories} toggleCategories={toggleCategories}></Categories>
            </div>
        </header>
    )
}

export default Header;