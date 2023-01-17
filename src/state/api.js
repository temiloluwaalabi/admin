import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

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
            providesTags: ["User"]
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
            })
        }),
        updateCourse: build.mutation({
            query: (course) => ({
                url: `/api/courses/update/${course.id}`,
                method: 'PATCH',
                body: course
            })
        }),
        deleteCourse: build.mutation({
            query: (id) => ({
                url: `/api/courses/${id}`,
                method: 'DELETE',
                body: id
            })
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
    useDeleteCourseMutation

} = api;