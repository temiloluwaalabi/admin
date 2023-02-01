import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { useDispatch } from "react-redux";

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5800"}),
    reducerPath: "adminApi",
    tagTypes: ["User", "Courses", "Users"],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `api/user/${id}`,
            providesTags: ["User"]
        }),
        getCourse: build.query({
            query: (id) => `api/courses/${id}`,
            providesTags: ["Courses"]
        }),
        getCourses: build.query({
            query: () => "api/courses",
            providesTags: ["Courses"]
        }),
        getUsers: build.query({
            query: () => "api/user",
            providesTags: ["Users"]
        }),
        addCourse: build.mutation({
            query: (course) => ({
                url: '/api/courses/create',
                method: 'POST',
                body: course
            }),
            invalidatesTags:['Courses']
        }),
        addUser: build.mutation({
            query: (user) => ({
                url: '/api/user/create',
                method: 'POST',
                body: user
            }),
            invalidatesTags:['Users']
        }),
        updateCourse: build.mutation({
            query: (
              courseData 
                ) => ({
                url: `/api/courses/update/${courseData.id}`,
                method: 'PATCH',
                body: courseData
                
            }),
            invalidatesTags:['Courses']
        }),
        deleteCourse: build.mutation({
            query: (id) => ({
                url: `/api/courses/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags:['Courses']
        }),

    })
})

export const {
    useGetUserQuery,
    useGetCoursesQuery,
    useGetCourseQuery,
    useGetUsersQuery,
    useAddCourseMutation,
    useUpdateCourseMutation,
    useDeleteCourseMutation,
    useAddUserMutation

} = api;


