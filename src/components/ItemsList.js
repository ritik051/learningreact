import { useDispatch } from "react-redux"
import { RES_URL } from "../utils/constants"
import { addItems } from "../utils/cartSlice";

const ItemsList = ({ data }) => {
    // console.log(data);
    const dispatch = useDispatch();
    const handleAdd = (item) => {
        dispatch(addItems(item));
    }

    return <div>
        {data?.map((item) => {
            return (
                <div key={item?.card?.info?.id} className="flex justify-between p-2 border-b border-gray-200">
                    <div className="">
                        <span>{item?.card?.info?.name}</span>
                        <div className="text-left">₹{item?.card?.info?.price / 100 || item?.card?.info?.defaultPrice / 100}</div>
                    </div>
                    <div>
                        <img className="w-20" src={RES_URL+ item?.card?.info?.imageId}></img>
                        <button className="p-1 bg-black text-white rounded-md mt-2 cursor-pointer"
                            onClick={() => handleAdd(item)}>Add +</button>
                    </div>
                </div>
            )
        })}
    </div>
}

export default ItemsList;