import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
  Skeleton,
  Paper,
  Snackbar,
  Slide,
  Tooltip,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteCourseMutation, useGetCoursesQuery } from "state/api";
import MuiAlert from "@mui/material/Alert";

import Header from "components/Header";
import {
  DeleteOutlined,
  Edit,
  ModeEditOutlineOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import FormEdit from "scenes/addCourse/FormEdit";
import { Stack } from "@mui/system";
import state from "state";
import { Link } from "react-router-dom";
import EditCourse from "scenes/updateCourse";
const CourseWidget = ({
  _id,
  courseTitle,
  price,
  modules,
  categories,
  skillLevel,
  shortDesciption,
  requirements,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const disptach = useDispatch();
  const courses = useSelector((state) => state.courses);
  const [deleteCourse] = useDeleteCourseMutation();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openIconsModal, setOpenIconsModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClose = (event, reason) => {
    event.preventDefault()
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
  };
  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }



  return (
    <Box>
      <Card
        sx={{
          backgroundImage: "none",
          backgroundColor: theme.palette.background.alt,
          borderRadius: "0.55rem",
          width: "100%",
        }}
      >
        <CardContent>
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar
              // anchorOrigin={{ vertical, horizontal }}
              open={success}
              onClick={handleClose}
              // key={vertical + horizontal}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                The Course - {courseTitle} has been deleted
              </Alert>
            </Snackbar>
          </Stack>
          <Box
            display="flex"
            mb="1rem"
            justifyContent="flex-end"
            position="relative"
          >
            <MoreHorizOutlined
              sx={{ cursor: "pointer" }}
              onClick={() => setOpenIconsModal((prev) => !prev)}
            />
            {openIconsModal && (
              <Paper
                sx={{
                  backgroundColor: "ash",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "6px",
                  position: "absolute",
                  top: "20px",
                  padding: "10px",
                  gap: "0.3rem",
                }}
              >
                <FlexBetween
                  onClick={() => {
                    deleteCourse(_id);
                    setSuccess(true);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                    <DeleteOutlined
                      sx={{ fontSize: "17px", mr: ".4rem", cursor: "pointer" }}
                    />
                    <Typography variant="h6">Delete</Typography>
                  
                </FlexBetween>
                <Link to ={`/courses/${_id}`} >
                <FlexBetween sx={{ justifyContent: "flex-start" }}>
                      <ModeEditOutlineOutlined
                        onClick={() => setOpenEditModal(true)}
                        sx={{ fontSize: "17px", mr: ".4rem", cursor: "pointer", color:"white" }}
                      />
                      <Typography variant="h6" sx={{color: "white"}}>Edit</Typography>
                  </FlexBetween>
                  </Link>
              </Paper>
            )}
          </Box>
          <Typography
            sx={{ fontSize: 14 }}
            color={theme.palette.secondary[700]}
            gutterBottom
          >
            {categories}
          </Typography>
          <Typography variant="h5" component="div">
            {courseTitle}
          </Typography>
          <Typography
            sx={{ mb: "1rem" }}
            color={theme.palette.secondary[700]}
            gutterBottom
          >
            ${price}
          </Typography>
          <Rating value={5} readOnly />
          <Typography variant="body2">{shortDesciption}</Typography>
          <CardActions>
            <Button
              variant="primary"
              size="small"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              See More
            </Button>
          </CardActions>
          <Collapse
            in={isExpanded}
            timeout="auto"
            unmountOnExit
            sx={{
              color: theme.palette.neutral[300],
            }}
          >
            <CardContent>
              <Typography>id: {_id}</Typography>
              <Typography>Course Lessons: {modules}</Typography>
              <Typography>Skill Level: {skillLevel}</Typography>
              <Typography>
                Requirements to take Course: {requirements}
              </Typography>
            </CardContent>
          </Collapse>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CourseWidget;
