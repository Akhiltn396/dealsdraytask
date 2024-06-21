const Employee = require("../models/Employee");

const createEmployee = async (req, res) => {
    try {

        const existingUser = await Employee.findOne({ email:req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Duplicate email' });
        }
        const newHotel = await Employee.create({
            ...req.body,
        });


        res.json(newHotel);
    } catch (error) {
        console.log(error);
    }
};
const getEmployee = async (req, res, next) => {
  try {
    let { username, sort } = req.query;

    const query = Employee.find({ username: { $regex: username ? username : "", $options: "i" } });

    if (sort === 'asc') {
      query.sort({ username: 1 }); 
    } else if (sort === 'desc') {
      query.sort({ username: -1 }); 
    }

    const employees = await query.exec();

    res.status(200).json(employees);
  } catch (err) {
    next(err); 
  }
};


const updateEmployee = async (req, res) => {
    try {
      const updateEmployee = await Employee.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateEmployee);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  const deleteEmployee = async (req, res) => {
    try {
      await Employee.findByIdAndDelete(req.params.id);
      res.status(200).json("Employee data has been deleted succesfully");
    } catch (error) {
      res.status(500).json(error);
    }
  };

  const getSingleEmployee = async (req, res, next) => {
    const id = req.params.id;
  
    try {
      const SingleEmployee = await Employee.findById(id);
  
      if (!SingleEmployee) return res.json("Employee not found");
  
      res.status(200).json(SingleEmployee);
    } catch (error) {
      next(error);
    }
  };
module.exports = { createEmployee, getEmployee,updateEmployee,deleteEmployee,getSingleEmployee };