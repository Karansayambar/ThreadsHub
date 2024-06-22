import { useContext } from "react";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { CategoryContext } from "../../Context/CategoryContext";
import './style.css';

const Pagination = () => {
    const {page, setPage} = useContext(CategoryContext);  // Stores The Data in Context Provider ad also acess it.
    const onClickHandler = (pageNumber) => {
        setPage(pageNumber);
    }
  return (
   <div className="main-container-page">
    {/* Left arrow for pagination, decreases the page number */}
    <IoIosArrowDropleftCircle
        className="pagination-arrow"
        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
    />
    {/* Page numbers for pagination */}
    {Array.from({ length: 7 }, (_, index) => (
        <span
            key={index}
            className={`pagination-number ${page === index + 1 ? 'active' : ''}`}
            onClick={() => onClickHandler(index + 1)}
        >
            {/* Display the page number */}
            {index + 1}
        </span>
    ))}
    {/* Right arrow for pagination, increases the page number */}
    <IoIosArrowDroprightCircle
        className="pagination-arrow"
        onClick={() => setPage(prev => Math.min(prev + 1, 7))}
    />
</div>

  )
}

export default Pagination;