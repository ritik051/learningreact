import { useEffect, useState } from "react";
import { MENU_URL } from "./constants";

const useRestaurantMenu = (resId) => {

    const[resInfo,setResInfo] = useState(null);
    useEffect(
        () => {
            fetchMenu();
        },[]
    )
    const fetchMenu = async () => {
        const data = await fetch(MENU_URL + resId);
        const response = await data.json();
        console.log(response);

        setResInfo(response?.data);
    }
    return resInfo;
}

export default useRestaurantMenu;
