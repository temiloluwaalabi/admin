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
  CardActionArea,
  TextField,
  Paper,
  CircularProgress,
} from "@mui/material";
import {
  DeleteOutlined,
  Edit,
  ModeEditOutlineOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import { useGetCoursesQuery } from "state/api";
import Header from "components/Header";
import profileImage from "../../assets/Profileimg.png";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "state";
import CourseWidget from "components/CourseWidget";
import FormEdit from "scenes/addCourse/FormEdit";
import FlexBetween from "components/FlexBetween";
import axios from "axios";

const Courses = () => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const { data:courses, isLoading, isSuccess, isError, error } = useGetCoursesQuery();
  const [openModalForm, setOpenModalForm] = useState(false);
  const [newCourses, setNewCourses] = useState('')

  const dispatch = useDispatch();
  const orderedCourses = useSelector(setCourses)
  // const courses = 


  // const fetchedCourses = () => {
  //   const courses = axios.get()
  // }
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="COURSES" subtitle="See your lists of courses." />
    {
      isError  && (
        <div>Server Error</div>
      )
    }
      {courses || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div ": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {courses?.map(
            ({
              _id,
              courseTitle,
              price,
              modules,
              categories,
              skillLevel,
              shortDesciption,
              requirements,
            }) => (
                <CourseWidget
                  key={_id}
                  _id={_id}
                  courseTitle={courseTitle}
                  price={price}
                  modules={modules}
                  categories={categories}
                  skillLevel={skillLevel}
                  shortDesciption={shortDesciption}
                  requirements={requirements}
                  openModalForm="false"
                />
            )
          )}
        </Box>
      ) : (
       
        <>
         <Box display="flex" alignItems="center" justifyContent="center" padding="1.2rem" >
              <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>

        </Box>
        
        </>
        // <Box mt="20px">
        //     <Skeleton variant="rectangular" width={210} height={118} sx={{borderRadius: "0.55rem"}}/>
        // </Box>
      )}

      {}
    </Box>
  );
};

export default Courses;
