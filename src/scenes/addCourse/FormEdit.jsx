import {
    Button,
    Card,
    CardActionArea,
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
  import Select from "@mui/material/Select";
  import React, { useState } from "react";


const FormEdit = () => {
    const isNonMobile = useMediaQuery("(min-width:1000px)");

  return (
    <Box >
      <Card sx={{backgroundColor:"transparent", width:"100%", height:"auto", padding:"1rem"}}>
            <Typography variant='h4' sx={{padding:"1rem"}}>Basic Information</Typography>
            <CardContent>
              <Box action="" sx={{display:'flex', flexDirection:"column", gap:"1.2rem"}}>
                <TextField
                  required
                  id="outlined-required"
                  label="Course Title "
                  defaultValue="The basics of web design"
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Short Description"
                  defaultValue="Web Design is business"
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Course Description "
                  defaultValue="D escription"
                />
                <Box
                    display="flex"
                    flexDirection="row"
                    gap="1.2rem"
                    justifyContent="space-between"
                    gridTemplateColumns="repeat(4, mixmax(0, 1fr))"
                  sx={{
                    "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 2", },
                    flexDirection: isNonMobile ? "row" : "column",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    sx={{
                        width:"100%"
                    }}
                    required
                    id="outlined-required"
                    label="What will students learn in your course? "
                    defaultValue="Intention"
                    maxRows={6}
                  />
                  <TextField
                    sx={{
                    width:"100%"
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
                        gridColumn: isNonMobile ? undefined : "span 2", },
                    flexDirection: isNonMobile ? "row" : "column",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    sx={{
                        width:"100%"
                    }}
                    required
                    id="outlined-required"
                    label="Course Level "
                    defaultValue="Begineer or advanced"
                  />
                  <TextField
                    sx={{
                    width:"100%"
                }}
                    required
                    id="outlined-required"
                    label="Language "
                    defaultValue="Language"
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
                        gridColumn: isNonMobile ? undefined : "span 2", },
                    flexDirection: isNonMobile ? "row" : "column",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    sx={{
                        width:"100%"
                    }}
                    required
                    id="outlined-required"
                    label="Price "
                    defaultValue="Price"
                    maxRows={6}
                  />
                  <TextField
                    sx={{
                    width:"100%"
                }}
                    required
                    id="outlined-required"
                    label="Course Category "
                    defaultValue="Category"
                    maxRows={6}
                  />
                </Box>
              </Box>
            </CardContent>
            <CardActionArea>
                <CardActions>
                    <Button sx={{backgroundColor:"white", color:"black"}}>
                        Submit
                    </Button>
                </CardActions>
            </CardActionArea>
          </Card>
      </Box>
  )
}

export default FormEdit