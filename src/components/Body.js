import RestaurentCard from "./RestaurentCard";
import { useEffect, useState } from "react";
import Simmer from "./simmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () =>{
    const [restaurants, setRestaurants] = useState([]);
    const [originalRestaurants, setOriginalRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");

    console.log("Body Rendered");
    useEffect(()=> {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.316494&lng=78.032188&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();
        console.log(json);
        const restaurantsData = json?.data?.cards
            ?.find(
                (card) =>
                    card?.card?.card?.id === "restaurant_grid_listing_v2"
            )
            ?.card?.card?.gridElements?.infoWithStyle?.restaurants;

        setRestaurants(restaurantsData || []);
        setOriginalRestaurants(restaurantsData || []);
    }

    console.log(restaurants);
    const onlineStatus = useOnlineStatus();

    if(onlineStatus === false) {
        return <h1>Looks like you are offline!</h1>;
    }
    if(restaurants.length === 0) {
        return <Simmer/>;
    }
    
    return(
        <div className="appBody">
            <div className="filter">
                <button className="flt-btn" onClick={() => {
                    const filtered = originalRestaurants.filter(
                        (res) => res.info?.avgRating>4.4
                    );
                    setRestaurants(filtered);
                }}>Top rated</button> 
                <div className="search">
                    <input type="text" placeholder="Search for restaurent" className="search-box" value={searchText} onChange={(e) => {setSearchText(e.target.value)}}></input>
                    <button className="search-btn" 
                    onClick={() => {
                        // my logic for searching the restaurent on the keywords
                        const searchesRestaurents = originalRestaurants.filter((res) => {
                            const name = res.info?.name?.toLowerCase() || "";
                            const searchTextLower = searchText.toLowerCase();
                            return name.includes(searchTextLower);
                        });
                        setRestaurants(searchesRestaurents);
                    }
                    }>Search</button>
                </div>
            </div>
            
            <div className="restaurent-container">
                {restaurants.map((restaurent) => (
                    <Link key={restaurent.info.id} to={"/city/dehradun/"+restaurent.info.id}><RestaurentCard  resData = {restaurent} /></Link>
                ))}
            </div>
        </div>
    )
}

export default Body;