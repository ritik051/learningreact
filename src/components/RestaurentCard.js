import { RES_URL } from "../utils/constants";

const RestaurentCard = (props) => {
    const { resData } = props;
    const { name, cuisines, avgRating, costForTwo, cloudinaryImageId, sla } = resData.info;
    return(
        <div className="w-62.5 p-2 m-2 shadow-lg bg-pink-50">
            <img 
                className="resCardImg" 
                src={RES_URL + cloudinaryImageId} 
                alt={name}
            />
            <h3> {name}</h3>
            <h4> {cuisines?.join(", ")}</h4>
            <h4> {avgRating+ " 🌟"}</h4>
            <h4> {costForTwo}</h4>
            <h4> {sla.slaString}</h4>
        </div>
    )
}

export const withPromotedLabel= (RestaurentCard) => {
    return (props) => {
        return (
            <div>
                <label className="absolute bg-green-500 text-white p-2 m-2">Promoted</label>
                <RestaurentCard {...props}/>
            </div>
        )
    }
}

export default RestaurentCard;
