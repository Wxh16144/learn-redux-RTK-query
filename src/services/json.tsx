import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ========== Type Define ==========
interface Post {
  id: number;
  body: string;
  title: string;
  userId: number;
}

export const jsonPlaceholderApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "/posts?_limit=10",
    }),
    getPostsById: builder.query<Post, number>({
      query: (id: number) => `/posts/${id}`,
    }),
    createPost: builder.mutation<Post, Partial<Post>>({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: post,
      }),
    }),
    updatePost: builder.mutation<Post, Partial<Post> & Pick<Post, "id">>({
      query: ({ id, ...patch }) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        body: patch,
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostsByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
} = jsonPlaceholderApi;
