import { createContext, useState } from "react";

export const CategoryContext = createContext();

export const CategoryProvider = ({children}) => {
    const [category, setCategory] = useState("General");
    const [page, setPage] = useState(1);

    return(
     <CategoryContext.Provider value={{category, setCategory, page, setPage}}>
        {children}
    </CategoryContext.Provider>
    )
}