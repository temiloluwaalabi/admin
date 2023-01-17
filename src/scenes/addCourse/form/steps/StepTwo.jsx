import { Field } from "formik";
import { TextField } from "formik-material-ui";
import { Box, Typography, useMediaQuery } from "@mui/material";
import * as Yup from "yup";

import React from "react";

const StepTwo = () => {
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
        name="skillLevel"
        variant="outlined"
        helperText="Begineers, advanced or expert?"
        component={TextField}
        label="Skill Level"
      />
      <Field
        name="requirements"
        variant="outlined"
        helperText="The requirements should be comma separated"
        component={TextField}
        label="Course Requirements"
        multiline
        maxRows = {6}
      />
      <Field
        name="courseDescription"
        variant="outlined"
        helperText="Detailed Description"
        component={TextField}
        label="Course Description"
        multiline
        maxRows = {10}
      />
    </Box>
  );
};

StepTwo.label = "Course Details";
StepTwo.initialValues = {
  skillLevel: "",
  requirements: "",
  courseDescription: "",
};
StepTwo.validationSchema = Yup.object().shape({
  skillLevel: Yup.string().required("Please enter the course skillLevel"),
  requirements: Yup.string().required("Please enter the short requirements"),
  courseDescription: Yup.string().required(
    "Please enter the Course Description"
  ),
});

export default StepTwo;
