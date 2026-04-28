import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";
import Cart from "./Cart";

const Header = () => {
    const[loginBtn, setLoginBtn] = useState("Login");
    const onlineStatus = useOnlineStatus();
    const cartItems = useSelector((store) => store.cart.items);
    
    return (
        <div className="flex justify-between items-center bg-pink-100">
            <div className="logo-container">
                <img className="w-20" src={LOGO_URL}></img>
            </div>
            <div className="">
                <ul className="flex gap-10 p-4 m-4">
                    <li>Online Status: {onlineStatus ? "🟢":"🔴"}</li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                    <li><Link to="/grocery">Grocery</Link></li>
                    <li><Link to="/cart">🛒 ({cartItems.length}) </Link></li>
                    <button className="login" 
                    onClick={() => {
                        (loginBtn === "Login") ?setLoginBtn("Logout") : setLoginBtn("Login");
                    }}>{loginBtn}</button>
                </ul>
            </div>
        </div>
    )
}

export default Header;
