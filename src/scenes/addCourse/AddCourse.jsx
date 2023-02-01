import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
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
import React, { useState } from "react";
import FlexBetween from "components/FlexBetween";
import {
  useAddCourseMutation,
  useGetCourseQuery,
  useGetCoursesQuery,
} from "state/api";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import FileUpload from "react-mui-fileuploader";
import Dropzone, { useDropzone } from "react-dropzone";
import EditOutlined from "@mui/icons-material/EditOutlined";
const AddCourses = () => {
  const {getRootProps, getInputProps} = useDropzone()
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();
  const [AddCourse] = useAddCourseMutation();
  const location = useLocation();
  const [newCourse, setNewCourse] = useState();
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState({
    courseTitle: "",
    price: "",
    skillLevel: "",
    thumbnail: "",
    courseDescription: "",
    requirements: "",
    intention: "",
    categories: "",
    shortDesciption: "",
    language: "",
  });

  function handleChange(event) {
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
    console.log(courseData);
    AddCourse({
      "courseTitle":courseData.courseTitle,
      "requirements":courseData.requirements,
      "courseDescription":courseData.courseDescription,
      "intention":courseData.intention,
      "categories":courseData.categories,
      "shortDesciption":courseData.shortDesciption,
      "skillLevel":courseData.skillLevel,
      "price":courseData.price,
    })
    console.log(courseData);
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
            title="ADD NEW COURSE"
            subtitle="Click the button to add neww courses"
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
                  onChange={handleChange}
                  value={courseData.courseTitle}
                />
                <TextField
                name="shortDesciption"
                  required
                  id="outlined-required"
                  label="Short Description"
                  onChange={handleChange}
                  value={courseData.shortDesciption}
                />
                <TextField
                name="courseDescription"
                onChange={handleChange}
                  value={courseData.courseDescription}
                  required
                  id="outlined-required"
                  label="Course Description "
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
                  onChange={handleChange}
                  value={courseData.intention}
                    sx={{
                      width: "100%",
                    }}
                    required
                    id="outlined-required"
                    label="What will students learn in your course? "
                    maxRows={6}
                  />
                  <TextField
                  name="requirements"
                  onChange={handleChange}
                  value={courseData.requirements}
                    sx={{
                      width: "100%",
                    }}
                    required
                    id="outlined-required"
                    label="Requirements "
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  value={courseData.categories}
                    sx={{
                      width: "100%",
                    }}
                    required
                    id="outlined-required"
                    label="Course Category "
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
          </Card>
          <Card
            sx={{
              backgroundColor: "transparent",
              width: "100%",
              height: "auto",
              padding: "1rem",
            }}
          >
            <Typography variant="h4" sx={{ padding: "1rem" }}>
              Curriculum
            </Typography>
            <CardContent>
              <Box
                action=""
                sx={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
              >
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
                  onChange={handleChange}
                    sx={{
                      width: "100%",
                    }}
                    required
                    id="outlined-required"
                    label="What will students learn in your course? "
                    defaultValue="Intention"
                    maxRows={6}
                  />
                  <TextField
                    sx={{
                      width: "100%",
                    }}
                    required
                    id="outlined-required"
                    label="Requirements "
                    defaultValue="Requirements"
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
                    sx={{
                      width: "100%",
                    }}
                    required
                    id="outlined-required"
                    label="Course Level "
                    defaultValue="Begineer or advanced"
                  />
                  <TextField
                    sx={{
                      width: "100%",
                    }}
                    required
                    id="outlined-required"
                    label="Language "
                    defaultValue="Language"
                    maxRows={6}
                  />
                </Box>
              </Box>
            </CardContent>
            <CardActionArea>
              <CardActions>
                <Button sx={{ backgroundColor: "white", color: "black" }}>
                  Submit
                </Button>
              </CardActions>
            </CardActionArea>
          </Card>
          <Card
            sx={{
              backgroundColor: "transparent",
              width: "100%",
              height: "auto",
              padding: "1rem",
            }}
          >
            <Typography variant="h4" sx={{ padding: "1rem" }}>
              Media
            </Typography>
            <CardContent>
              <Box
                action=""
                sx={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
              >
                {/* <FileUpload
                  getBase64={false}
                  multiFile={true}
                  disabled={false}
                  title="Upload your images here"
                  header="[Drag or drop your images here ]"
                  leftLabel="or"
                  rightLabel="to select files"
                  buttonLabel="click here"
                  buttonRemoveLabel="Remove all"
                  maxFileSize={10}
                  maxUploadFiles={0}
                  maxFilesContainerHeight={357}
                  acceptedType={"image/*"}
                  errorSizeMessage={
                    "This is above the recommended file size"
                  }
                  BannerProps={{ elevation: 0, variant: "outlined" }}
                  showPlaceholderImage={true}
                  PlaceholderGridProps={{ md: 4 }}
                  LabelsGridProps={{ md: 8 }}
                  allowedExtensions={["jpg", "jpeg"]}
                  // onFilesChange={handleFilesChange}
                  onContextReady={(context) => {}}
                /> */}
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
                    sx={{
                      width: "100%",
                    }}
                    required
                    id="outlined-required"
                    label="Other Details"
                    defaultValue="Details"
                    maxRows={6}
                  />
                  <TextField
                    sx={{
                      width: "100%",
                    }}
                    required
                    id="outlined-required"
                    label="Video URL "
                    defaultValue="Requirements"
                    helperText="Eneter a valid video url"
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
                    sx={{
                      width: "100%",
                    }}
                    required
                    id="outlined-required"
                    label="Course Level "
                    defaultValue="Begineer or advanced"
                  />
                  <TextField
                    sx={{
                      width: "100%",
                    }}
                    required
                    id="outlined-required"
                    label="Language "
                    defaultValue="Language"
                    maxRows={6}
                  />
                </Box>
              </Box>
            </CardContent>
            <CardActionArea>
              <CardActions>
                <Button sx={{ backgroundColor: "white", color: "black" }}>
                  Submit
                </Button>
              </CardActions>
            </CardActionArea>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default AddCourses;
