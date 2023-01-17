import { CssBaseline, ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/material/styles"
import { useEffect, useMemo } from "react"
import { useSelector } from "react-redux"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AddCourse from "scenes/addCourse"
import Courses from "scenes/courses";
import Dashboard from "scenes/dasboard";
import Layout from "scenes/layout";
import Login from "scenes/login"
import Users from "scenes/users"
import { useDispatch } from "react-redux"
import { themeSettings } from "theme";
import { setCourses } from "state"
import { useGetCoursesQuery } from "state/api"
import Modules from "scenes/modules"
import AddModules from "scenes/modules"

const App = () => {
  const dispatch = useDispatch()
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/courses" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path = "/courses" element={<Courses />} />
              <Route path = "/users" element={<Users />} />
              <Route path ="/add-courses" element={<AddCourse />} />
              <Route path = "/modules" element={<AddModules />} />
              <Route path = "/overview" element={<AddModules />} />
              <Route path = "/add-modules" element={<AddModules />} />
              <Route path = "/add-users" element={<AddModules />} />
              <Route path = "/update" element={<AddModules />} />
              <Route path = "/settings" element={<AddModules />} />
              <Route path = "/website-settings" element={<AddModules />} />
            </Route>
            <Route path="/register" element={<Login />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
      
    </div>
  )
}

export default App