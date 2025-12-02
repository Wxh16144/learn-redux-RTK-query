import { useState } from "react";
import { Result, Skeleton } from "antd";
import { useGetPostsByIdQuery, useGetPostsQuery } from "../services/json";

interface PostDetailProps {
  id: number;
}
function PostDetail({ id }: PostDetailProps) {
  const { data, isError, isLoading } = useGetPostsByIdQuery(id);

  // ========== renter ==========
  if (isLoading) return <Skeleton active />;
  if (isError) return <Result />;
  return (
    <div>
      <h2>{data?.title}</h2>
      <p>{data?.body}</p>
    </div>
  );
}

function PostDetailFormResult({ id }: PostDetailProps) {
  const { data, isLoading, isError } = useGetPostsQuery(undefined, {
    selectFromResult: ({ data, ...rest }) => ({
      ...rest,
      data: data?.find((post) => post.id === id),
    }),
  });

  // ========== renter ==========
  if (isLoading) return <Skeleton active />;
  if (isError) return <Result />;
  return (
    <div>
      <h2>{data?.title}</h2>
      <p>{data?.body}</p>
    </div>
  );
}

interface PostListProps {
  onSelect?: (id: number) => void;
}
function PostList({ onSelect }: PostListProps) {
  const { data, isError, isLoading } = useGetPostsQuery();

  // ========== renter ==========
  if (isLoading) return <Skeleton active />;
  if (isError) return <Result />;
  return (
    <ul>
      {data?.map((post) => (
        <li key={post.id} onClick={() => onSelect?.(post.id)}>
          {post.title}
        </li>
      ))}
    </ul>
  );
}

export default function Post() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div>
      <PostList onSelect={(id) => setActive(id)} />
      {active && <PostDetail id={active} />}
      <hr />
      {active && <PostDetailFormResult id={active} />}
    </div>
  );
}
