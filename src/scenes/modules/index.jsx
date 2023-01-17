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
} from "@mui/material";
import { useGetCoursesQuery } from "state/api";
import Header from "components/Header";
import profileImage from "../../assets/Profileimg.png";
import { DeleteOutlined, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "state";
import CourseWidget from "components/CourseWidget";
const newCourse = [];


const AddModules = () => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const { data ,isLoading } = useGetCoursesQuery();
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="COURSE MODULE" subtitle="See your lists of courses without lessons." />
      {data || !isLoading ? (
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
            
          {data.map(
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
              />
            )
          )}
        </Box>
      ) : (<></>
        // <Box mt="20px">
        //     <Skeleton variant="rectangular" width={210} height={118} sx={{borderRadius: "0.55rem"}}/>
        // </Box>
      )}
    </Box>
  );
};

export default AddModules;
