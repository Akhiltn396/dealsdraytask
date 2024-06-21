import { useState } from "react"
import WelcomeAdmin from "../../components/WelcomeAdmin/WelcomeAdmin"
import "./Home.css"
import EmployeeCreate from "../../components/EmployeeCreate/EmployeeCreate"
const Home = () => {
    const [click, setClick] = useState(false)
    return (
        <div className="home">
            {!click ?
                <WelcomeAdmin setClick={setClick} />
                :
                <EmployeeCreate />
            }
        </div>
    )
}
export default Home