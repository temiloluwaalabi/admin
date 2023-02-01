import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormHelperText,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import React, { useState } from "react";
import {
  useAddCourseMutation,
  useGetCourseQuery,
  useGetCoursesQuery,
  useAddUserMutation,
  useGetUserQuery
} from "state/api";
import { Navigate, redirect, useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const AddUser = () => {
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();
  const [AddCourse] = useAddCourseMutation();
  const location = useLocation();
  const [newCourse, setNewCourse] = useState();
  const navigate = useNavigate();
  const [openAddForm, setOpenAddForm] = useState(false)
  const [openUpdateForm, setOpenUpdateForm] = useState(false)
  const [AddUser] = useAddUserMutation()
  const [userData, setuserData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    user_gender: "",
    role: "",
  });
  const [updateUserData, setUpdateUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    expertise: "",
    phone: "",
    user_gender: "",
    about_user: "",
    expertise: "",
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setuserData((prevUserData) => {
      return {
        ...prevUserData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(userData);
    AddUser({
      "username":userData.username,
      "firstname":userData.firstname,
      "lastname":userData.lastname,
      "email":userData.email,
      "phone":userData.phone,
      "password":userData.password,
      "user_gender":userData.user_gender,
      "role":userData.role,
    })
    console.log(userData);
    navigate("/users")
  }

  //   const [data, setData] = useState({
  //     courseTitle: "",
  //     price: "",
  //     skillLevel: "",
  //     thumbnail: "",
  //     courseDescription: "",
  //     requirements: "",
  //     intention: "",
  //     categories: "",
  //     shortDesciption: "",
  //     otherFiles: "",
  //   });

  //   function handleChange = (e) => {

  //   }
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
            title="ADD NEW User"
            subtitle="Click the button to add and update esisting users"
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
              Add New User
            </Typography>
            <form
              sx={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
              onSubmit={handleSubmit}
            >
              <CardContent>
                <Box
                  action=""
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.2rem",
                  }}
                >
                  <TextField
                    required
                    id="outlined-required"
                    label="First Name "
                    defaultValue={userData.firstname}
                    onChange={handleChange}
                    name="firstname"
                  />
                  <TextField
                    onChange={handleChange}
                    required
                    id="outlined-required"
                    label="Last Name"
                    defaultValue={userData.lastname}
                    name="lastname"
                  />
                  <TextField
                    onChange={handleChange}
                    required
                    id="outlined-required"
                    label="Email Address "
                    defaultValue={userData.email}
                    name="email"
                  />
                  <TextField
                    onChange={handleChange}
                    required
                    id="outlined-required"
                    label="Password "
                    defaultValue={userData.password}
                    name="password"
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
                      onChange={handleChange}
                      sx={{
                        width: "100%",
                      }}
                      required
                      id="outlined-required"
                      label="Gender"
                      name="user_gender"
                      defaultValue={userData.user_gender}
                    />
                    <TextField
                      onChange={handleChange}
                      sx={{
                        width: "100%",
                      }}
                      required
                      id="outlined-required"
                      label="Phone Number "
                      defaultValue={userData.phone}
                      name="phone"
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
                      onChange={handleChange}
                      sx={{
                        width: "100%",
                      }}
                      required
                      id="outlined-required"
                      label="Username "
                      defaultValue={userData.username}
                      name="username"
                    />
                    <Select
                      sx={{ width: "100%" }}
                      labelId="Role"
                      id="demo-simple-select"
                      value={userData.role}
                      name="role"
                      label="Role"
                      onChange={handleChange}
                    >
                      <MenuItem value="">--Choose---</MenuItem>
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="Student">Student</MenuItem>
                    </Select>
                  </Box>
                </Box>
              </CardContent>
              <CardActions>
                <button  sx={{ backgroundColor: "white", color: "black", padding:"0.6rem 2rem" }}>
                  Submit
                </button>
              </CardActions>
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
              Update User Account
            </Typography>
            {/* <form
              sx={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
            >
              <CardContent>
                <Box
                  action=""
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.2rem",
                  }}
                >
                  <FormHelperText>Select A User</FormHelperText>
                  <Select
                    sx={{ width: "100%" }}
                    labelId="Role"
                    id="demo-simple-select"
                    value="Emma"
                    label="Select A User"
                    // onChange={}
                  >
                    <MenuItem value="Emma">Emma</MenuItem>
                    <MenuItem value="Sharon">Sharon</MenuItem>
                  </Select>

                  <TextField
                    required
                    id="outlined-required"
                    label="First Name "
                    defaultValue="first name"
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Last Name"
                    defaultValue="lastname"
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Email Address "
                    defaultValue="Email Address"
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
                      sx={{
                        width: "100%",
                      }}
                      required
                      id="outlined-required"
                      label="Gender"
                      defaultValue="Gender"
                      maxRows={6}
                    />
                    <TextField
                      sx={{
                        width: "100%",
                      }}
                      required
                      id="outlined-required"
                      label="Phone Number "
                      defaultValue="Phone Number"
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
                      label="About User "
                      defaultValue="About User"
                      maxRows={6}
                    />
                    <TextField
                      sx={{
                        width: "100%",
                      }}
                      required
                      id="outlined-required"
                      label="Expertise "
                      defaultValue="Expertise"
                    />
                  </Box>
                </Box>
              </CardContent>

              <CardActions>
                <Button sx={{ backgroundColor: "white", color: "black" }}>
                  Submit
                </Button>
              </CardActions>
            </form> */}
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default AddUser;
