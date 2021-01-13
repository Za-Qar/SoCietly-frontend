//React
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Config
import { url } from "../../config";

// Style
import style from "./alumni.module.css";
import cn from "classnames";

// Components
import CohortContainer from "../../Components/CohortContainer/cohortContainer";

//MUI
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";


export default function GetAllAlumni() {
  const [allAlumni, setAllAlumni] = useState([]);
  const [filter, setFilter] = useState(null);

  // Creates an array containg cohort number values
  // This will render a container for each cohort value
  const cohortArray = allAlumni.reduce((acc, curr) => {
    if (acc.find((value) => value === curr.cohort)) {
      return acc;
    }
    return [...acc, curr.cohort];
  }, []);

  async function getUserInfo() {
    let res = await fetch(`${url}/users`);
    let data = await res.json();
    console.log(data);
    setAllAlumni(data.payload);
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className={style.container}>
      <h3>Alumni</h3>
      <div>
        {/* <label for="filter">Filter by Cohort</label>
        <br /> */}
        <div className="marginBottom">
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Filter by Cohort
          </InputLabel>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={filter ? filter : "all"}
            onChange={(e) => {
              if (e.target.value === "all") {
                setFilter(null);
                return;
              }
              setFilter(parseInt(e.target.value));
            }}
          >
            <MenuItem value={"all"}>All</MenuItem>
            {cohortArray.map((value) => {
              return <MenuItem value={value}>Cohort {value}</MenuItem>;
            })}
          </Select>
        </div>
        {/* <select
          className={cn("marginBottom", style.customSelect)}
          name="filter"
          onChange={(e) => {
            if (e.target.value === "all") {
              setFilter(null);
              return;
            }
            setFilter(parseInt(e.target.value));
          }}
        >
          <option selected value={"all"}>
            All
          </option>
          {cohortArray.map((value) => {
            return <option value={value}>Cohort {value}</option>;
          })}
        </select> */}
      </div>
      {/* {filter && (
        <IconButton aria-label="delete">
          <CancelIcon />
        </IconButton>
      )} */}
      {/* {filter && <button onClick={() => setFilter(null)}>X</button>} */}
      {cohortArray &&
        cohortArray.map((value) => {
          if (!filter || filter === value) {
            return (
              <CohortContainer allAlumni={allAlumni} cohortValue={value} />
            );
          }
          return null;
        })}
    </div>
  );
}
