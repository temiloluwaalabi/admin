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
import { useDispatch, useSelector } from "react-redux";
import { useDeleteCourseMutation, useGetCoursesQuery } from "state/api";
import Header from "components/Header";
import { DeleteOutlined, Edit } from "@mui/icons-material";

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
    const courses = useSelector((state) => state.courses)
    const [deleteCourse]  = useDeleteCourseMutation()

   
    return (
      <Card
        sx={{
          backgroundImage: "none",
          backgroundColor: theme.palette.background.alt,
          borderRadius: "0.55rem",
          width: "100%"
        }}
      >
        <CardContent>
          <Box
            display='flex'
            justifyContent="space-between"
            mb="1rem"
          >
            <DeleteOutlined sx={{fontSize:'23px'}} onClick={() => deleteCourse({_id})} />
            
            <Edit  sx={{fontSize:'23px'}} />
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
              <Typography>Requirements to take Course: {
              requirements
              }</Typography>
            </CardContent>
          </Collapse>
        </CardContent>
      </Card>
    );
  };

export default CourseWidget