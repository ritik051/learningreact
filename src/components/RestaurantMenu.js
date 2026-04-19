import { useParams } from "react-router-dom";
import Simmer from "./simmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
    const {resId} = useParams();
    const resInfo = useRestaurantMenu(resId);

    const { name, cuisines, avgRating, costForTwoMessage } = resInfo?.cards[2]?.card?.card?.info || {};
    const menuItems = resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards;
    if(resInfo === null) {
        return <Simmer />;
    }
    return (
        <div className="menu">
            <h1>{name}</h1>
            <h3>{cuisines?.join(", ")}</h3>
            <h3>{avgRating}</h3>
            <h3>{costForTwoMessage}</h3>
            <h2>Restaurant Menu</h2>
            <ul>
                {menuItems?.map((items) => {
                    return (<li key={items?.card?.info?.id} >{items?.card?.info?.name} - {"₹"}{items?.card?.info?.price / 100}</li>);
                })
                }
            </ul>
        </div>
    );
}

export default RestaurantMenu;