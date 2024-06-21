import React, { useEffect, useState } from 'react';
import './EmpDetails.css';
import newRequest from '../../utils/newRequest';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const EmpLists = () => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState('');
  const [sort, setSort] = useState('asc');
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      try {
        const res = await newRequest.get(`http://localhost:5000/api/employee/getEmployee?username=${username}&sort=${sort}`, { withCredentials: true });
        setData(res.data);
      } catch (err) {
        console.log(err);
        // setError(err);
      }
      // setLoading(false);
    };
    fetchData();
    
  }, [data]);


  const handleEdit = (id) => {
    navigate(`/employeedit/${id}`)
  }
  const handleDelete = async (id) => {
    try {
      const res = await newRequest.delete(`http://localhost:5000/api/employee/deleteEmployee/${id}`, { withCredentials: true }).then(function (response) {
        console.log(response);
        if (response?.status === 200) {
          toast("Employee deleted successfully")
        }
      })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }

  }

  const handleCreate = () => {
    navigate("/")
  }
  return (
    <div className="tableContainer">
      <h1>Employee List</h1>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      
      <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
        <p>Enter Search Keyword</p>
        <input type="text" onChange={(e)=>setUsername(e.target.value)}/>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
        <p>Sort Name</p>
        <div >
                    <select
                        name="sort"
                        id="sort"
                        onChange={(e)=>setSort(e.target.value)}
                    >
                        <option value="asc">ASC</option>
                        <option value="desc">DESC</option>
                       
                    </select>
                </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
        <div>Total count: {data?.length}</div>
        <button onClick={handleCreate}>Create Employee</button>
      </div>
      </div>
      
      <table className="employeeTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((employee) => (
            <tr key={employee._id}>
              <td>{employee._id}</td>
              <td><img src={employee.img[0]} alt={employee.name} width="50" height="50" /></td>
              <td>{employee.username}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.course}</td>
              {/* <td>{employee.createdAt}</td> */}
              <td>{format(new Date(employee.createdAt), 'dd/MM/yyyy')}</td>
              <td>
                <button style={{ backgroundColor: "green", border: "none", borderRadius: "5px", color: "white" }} onClick={() => handleEdit(employee._id)}>Edit</button>
                <button style={{ backgroundColor: "red", border: "none", borderRadius: "5px", color: "white" }} onClick={() => handleDelete(employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmpLists;
