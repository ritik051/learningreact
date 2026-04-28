import { useParams } from "react-router-dom";
import Simmer from "./simmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurentCategory from "./RestaurentCategory";
import { useState } from "react";

const RestaurantMenu = () => {
    const {resId} = useParams();
    const resInfo = useRestaurantMenu(resId);
    const [showIndex, setShowIndex] = useState(0);

    const { name, cuisines, avgRating, costForTwoMessage } = resInfo?.cards[2]?.card?.card?.info || {};
    const menuItems = resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards;
    if(resInfo === null) {
        return <Simmer />;
    }
    
    const categories = resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (c) => {
            return c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    });
    return (
        <div className="text-center">
            <h1 className="font-bold text-2xl">{name}</h1>
            <h3 className="font-bold ">{cuisines?.join(", ")}</h3>
            <h3 className="font-bold">{avgRating}</h3>
            <h3 className="font-bold">{costForTwoMessage}</h3>
            <h2 className="font-bold text-xl">Restaurant Menu</h2>
            {categories.map((category, index) => {
                return (<RestaurentCategory 
                            key={category?.card?.card?.title} 
                            data={category?.card?.card}
                            isOpen = {index === showIndex}
                            setShowIndex={() => 
                                setShowIndex((prevIndex) => 
                                    prevIndex === index ? null : index
                                )
                        }
                        />)
            })}
        </div>
    );
}

export default RestaurantMenu;
