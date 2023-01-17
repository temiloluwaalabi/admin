import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Box, TextareaAutosize, Typography, useMediaQuery } from '@mui/material';
import * as Yup from 'yup';

import React from 'react'

const StepOne = props => {
  const isNonMobile = useMediaQuery("(min-width:1000px)")
  return (
    <Box  display="grid"
    width="100%"
    gap="30px"
    gridTemplateColumns="repeat(4, mixmax(0, 1fr))"
    sx={{      "& > div": {
        gridColumn: isNonMobile ? undefined : "span 4",
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      },
    }}
    >
        <Field
              name="courseTitle"
              variant="outlined"
              helperText="Please enter the course title"
              component={TextField}
              label="Course Title"
              sx={{gridColumn: "span 4"}} 
            />
            <Field
            sx={{gridColumn: "span 4"}} 
              name="shortDesciption"
              variant="outlined"
              helperText="Please enter short description"
              component={TextField}
              multiline
              maxRows={4}
              label="Short Description"
            />
            <Field
            sx={{gridColumn: "span 4"}} 
              name="categories"
              variant="outlined"
              helperText="Course Category"
              component={TextField}
              label="Course Category"
            />
            <Field
            sx={{gridColumn: "span 4"}} 
              name="price"
              variant="outlined"
              component={TextField}
              label="Price"
            />
    </Box>
  )
};

StepOne.label = 'Course Information';
StepOne.initialValues = {
	courseTitle: '',
	shortDesciption: '',
	categories: '',
	price: ''
};
StepOne.validationSchema = Yup.object().shape({
	courseTitle: Yup.string().required('Please enter the course title'),
	shortDesciption: Yup.string().required('Please enter the short description'),
	categories: Yup.string().required('Please enter the course category'),
	price: Yup.string().required('Please enter the price')
});

export default StepOne