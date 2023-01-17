import {Box, useTheme} from "@mui/material"
import { useGetUsersQuery } from "state/api"
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

const Users = () => {
    const theme = useTheme()
    const {data, isLoading} = useGetUsersQuery();

    const columns =[
    { 
        field: "_id",
        headerName: "ID",
        flex: 1
    },
    { 
        field: "firstname",
        headerName: "FirstName",
        flex: 0.5
    },
    { 
        field: "lastname",
        headerName: "LastName",
        flex: 0.5
    },
    { 
        field: "username",
        headerName: "Username",
        flex: 0.5
    },
    { 
        field: "email",
        headerName: "Email",
        flex: 1
    },
    // { 
    //     field: "enrolledCourses",
    //     headerName: "Enrolled Courses",
    //     flex: 1
    // },
    // { 
    //     field: "phoneNumber",
    //     headerName: "Phone Number",
    //     flex: 1,
    //     renderCell: (params) => {
    //         return params.value.replace(/^(\d{2})(\d{3})(\d{4})/, "($1)$2-$3")
    //     }
    // },
    // { 
    //     field: "country",
    //     headerName: "Country",
    //     flex: 0.4
    // }
    ]
  
  return (
    <Box m="1.5rem 2.5rem">
        <Header title="USERS" subtitle="List of Users" />

        <Box
            mt="40px" 
            height="75vh"
        >
            <DataGrid
                loading={isLoading || !data}
                getRowId = {(row) => row._id}
                rows = {data || []}
                columns={columns}
            >

            </DataGrid>
        </Box>
    </Box>
  )
}

export default Users