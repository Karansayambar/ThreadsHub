import { useContext } from "react";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { CategoryContext } from "../../Context/CategoryContext";
import './style.css';

const Pagination = () => {
    const {page, setPage} = useContext(CategoryContext);
    const onClickHandler = (pageNumber) => {
        setPage(pageNumber);
    }
  return (
    <div className="main-container-page">
        <IoIosArrowDropleftCircle
            className="pagination-arrow"
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
        />
        {Array.from({ length: 5 }, (_, index) => (
                <span
                    key={index}
                    className={`pagination-number ${page === index + 1 ? 'active' : ''}`}
                    onClick={() => onClickHandler(index + 1)}
                >
                    {index + 1}
                </span>
            ))}
        <IoIosArrowDroprightCircle
          className="pagination-arrow"
          onClick={() => setPage(prev => Math.min(prev + 1, 5))}
            
        />
    </div>
  )
}

export default Pagination;