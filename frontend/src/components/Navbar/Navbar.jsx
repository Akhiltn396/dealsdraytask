import "./Navbar.css"
import { Link, useNavigate } from "react-router-dom"

const Navbar = () =>{

    const navigate = useNavigate()

    const username = sessionStorage.getItem('username');
const handleLogout = () =>{
    sessionStorage.removeItem('username');
    navigate("/login")

}

    return (
        <div className="navbar">
            
            <Link to="/">Home</Link>
            <Link to="/employees">Employee List</Link>
           
            <div className="last">
                <span>{username}</span>
                <button onClick={handleLogout}>Logout</button>
            </div>
            
        </div>
    )
}
export default Navbar