import useOnlineStatus from "../utils/useOnlineStatus";

const About = () => {
    const onlineStatus = useOnlineStatus();
    if(onlineStatus === false) {
        return <h1>Looks like you are offline!</h1>;
    }
    return <div>
        <h1>About Us</h1>
    </div>
}

export default About;
