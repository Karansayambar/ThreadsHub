import './style.css';
import TH_LOGO from '../../assets/TH_LOGO.png';
import { FaLocationDot } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { changeIcons } from '../../Functions/useIcons';
import useCheckMobileScreen from '../../Functions/useCheckMobileScreen';
import Search from '../Search';
import { CategoryContext } from '../../Context/CategoryContext';
import { FcLike } from "react-icons/fc";




const Navbar = () => {
    const {search, setSearch} = useContext(CategoryContext);
    const [data, setData] = useState();
    const [searchToggle, setSearchToggle] = useState(false);
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const isMobile = useCheckMobileScreen();


    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocation({ latitude: latitude, longitude: longitude });
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
        if (location.latitude && location.longitude) {
            const getData = async () => {
                try {
                    const apiKey = 'c86500a1fc2f9fb96d800d7cd5a6d455';  // Replace with your actual WeatherAPI key
                    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}`;

                    const response = await axios.get(url);
                    setData(response.data);
                } catch (error) {
                    console.log(error);
                } 
            };
            getData();
        } else {
            console.log("Latitude and Longitude not provided");
        }
    }, [location]);

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
                            <p><FaLocationDot /> {data.name}</p>
                        </>
                    }
                </div>
                <span className='logo'>
                    <img className='logo-img' src={TH_LOGO} />
                    <p className='logo-text'>TRENDS Hub</p>
                </span>
                {!isMobile && (
                    <div className='search' onClick={() => setSearchToggle(true)}>
                        {searchToggle ? (
                            <Search/>
                        ) : (
                            <>
                                <p><IoSearchSharp className='search-logo' /></p>
                            </>
                        )
                        }
                    </div>
                )}
                <div className='badge-container'><FcLike style={{ fontSize: '30px' }}/><span class="badge">1</span></div>
            </div>
        </div>
    )
}

export default Navbar