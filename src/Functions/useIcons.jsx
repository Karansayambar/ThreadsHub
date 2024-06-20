import { FaCloud, FaCloudRain, FaRegSnowflake } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import { IoThunderstorm } from "react-icons/io5";
import { LuWind } from "react-icons/lu";
import { WiDayCloudy, WiHumidity } from "react-icons/wi";

export const changeIcons = ( icon ) => {
  switch (icon) {
    case "Cloud":
      return <FaCloud />;
    case "Rain":
      return <FaCloudRain />;
    case "Sunny":
      return <IoIosSunny />;
    case "Humidity":
      return <WiHumidity />;
    case "Wind":
      return <LuWind />;
    case "Snow":
      return <FaRegSnowflake />;
    case "Tornado":
      return <IoThunderstorm />;
    default:
      return <WiDayCloudy />;
  }
};
