import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    id: "",
    firstName: "",
    lastName: "",
    emailId: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const value = e.target.value;
    
    setEmployee({ ...employee, [e.target.name]: value })
  }

  const saveEmployee = (e) => {
    e.preventDefault();
    EmployeeService.saveEmployee(employee)
      .then((response) => {
        console.log(response);
        navigate("/employeeList");
      }).catch((error) => {
        console.log(error)
      })
  }
  const reset = (e) =>{
    e.preventDefault();
    setEmployee({
      id: "",
      firstName: "",
      lastName: "",
      emailId: "",
    });
  }
  return (
    <div className='flex max-w-2xl mx-auto shadow border-b'>
      <div className='px-8 py-8 mx-auto' >
        <div className='tracking-wider font-thin text-2xl'>
          <h1>Add New Employee</h1>
        </div>
        <div className='items-center justify-center h-17 w-full my-4'>
          <label className='block text-gray-600 text-sm font-normal'>First Name</label>
          <input type={"text"} name="firstName" value={employee.firstName} onChange={(e) => { handleChange(e) }} className="h-10 w-96 border mt-2" />
          <label className='block text-gray-600 text-sm font-normal mt-3'>Last Name</label>
          <input type={"text"} name="lastName" value={employee.lastName} onChange={(e) => { handleChange(e) }} className="h-10 w-96 border mt-2" />
          <label className='block text-gray-600 text-sm font-normal mt-3'>Email</label>
          <input type={"text"} name="emailId" value={employee.emailId} onChange={(e) => { handleChange(e) }} className="h-10 w-96 border mt-2" />

          <div className='flex justify-center'>
            <button onClick={saveEmployee} className='mx-2 rounded font-semibold text-white bg-green-400 py-2 px-6 hover:bg-green-700'>Save</button>
            <button onClick={reset} className='mx-2 rounded font-semibold text-white bg-red-400 py-2 px-6 hover:bg-red-700'>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEmployee