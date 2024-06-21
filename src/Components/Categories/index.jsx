import { useContext } from 'react';
import './style.css';
import { CategoryContext } from '../../Context/CategoryContext';

const Categories = () => {

    const {category, setCategory} = useContext(CategoryContext);
    console.log("dtata is ",category);
    const arr = ["finance", "business", "technology", "regional", "health", "sports" ,"entertainment", "ev", "auto"];

    const handleItemClick = (item) => {
        setCategory(item);
    }

  return (
    <div>
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
    </div>
  )
}

export default Categories;