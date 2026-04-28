import useOnlineStatus from "../utils/useOnlineStatus";

const Contact = () => {
    const onlineStatus = useOnlineStatus();
    if(onlineStatus === false) {
        return <h1>Looks like you are offline!</h1>;
    }
    return <div>
        <h1> Contact Us</h1>
        <p>Contact us at: info@company.com</p>
        <p>Call us at: 1-800-123-4567</p>
        <p>Visit us at: 123 Main Street, City, State 12345</p>
        <input className="border border-black m-2 p-2" type="text" placeholder="Your Name" />
        <input className="border border-black m-2 p-2" type="email" placeholder="Your Email" />
        <button className="bg-blue-500 text-white p-2 rounded">Submit</button>
    </div>
}

export default Contact;
