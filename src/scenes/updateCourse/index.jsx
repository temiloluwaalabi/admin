import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TextField,
    Typography,
    useMediaQuery,
  } from "@mui/material";
  import { Box, useTheme } from "@mui/material";
  import CloseIcon from "@mui/icons-material/Close";
  
  import { alignProperty } from "@mui/material/styles/cssUtils";
  import Header from "components/Header";
  import React, { useEffect, useState } from "react";
  import FlexBetween from "components/FlexBetween";
  import {
    useUpdateCourseMutation,
    useGetCourseQuery,
  } from "state/api";
  import { Navigate, useLocation, useNavigate } from "react-router-dom";
  import FileUpload from "react-mui-fileuploader";
  import Dropzone, { useDropzone } from "react-dropzone";
  import EditOutlined from "@mui/icons-material/EditOutlined";
import { toast } from "react-toastify";
  const EditCourse = () => {
    const {getRootProps, getInputProps} = useDropzone()
    const isNonMobile = useMediaQuery("(min-width:1000px)");
    const theme = useTheme();
    const [UpdateCourse] = useUpdateCourseMutation();
    const location = useLocation();
    const [newCourse, setNewCourse] = useState();
    const navigate = useNavigate();
    const id = location.pathname.split("/")[2];
    
  const {data : getCourse, isLoading, isSuccess} = useGetCourseQuery(id);

    const [courseData, setCourseData] = useState({
      courseTitle:  getCourse?.courseTitle,
      price: getCourse?.price,
      skillLevel: getCourse?.skillLevel,
      thumbnail: getCourse?.thumbnail,
      courseDescription: getCourse?.courseDescription,
      requirements: getCourse?.requirements,
      intention: getCourse?.intention,
      categories: getCourse?.categories,
      shortDesciption: getCourse?.shortDesciption,
      language: getCourse?.language,
      id: ''
    });
    
    
    function handleEditChange(event) {
      const { name, value, type, checked } = event.target;
      setCourseData((prevCourseData) => {
        return {
          ...prevCourseData,
          [name]: type === "checkbox" ? checked : value,
        };
      });
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      const newId = getCourse._id
      UpdateCourse({
        courseTitle:  courseData.courseTitle,
        price: courseData.price,
        skillLevel: courseData.skillLevel,
        thumbnail: courseData.thumbnail,
        courseDescription: courseData.courseDescription,
        requirements: courseData.requirements,
        intention: courseData.intention,
        categories: courseData.categories,
        shortDesciption: courseData.shortDesciption,
        language: courseData.language,
        id: newId
      });
      navigate("/courses")
    }
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
              title="UPDATE COURSE DETAILS"
              subtitle="Click the button to update the"
            />
          </FlexBetween>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              width: "100%",
              mt: "1.2rem",
            }}
          >
            <Card
              sx={{
                backgroundColor: "transparent",
                width: "100%",
                height: "auto",
                padding: "1rem",
              }}
            >
              <Typography variant="h4" sx={{ padding: "1rem" }}>
                Basic Information
              </Typography>
              {getCourse ? (
                <form onSubmit={handleSubmit}>
                <CardContent>
                  <Box
                    action=""
                    sx={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
                  >
                    <TextField
                      required
                      id="outlined-required"
                      label="Course Title "
                      name="courseTitle"
                      onChange={handleEditChange}
                      value={courseData?.courseTitle}
                    />
                    <TextField
                    name="shortDesciption"
                      required
                      id="outlined-required"
                      label="Short Description"
                      onChange={handleEditChange}
                      value={courseData.shortDesciption}
                    />
                    <TextField
                    name="courseDescription"
                    onChange={handleEditChange}
                      value={courseData.courseDescription}
                      required
                      id="outlined-required"
                      label="Course Description "
                      multiline
                      maxRows={6}
                    />
                    <Box
                      display="flex"
                      flexDirection="row"
                      gap="1.2rem"
                      justifyContent="space-between"
                      gridTemplateColumns="repeat(4, mixmax(0, 1fr))"
                      sx={{
                        "& > div": {
                          gridColumn: isNonMobile ? undefined : "span 2",
                        },
                        flexDirection: isNonMobile ? "row" : "column",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                      name="intention"
                      onChange={handleEditChange}
                      value={courseData.intention}
                        sx={{
                          width: "100%",
                        }}
                        required
                        id="outlined-required"
                        label="What will students learn in your courseData? "
                        multiline
                        maxRows={6}
                      />
                      <TextField
                      name="requirements"
                      onChange={handleEditChange}
                      value={courseData.requirements}
                        sx={{
                          width: "100%",
                        }}
                        required
                        id="outlined-required"
                        label="Requirements "
                        multiline
                        maxRows={6}
                      />
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="row"
                      gap="1.2rem"
                      justifyContent="space-between"
                      gridTemplateColumns="repeat(4, mixmax(0, 1fr))"
                      sx={{
                        "& > div": {
                          gridColumn: isNonMobile ? undefined : "span 2",
                        },
                        flexDirection: isNonMobile ? "row" : "column",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                      name="skillLevel"
                      onChange={handleEditChange}
                      value={courseData.skillLevel}
                        sx={{
                          width: "100%",
                        }}
                        required
                        id="outlined-required"
                        label="Course Level "
                      />
                      <TextField
                      name="language"
                      onChange={handleEditChange}
                      value={courseData.language}
                        sx={{
                          width: "100%",
                        }}
                        required
                        id="outlined-required"
                        label="Language "
                      />
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="row"
                      gap="1.2rem"
                      justifyContent="space-between"
                      gridTemplateColumns="repeat(4, mixmax(0, 1fr))"
                      sx={{
                        "& > div": {
                          gridColumn: isNonMobile ? undefined : "span 2",
                        },
                        flexDirection: isNonMobile ? "row" : "column",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                      name="price"
                      onChange={handleEditChange}
                      value={courseData.price}
                        sx={{
                          width: "100%",
                        }}
                        required
                        id="outlined-required"
                        label="Price "
                      />
                      <TextField
                      name="categories"
                      onChange={handleEditChange}
                      value={courseData.categories}
                        sx={{
                          width: "100%",
                        }}
                        required
                        id="outlined-required"
                        label="Course Category "
                        multiline
                        maxRows={6}
                      />
                    </Box>
                    
                    
                  </Box>
                </CardContent>
                <CardActionArea>
                  <CardActions>
                    <button sx={{ backgroundColor: "white", color: "black" }} >
                      Submit
                    </button>
                  </CardActions>
                </CardActionArea>
                </form>
                ) : (
                  <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
                )}
            </Card>
          </Box>
        </Box>
      </>
    );
  };
  
  export default EditCourse;
  