import { createContext, useState } from "react";

export const CategoryContext = createContext();

export const CategoryProvider = ({children}) => {
    const [category, setCategory] = useState("General");
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState(null);
    const [like, setLike] = useState(null);

    return(
     <CategoryContext.Provider value={{category, setCategory, page, setPage, search, setSearch, like, setLike}}>
        {children}
    </CategoryContext.Provider>
    )
}