import React from "react";
//import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     justifyContent: "center",
//     flexWrap: "wrap",
//     "& > *": {
//       margin: theme.spacing(0.5),
//     },
//   },
// }));

export default function Tags({ item, deleteSkill, index, showDelete }) {
  //const classes = useStyles();

  const handleDelete = (e) => {
    deleteSkill(index, e);
    console.info("You clicked the delete icon.");
  };

  // const handleClick = () => {
  //   console.info("You clicked the Chip.");
  // };

  return showDelete ? (
    <Chip label={item} color="primary" />
  ) : (
    <Chip label={item} onDelete={handleDelete} color="primary" />
  );
}
