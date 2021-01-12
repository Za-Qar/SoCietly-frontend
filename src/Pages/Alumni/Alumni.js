//React
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Config
import { url } from "../../config";

// Style
import style from "./alumni.module.css";

// Components
import CohortContainer from "../../Components/CohortContainer/cohortContainer";

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
    <div>
      <h3>Alumni</h3>
      <div>
        <label for="filter">Filter by Cohort</label>
        <select
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
        </select>
      </div>
      {filter && <button onClick={() => setFilter(null)}>X</button>}
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
