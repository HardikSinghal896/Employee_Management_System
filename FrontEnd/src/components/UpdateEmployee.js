import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const UpdateEmployee = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [employee, setemployee] = useState({
        id: id,
        firstName: "",
        lastName: "",
        emailId: "",
    });
    
    const handleChange = (e) => {
        const value = e.target.value;
        console.log(value);
        setemployee({ ...employee, [e.target.name]: value });
    }
    useEffect(() => {
      const fetchData = async () =>{
        try{
            const response = await EmployeeService.getEmployeeById(employee.id);
            setemployee(response.data);
        } catch(error){
            console.log(error);
        }
      }
      fetchData();
    },[employee.id])
    const updateEmployee = async (e) => {
        e.preventDefault();
        console.log(employee);
        await EmployeeService.updateEmployee(employee,id);
        navigate("/employeeList");
    }
    // console.log("outside");
    const cancel = () =>{
        navigate("/employeeList");
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
                        <button onClick={updateEmployee} className='mx-2 rounded font-semibold text-white bg-green-400 py-2 px-6 hover:bg-green-700'>Save</button>
                        <button onClick={cancel} className='mx-2 rounded font-semibold text-white bg-red-400 py-2 px-6 hover:bg-red-700'>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateEmployee