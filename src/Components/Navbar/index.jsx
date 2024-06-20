import './style.css';
import TH_LOGO from '../../assets/TH_LOGO.png';
import { FaLocationDot} from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { changeIcons } from '../../Functions/useIcons';


const Navbar = () => {
    const [search, setSearch] = useState("");
    const [data , setData] = useState();
    const [searchToggle, setSearchToggle] = useState(false);
    const [location, setLocation] = useState({ lat: null, lon: null });

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocation({ lat: latitude, lon: longitude });
                    },
                    (error) => {
                        console.error("Error getting location:", error);
                    }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        };
        getLocation();
    }, []);


    useEffect(() => {
        if(location.lat && location.lon){
            const getData = async() => {
            const key = '3bd396daa9bc129133500fbad6d37a50'
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${key}`
            try{
                const response = await axios.get(url);
                setData(response.data)
                console.log("your data is",data);
            }catch(error){
                console.log(error);
            }
        }
        getData();
    }else{
        console.log("function not run");
    }
    },[])

     const kelvinToCelsius = (kelvin) => {
        return (kelvin - 273.15).toFixed(0); // Converting to Celsius and fixing to 2 decimal places
    };

  return (
    <div className="navbar-container">
        <div className="navbar">
            <div className='location'>
                {data && 
                    <>
                    <p className='icon'>{changeIcons(data.weather[0].main)} {kelvinToCelsius(data.main.temp)}°C</p>
                    <p><FaLocationDot/> {data.name}</p>
                    </>
                }
            </div>
            <span className='logo'>
                <img className='logo-img' src={TH_LOGO}/>
                <p className='logo-text'>TRENDS Hub</p>
            </span>
            <div className='search' onClick={()=> setSearchToggle(true)}>
                {searchToggle ? (
                    <input type='text' placeholder='Search' value={search}/>
                ) : (
                    <>
                    <p><IoSearchSharp className='search-logo'/></p>
                    </>
                )
                }
            </div>
        </div>
    </div>
  )
}

export default Navbar