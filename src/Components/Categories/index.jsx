import { useContext } from 'react';
import './style.css';
import { CategoryContext } from '../../Context/CategoryContext';

const Categories = () => {

    const {category, setCategory , setSearch} = useContext(CategoryContext);
    console.log("dtata is ",category);
    const arr = ["finance", "business", "technology", "regional", "health", "sports" ,"entertainment", "ev", "auto"];

    const handleItemClick = (item) => {
        setCategory(item);
        setSearch('');
    }

  return (
        <div className="list">
            {
                arr.map((item, index) => (
                    <p 
                    key={index} 
                    onClick={() => handleItemClick(item)} 
                    className={item == category ? 'active' : ''}>{item}
                    </p>
                ))
            }
        </div>
  )
}

export default Categories;