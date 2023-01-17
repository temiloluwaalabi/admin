import { Field } from "formik";
import { TextField } from "formik-material-ui";
import { Box, Typography, useMediaQuery } from "@mui/material";
import * as Yup from "yup";

import React from "react";

const StepThree = () => {
  const isNonMobile = useMediaQuery("(min-width:1000px)");

  return (
    <Box
      display="grid"
      width="100%"
      gap="30px"
      gridTemplateColumns="repeat(4, mixmax(0, 1fr))"
      sx={{
        "& > div": {
          gridColumn: isNonMobile ? undefined : "span 4",
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        },
      }}
    >
      {" "}
      <Field
        name="intention"
        variant="outlined"
        helperText="What will be gained from taking the course"
        component={TextField}
        label="Intention"
        multiline
        maxRows={6}
      />
      <Field
        name="thumbnail"
        variant="outlined"
        helperText="Please upload course thumbnail"
        component={TextField}
        label="Course Thumbnail"
      />
      <Field
        name="otherFiles"
        variant="outlined"
        helperText="Please upload other necessary files"
        component={TextField}
        label="Files"
      />
    </Box>
  );
};

StepThree.label = "Course Information";
StepThree.initialValues = {
  intention: "",
  thumbnail: "",
  otherFiles: "",
};
StepThree.validationSchema = Yup.object().shape({
  intention: Yup.string().required("Please enter the course intention"),
  thumbnail: Yup.string().required("Please enter the short thumbnail"),
  otherFiles: Yup.string().required("Please enter the course otherFiles"),
});

export default StepThree;
