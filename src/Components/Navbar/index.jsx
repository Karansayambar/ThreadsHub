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



const Navbar = () => {
    const {search, setSearch} = useContext(CategoryContext);
    const [data, setData] = useState();
    const [searchToggle, setSearchToggle] = useState(false);
    const [location, setLocation] = useState({ lat: null, lon: null });
    const isMobile = useCheckMobileScreen();


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
        if (location.lat && location.lon) {
            const getData = async () => {
                try {
                setIsLoading(true);
                const api_key = 'your-api-key';
                const url = `https://api.oikolab.com/weather?lat=${lat}&lon=${lon}&api-key=${api_key}`;

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setWeatherData(data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
            }
            getData();
        } else {
            console.log("function not run");
        }
    }, [])

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
            </div>
        </div>
    )
}

export default Navbar