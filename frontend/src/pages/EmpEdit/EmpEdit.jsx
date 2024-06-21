import { useEffect, useState } from "react";
import "./EmpEdit.css"
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import imageToBase64 from "../../helpers/imagetoBase64";
import { toast } from "react-toastify";

const EmpEdit = () => {
    const [values, setValues] = useState([])
    const id = useParams()
    useEffect(() => {
        const fetchData = async () => {
            // setLoading(true);
            try {
                const res = await newRequest.get(`http://localhost:5000/api/employee/getSingleEmployee/${id?.id}`, { withCredentials: true });
                setValues(res.data);
            } catch (err) {
                console.log(err);
                // setError(err);
            }
            // setLoading(false);
        };
        fetchData();
    }, []);

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        console.log(name, value, type, checked);
    }

    const handleSubmit =async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        console.log(Object.fromEntries(formData));
        const { img } = Object.fromEntries(formData)


        const editedData = Object.fromEntries(formData)
        const imagePic = await imageToBase64(img);
        console.log(imagePic);

        try {
            const res = newRequest
              .put(
                `/employee/updateEmployee/${id?.id}`,
                { ...editedData,img:imagePic},
                {
                  withCredentials: true,
                }
              )
              .then(function (response) {
                console.log(response);
                if (response?.status === 200) {
                  toast("Employee edited successfully")
                }
              })
              .catch(function (error) {
                console.log(error);
                
              });
          } catch (error) {
            console.log(error);
          }
    }

    return (
        <div className="empContainer">
            <h1>Edit Employee</h1>
            <form className="employeeCreate"
                onSubmit={handleSubmit}
            >
                <div className="empField">
                    <label htmlFor="username">Name</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder={values.username}
                      
                    />
                </div>

                <div className="empField">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder={values.email}
                     
                    />
                </div>

                <div className="empField">
                    <label htmlFor="phone">Number</label>
                    <input
                        type="number"
                        name="phone"
                        id="phone"
                        placeholder={values.phone}
                        // value={values.phone}
                    />
                </div>

                <div className="empField">
                    <label htmlFor="designation">Designation</label>
                    <select
                        name="designation"
                        id="designation"
                        // value={values.designation}
                        placeholder={values.designation}
                    >
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                        <option value="Accountant">Accountant</option>
                    </select>
                </div>

                <div className="empField">
                    <label>Gender</label>
                    <div>
                        <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="Male"
                            onChange={handleInputChange}
                        />
                        <label htmlFor="male">Male</label>
                        <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="Female"
                        />
                        <label htmlFor="female">Female</label>
                    </div>
                </div>

                <div className="empField">
                    <label htmlFor="course">Course</label>
                    <div>
                        <input
                            type="checkbox"
                            id="mca"
                            name="course"
                            value="MCA"
                        />
                        <label htmlFor="mca">MCA</label>
                        <input
                            type="checkbox"
                            id="bca"
                            name="course"
                            value="BCA"
                        />
                        <label htmlFor="bca">BCA</label>
                        <input
                            type="checkbox"
                            id="bsc"
                            name="course"
                            value="BSC"
                        />
                        <label htmlFor="bsc">BSC</label>
                    </div>
                </div>

                <div className="empField">
                    <label htmlFor="img">Image</label>
                    <input
                        type="file"
                        name="img"
                        id="img"
                        accept="image/jpeg,image/jpg, image/png"
                    />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
export default EmpEdit