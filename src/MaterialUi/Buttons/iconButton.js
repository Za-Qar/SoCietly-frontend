import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

export default function IconButtons({ icon, handleClick }) {
  switch (icon) {
    case "delete":
      return (
        <IconButton aria-label="delete" onClick={handleClick}>
          <DeleteIcon />
        </IconButton>
      );
    case "edit":
      return (
        <IconButton aria-label="edit" onClick={handleClick}>
          <EditIcon />
        </IconButton>
      );
    default:
      return (
        <IconButton aria-label="default" onClick={handleClick}></IconButton>
      );
  }
}
