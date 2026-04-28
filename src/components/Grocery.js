import useOnlineStatus from "../utils/useOnlineStatus";

const Grocery = () => {
    const onlineStatus = useOnlineStatus();
    if(onlineStatus === false) {
        return <h1>Looks like you are offline!</h1>;
    }
    return (
        <div>
            <h1>Grocery</h1>
            <h2>there are many things in this grocery store</h2>
            <h2>this grocery component is very big(like an app)</h2>
        </div>
    )
}

export default Grocery;
