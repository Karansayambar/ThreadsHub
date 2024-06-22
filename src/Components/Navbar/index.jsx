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
import Sidebar from '../Sidebar';

const Navbar = () => {
    const { search, setSearch, like, likedArticles } = useContext(CategoryContext);
    const [data, setData] = useState();
    const [searchToggle, setSearchToggle] = useState(false);
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
                    const apiKey = 'c86500a1fc2f9fb96d800d7cd5a6d455';
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

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <div className="navbar-container">
                <div className="navbar">
                    {/* Location information section */}
                    <div className='location'>
                        {data && (
                            <>
                                {/* Display weather icon and temperature */}
                                <p className='icon'>
                                    {changeIcons(data.weather[0].main)} {kelvinToCelsius(data.main.temp)}°C
                                </p>
                                {/* Display location name */}
                                <p><FaLocationDot /> {data.name}</p>
                            </>
                        )}
                    </div>

                    {/* Logo section */}
                    <span className='logo'>
                        <img className='logo-img' src={TH_LOGO} alt="TRENDS Hub Logo" />
                        <p className='logo-text'>TRENDS Hub</p>
                    </span>

                    {/* Right side of the navbar containing search and like badge */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem" }}>
                        {/* Conditional rendering for search functionality on non-mobile devices */}
                        {!isMobile && (
                            <div className='search' onClick={() => setSearchToggle(true)}>
                                {searchToggle ? (
                                    <Search />  // Display the search component if searchToggle is true
                                ) : (
                                    <p><IoSearchSharp className='search-logo' /></p>  // Display the search icon if searchToggle is false
                                )}
                            </div>
                        )}

                        {/* Like badge container */}
                        <div className='badge-container' onClick={toggleSidebar}>
                            <FcLike style={{ fontSize: '25px' }} />
                            {/* Display badge if there are likes */}
                            <span className={like > 0 ? "badge" : ""}>{like}</span>
                        </div>
                    </div>
                </div>
            </div>
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} likedArticles={likedArticles} />
        </>
    );
}

export default Navbar;
