import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { Box, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import { alignProperty } from "@mui/material/styles/cssUtils";
import Header from "components/Header";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Step, StepLabel, Stepper, MobileStepper } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import StepOne from "./form/steps/StepOne";
import StepTwo from "./form/steps/StepTwo";
import StepThree from "./form/steps/StepThree";
import FlexBetween from "components/FlexBetween";
import { useAddCourseMutation, useGetCourseQuery, useGetCoursesQuery } from "state/api";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
const steps = [StepOne, StepTwo, StepThree];
const AddCourse = () => {
const isNonMobile = useMediaQuery("(min-width:1000px)")
  const theme = useTheme();
  const [showBox, setShowBox] = useState(false);
  const [AddCourse] = useAddCourseMutation()
  const [activeStep, setActiveStep] = useState(0);
  const location = useLocation();

  const [newCourse, setNewCourse] = useState()
  const navigate = useNavigate();
  const isLastStep = () => {
    return activeStep === steps.length - 1;
  };

  const handlePrev = () => {
    setActiveStep(Math.max(activeStep - 1, 0));
  };
  const handleNext = () => [
    setActiveStep(Math.min(activeStep + 1, steps.length - 1)),
  ];
  const onSubmit = (values, formikBag) => {
    const { setSubmitting } = formikBag;

    if (!isLastStep()) {
      setSubmitting(false);
      handleNext();
      return;
    }
    AddCourse(values);
    <Navigate to="/" state={{from:location}} replace />
  };

  const initialValues = steps.reduce(
    (values, { initialValues }) => ({
      ...values,
      ...initialValues,
    }),
    {}
  );
  const ActiveStep = steps[activeStep];
  const validationSchema = ActiveStep.validationSchema;
const [course, setCourse] = useState('')
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState({
    courseTitle: "",
    price: "",
    skillLevel: "",
    thumbnail: "",
    courseDescription: "",
    requirements: "",
    intention: "",
    categories: "",
    shortDesciption: "",
    otherFiles: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <Box m="1.5rem 2.5rem">
      <FlexBetween
        sx={{
          dislay: "flex",
          alignItems: isNonMobile ? "center" : "flex-start",
          flexDirection: isNonMobile ? "row" : "column",
          justifyContent: "space-between",

        }}
      >
        <Header
          title="ADD NEW COURSE"
          subtitle="Click the button to add neww courses"
        />
        <Button
          sx={{ mt: "1rem", color: "" }}
          variant="outlined"
          onClick={handleClickOpen}
        >
          Add New Course
        </Button>
      </FlexBetween>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "75vh",
        }}
      >
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{
            backgroundColor: theme.palette.background.alt,
            borderRadius: "0.55rem",
            "& .MuiDialog-paper": {
              backgroundColor: theme.palette.background.alt,
              borderRadius: "0.55rem",
            },
          }}
        >
            <Box>
                <DialogTitle>Course Registration</DialogTitle>

                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
        >
          <CloseIcon />
        </IconButton>
            </Box>
          <DialogContent>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {({ isSubmitting, touched, values }) => (
                <>
                  <Form>
                    <Box
                      display="grid"
                      gap="30px"
                      mt="1rem"
                      gridTemplateColumns="repeat(4, mixmax(0, 1fr))"
                      sx={{
                        "& > div": {
                          gridColumn: isNonMobile ? undefined : "span 4",
                        },
                      }}
                    >
                      <Stepper sx={{gridColumn: "span 4"}} alternativeLabel activeStep={activeStep}>
                        {steps.map((step, index) => (
                          <Step key={index}>
                            <StepLabel>{steps[index].label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>

                      <Box sx={{gridColumn:"span 4"}}>
                        <Button
                            variant="primary"
                            disabled={activeStep === 0 || isSubmitting}
                            onClick={handlePrev}
                        >
                            Previous
                        </Button>
                        <Button variant="outlined" disabled={isSubmitting} type="submit" onClick={handleClose}
                        >
                            {isLastStep() ? "Submit" : "Next"}
                        </Button>
                      </Box>

                      <Box sx={{gridColumn:"span 4"}}>
                      <SwipeableViews index={activeStep}  >
                        {steps.map((step, index) => {
                          const Component = steps[index];
                          return <Component key={index}  />;
                        })}
                      </SwipeableViews>

                      </Box>
                      
                    </Box>
                  </Form>
                </>
              )}
            </Formik>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </Box>
    </Box>    
    </>
    
    
  );
};

export default AddCourse;
