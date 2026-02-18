import {Link} from "react-router";

const Footer = () => {



    return (
        <footer className="mt-10 bg-gray-50 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] md:py-4">
            <div className="container mx-auto hidden md:block">
                <a href="/public" className="header__logo text-2xl">Ad<span className="text-blue-800">Space</span></a>
            </div>
            <div className="fixed bottom-0 w-full py-4 px-6 bg-white inset-shadow-xs block md:hidden">
                <ul className="text-xl flex items-center justify-between gap-4">
                    <li className="text-4xl w-10 flex items-center justify-center"><Link to="/"><span className="_icon-home"></span></Link></li>
                    <li className="text-4xl w-10 flex items-center justify-center"><Link to="/messages"><span className="_icon-bubbles"></span></Link></li>
                    <li className="w-10 h-10 bg-blue-800 rounded-full text-4xl text-white flex items-center justify-center"><Link to="/create-ad">+</Link></li>
                    <li className="text-4xl w-10 flex items-center justify-center"><Link to="/favorites"><span className="_icon-star-empty"></span></Link></li>
                    <li className="text-5xl w-10 flex items-center justify-center"><Link to="/profile"><span className="_icon-user"></span></Link></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;