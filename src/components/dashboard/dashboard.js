import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Card,
  InputLabel,
  FormControl,
  NativeSelect,
} from "@material-ui/core";
import employeesData from "../../data/employees.json";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState([]);
  const searchDept = sessionStorage.getItem("selectedDepartment");

  useEffect(() => {
    sessionStorage.setItem("totalEmployees", JSON.stringify(employeesData));
    let getSelectedValue = sessionStorage.getItem("selectedDepartment");
    const employeeData = JSON.parse(
      sessionStorage.getItem("totalEmployees")
    ).employeesData;
    if (getSelectedValue && getSelectedValue !== "All") {
      const filteredData = employeeData.filter(
        (val) => val.emp_department === getSelectedValue && getSelectedValue
      );
      setSearchData(filteredData);
    } else {
      setSearchData(
        JSON.parse(sessionStorage.getItem("totalEmployees")).employeesData
      );
    }
  }, []);

  const viewMoreDetailsHandler = useCallback((id) => {
    navigate(`/employee-view/${id}`);
  }, []);

  const selectDeptHandler = useCallback((e) => {
    let value = e.target.value;
    sessionStorage.setItem("selectedDepartment", value);
    let getSelectedValue = sessionStorage.getItem("selectedDepartment");
    const employeeData = JSON.parse(
      sessionStorage.getItem("totalEmployees")
    ).employeesData;
    if (value !== "All") {
      const filteredData = employeeData.filter(
        (val) => val.emp_department === getSelectedValue && getSelectedValue
      );
      setSearchData(filteredData);
    } else {
      setSearchData(
        JSON.parse(sessionStorage.getItem("totalEmployees")).employeesData
      );
    }
  }, []);

  return (
    <div className="customMargin">
      <div className="dashboardHeader">
        <h1>Employee's Dashboard</h1>
        <FormControl className="searchContainer">
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Search Employees by department:
          </InputLabel>
          <NativeSelect
            defaultValue={searchDept ? `${searchDept}` : "All"}
            onChange={(e) => selectDeptHandler(e)}
          >
            <option value="All">All</option>
            <option value="Software Developement">Software Developement</option>
            <option value="Account">Account</option>
          </NativeSelect>
        </FormControl>
      </div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {searchData.length > 0 &&
            searchData.map((key) => (
              <Grid item xs={2} sm={4} md={4} key={key.emp_id}>
                <Card sx={{ maxWidth: 250 }} className="customMargin">
                  <CardMedia
                    component="img"
                    height="140"
                    image={key.emp_photo_path}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {key.emp_name}
                    </Typography>
                    <Typography variant="body2" className="experiencePara">
                      {key.emp_experience}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      className="viewMoreBtn"
                      onClick={() => viewMoreDetailsHandler(key.emp_id)}
                    >
                      View More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Dashboard;
