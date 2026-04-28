import { useSelector, useDispatch } from "react-redux";
import ItemsList from "./ItemsList";
import { clearItems } from "../utils/cartSlice";

const Cart = () => {

    const cartItems = useSelector((store) => {
        return store.cart.items;
    })
    const dispatch = useDispatch();
    const handleClearCart = () => {
        dispatch(clearItems());
    }
    return (
        <div className="text-center m-4 p-4">
            <h1 className="font-bold text-2xl">Cart Items</h1>
            <div className="w-6/12 mx-auto">
                <button className="p-2 bg-black text-white rounded-md mt-4 mb-4 cursor-pointer" onClick={handleClearCart}>Clear Cart</button>
                {cartItems.length === 0 && <h1 className="font-bold text-xl">Cart is Empty <br></br> Buy something for yourself and for Your Family</h1>}
                <ItemsList data={cartItems}/>
            </div>
            
        </div>
    )
}

export default Cart;