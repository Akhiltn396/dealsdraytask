import "./WelcomeAdmin.css"
const WelcomeAdmin = ({setClick}) =>{

    return (
        <div className="welcomeAdmin">
             <h1>Welcome to Admin Panel</h1>
             <button className="btn" onClick={()=>setClick(true)}>Create new Employee</button>
        </div>
    )
}
export default WelcomeAdmin