import React, { useState } from 'react';
import "./EmployeeCreate.css";
import newRequest from '../../utils/newRequest';
import imageToBase64 from '../../helpers/imagetoBase64';
import { toast } from 'react-toastify';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';



const EmployeeCreate = () => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);


  const [image, setImage] = useState(null)

  const empSchema = yup.object().shape({
    username: yup.string().min(4).max(12).required("Please enter fullname"),
    email: yup.string().email('Invalid email').required('Please enter email'),
    phone: yup.number().min(10).required("Please enter mobile number"),
    designation: yup.string().required("Please enter designation"),
    gender: yup.string().required("Please enter gender"),
    course: yup.array().required("Please enter course"),
  });
  
  const handleFileChange =async (event) => {
    const imagePic = await imageToBase64(event.target.files[0]);
    setImage(imagePic)
  };

  const handleSubmit = async (values) => {
    try {
      const res = newRequest
        .post(
          "/employee/createEmployee",
          { ...values, img: image },
          {
            withCredentials: true,
          }
        )
        .then(function (response) {
          console.log(response);
          if (response?.status === 200) {
            toast("Employee added successfully");

          }
        })
        .catch(function (error) {
          console.log(error);
          if (error?.response?.data?.message === 'Duplicate email') {
            toast("Email already entered")

          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="empContainer">
      <h1>Create Employee</h1>
      <Formik
        initialValues={{
          username: '',
          email: '',
          phone: '',
          designation: '',
          gender: '',
          course: []
        }}
        validationSchema={empSchema}
        onSubmit={values => {
          // same shape as initial values
          handleSubmit(values)

        }}

      >
        {({ errors, touched }) => (
          // <form className="employeeCreate" onSubmit={handleSubmit}>
          <Form className="employeeCreate">
            <div className="empField">
              <label htmlFor="username">Name</label>
              <Field type="text" name="username" id="username" placeholder='Employee name' />

            </div>
            {errors.username && touched.username ? (

              <div className="error">{errors.username}</div>
            ) : null}
            <div className="empField">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" id="email" placeholder='Employee email' />

            </div>
            {errors.email && touched.email ? (
              <div className="error">{errors.email}</div>
            ) : null}
            <div className="empField">
              <label htmlFor="phone">Number</label>
              <Field type="number" name="phone" id="phone" placeholder='Employee number' />

            </div>
            {errors.phone && touched.phone ? (
              <div className="error">{errors.phone}</div>
            ) : null}
            <div className="empField">
              <label htmlFor="designation">Designation</label>
              <Field as="select" name="designation" id="designation">
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
                <option value="Accountant">Accountant</option>
              </Field>

            </div>
            {errors.designation && touched.designation ? (
              <div className="error">{errors.designation}</div>
            ) : null}
            <div className="empField">
              <label htmlFor="gender">Gender</label>
              <div>
                <Field type="radio" id="male" name="gender" value="Male" />
                <label htmlFor="male">Male</label><br />
                <Field type="radio" id="female" name="gender" value="Female" />
                <label htmlFor="female">Female</label><br />
              </div>
            </div>
            {errors.gender && touched.gender ? (
              <div className="error">{errors.gender}</div>
            ) : null}
            <div className="empField">
              <label htmlFor="course">Course</label>
              <div>
                <Field type="checkbox" id="mca" name="course" value="MCA" />
                <label htmlFor="mca">MCA</label><br />
                <Field type="checkbox" id="bca" name="course" value="BCA" />
                <label htmlFor="bca">BCA</label><br />
                <Field type="checkbox" id="bsc" name="course" value="BSC" />
                <label htmlFor="bsc">BSC</label><br />
              </div>
            </div>
            {errors.course && touched.course ? (
              <div className="error">{errors.course}</div>
            ) : null}
            <div className="empField">
              <label htmlFor="img">Image</label>
              <input type="file" name="img" id="img" accept="image/jpeg,image/jpg, image/png" onChange={handleFileChange} />

            </div>
            <button type="submit" >Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EmployeeCreate;
