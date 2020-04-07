import React, { useState } from "react";
import { FieldProps } from "formik";
//import ReactJson from "react-json-view";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
//import Fab from '@material-ui/core/Fab';
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import { makeStyles, createStyles, withStyles } from "@material-ui/core";
//import { TextField } from "formik-material-ui";
import TextField from "@material-ui/core/TextField";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#e22729",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

//const { updateCell } = useFiretableContext();

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      backgroundColor:
        theme.palette.type === "light"
          ? "rgba(0, 0, 0, 0.09)"
          : "rgba(255, 255, 255, 0.09)",
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(2),

      margin: 0,
      width: "100%",
      minHeight: 56,
      overflowX: "auto",
    },
    table: {
      minWidth: 250,
    },
  })
);

const CustomRow = ({ val, field, form, shareVal }) => {
  const [isEditing, setisEditing] = useState(false);
  const [shares, setShares] = useState(shareVal);

  const handleEdit = () => {
    setisEditing(true);
  };

  const handleChange = (e, name) => {
    setShares(e.target.value);
  };

  const finalEdit = name => {
    setisEditing(false);
    if (!isNaN(shares)) {
      let temp = { ...field.value };
      temp[name].shareTotal = shares * Math.pow(10, 8);
      form.setFieldValue(field.name, JSON.parse(JSON.stringify(temp)));

      console.trace();
      console.log("Field: ", field);
      console.log("Form: ", form);
    } else {
      setShares(shareVal);
    }
  };
  console.log("value: " + JSON.stringify(val));
  let retailer;

  switch (val[0]) {
    case "F63YLxlqsllN3Ry2tnZl":
      retailer = "HFG (HelloFresh)";
      break;
    case "dvJFrauoNHljAE4Gs6C4":
      retailer = "AGL CommFac";
      break;
    case "knKgDArbnBHAe8t0Hgyv":
      retailer = "AVG (Australian Vintage)";
      break;
  }

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {retailer}
      </TableCell>

      {isEditing ? (
        <TableCell align="right">
          <TextField
            onChange={e => handleChange(e, val[0])}
            label="Shares"
            value={shares}
          />
        </TableCell>
      ) : (
        <TableCell align="right">{shares}</TableCell>
      )}
      <TableCell>
        {isEditing ? (
          <Tooltip title="Finish">
            <DoneIcon onClick={() => finalEdit(val[0])} />
          </Tooltip>
        ) : (
          <Tooltip title="Edit">
            <EditIcon onClick={e => handleEdit()} />
          </Tooltip>
        )}
      </TableCell>
    </TableRow>
  );
};
export default function JsonEditor({ form, field }: FieldProps) {
  const classes = useStyles();
  //   form.setFieldValue(field.name, edit.updated_src);
  // };

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Company</StyledTableCell>
              <StyledTableCell align="right">Total Shares</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(field.value).map((val: any, index) => {
              return (
                <CustomRow
                  field={field}
                  form={form}
                  val={val}
                  key={index}
                  shareVal={val[1].shareTotal / Math.pow(10, 8)}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
