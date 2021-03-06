import React from "react";
import { FieldProps } from "formik";
import ReactJson from "react-json-view";

import { makeStyles, createStyles, useTheme } from "@material-ui/core";

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
  })
);

const isValidJson = (val: any) => {
  try {
    if (typeof val === "string") JSON.parse(val);
    else JSON.stringify(val);
  } catch (error) {
    return false;
  }
  return true;
};

export default function JsonEditor({ form, field }: FieldProps) {
  const classes = useStyles();
  const theme = useTheme();

  const handleEdit = edit => {
    form.setFieldValue(field.name, edit.updated_src);
  };

  return (
    <div className={classes.root}>
      <ReactJson
        src={isValidJson(field.value) ? field.value : {}}
        onEdit={handleEdit}
        onAdd={handleEdit}
        onDelete={handleEdit}
        theme={{
          base00: "rgba(0, 0, 0, 0)",
          base01: theme.palette.background.default,
          base02: theme.palette.divider,
          base03: "#93a1a1",
          base04: theme.palette.text.disabled,
          base05: theme.palette.text.secondary,
          base06: "#073642",
          base07: theme.palette.text.primary,
          base08: "#d33682",
          base09: "#cb4b16",
          base0A: "#dc322f",
          base0B: "#859900",
          base0C: "#6c71c4",
          base0D: theme.palette.text.secondary,
          base0E: "#2aa198",
          base0F: "#268bd2",
        }}
        iconStyle="triangle"
        style={{
          fontFamily: "SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace",
          backgroundColor: "transparent",
        }}
      />
    </div>
  );
}
