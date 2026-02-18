import { useEffect, useState} from "react";
import {CategoriesContext} from "./CategoriesContext.jsx";
import useServerRequest from "../../api/ServerRequest.jsx";


const CategoriesProvider = ({ children }) => {

    const [categories, setCategories] = useState([]);
    const { getAllCategories } = useServerRequest();

    useEffect(() => {
        getAllCategories()
            .then((data) => setCategories(data));
    }, [getAllCategories]);

    return (
        <CategoriesContext.Provider value={{categories, setCategories}}>
            {children}
        </CategoriesContext.Provider>
    )
}

export default CategoriesProvider;