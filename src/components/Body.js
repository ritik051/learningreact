import RestaurentCard  ,{withPromotedLabel} from "./RestaurentCard";
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
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.316494&lng=78.032188&offset=0&sortBy=RELEVANT&sortOrder=DESC&pageType=SEE_ALL");
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

    const onlineStatus = useOnlineStatus();

    const RestaurentCardPromoted = withPromotedLabel(RestaurentCard);

    if(onlineStatus === false) {
        return <h1>Looks like you are offline!</h1>;
    }
    if(restaurants.length === 0) {
        return <Simmer/>;
    }
    
    return(
        <div className="appBody">
            <div className="filter">
                <button className="m-2 border border-gray-300 rounded-md" onClick={() => {
                    const filtered = originalRestaurants.filter(
                        (res) => res.info?.avgRating>4.4
                    );
                    setRestaurants(filtered);
                }}>Top rated</button> 
                <div className="pl-2">
                    <input type="text" placeholder="Search for restaurent" className="border border-gray-300 rounded-md " value={searchText} onChange={(e) => {setSearchText(e.target.value)}}></input>
                    <button className="m-1 p-1 border border-gray-300 rounded-md" 
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
            
            <div className="flex flex-wrap">
                {restaurants.map((restaurent) => (
                    <Link key={restaurent.info.id} to={"/city/dehradun/"+restaurent.info.id}>
                        {restaurent.info.promoted?(<RestaurentCardPromoted resData = {restaurent} />):(<RestaurentCard  resData = {restaurent} />)}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Body;
