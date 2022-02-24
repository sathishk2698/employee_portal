import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Map from "../../common/map";
import './style.css';

const EmployeeDetails = () => {
  const [userDetail, setUserDetail] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    let employeesData = JSON.parse(
      sessionStorage.getItem("totalEmployees")
    ).employeesData;
    if (employeesData.length > 0) {
      let filterEmployeeData = employeesData.filter((val) => val.emp_id === id);
      setUserDetail(filterEmployeeData);
    }
  }, [id]);

  return (
    <div>
      <div className="btnContainer">
        <button className="goBackBtn" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
      <div className="employeeContainer">
        <div>
          <h1>EMPLOYEE DETAIL:</h1>
          {userDetail.length > 0 &&
            userDetail.map((key) => {
              return (
                <div key={key.emp_id}>
                  <img src={key.emp_photo_path} alt={key.emp_name} style={{width: '125px', height: '125px'}}/>
                  <p style={{ color: "green" }}>{key.emp_experience}</p>
                  <div className="employeeDetailContainer">
                    <div>
                      <p>Name: </p>
                      <p>Employee ID: </p>
                      <p>Address: </p>
                      <p>Department: </p>
                      <p>Designation: </p>
                      <p>Salary: </p>
                    </div>
                    <div>
                      <p>{key.emp_name}</p>
                      <p>{key.emp_id}</p>
                      <p>{key.emp_address}</p>
                      <p>{key.emp_department}</p>
                      <p>{key.emp_designation}</p>
                      <p>{key.emp_salary}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <Map empId={id} userData={userDetail} />
      </div>
    </div>
  );
};

export default EmployeeDetails;
