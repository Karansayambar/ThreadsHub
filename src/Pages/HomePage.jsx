import Categories from "../Components/Categories"
import MainPage from "../Components/MainPage/MainPage"
import Navbar from "../Components/Navbar"

//Home Page render all the Main Components
const HomePage = () => {
  return (
    <div>
        <Navbar/>
        <Categories/>
        <MainPage/> 
    </div>
  )
}

export default HomePage