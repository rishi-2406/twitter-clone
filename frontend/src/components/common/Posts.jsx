import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
// import { POSTS } from "../../utils/db/dummy";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Posts = ({ feedType }) => {

  const getPostEndpoint = () => {
    switch (feedType) {
      case "following":
        return "/api/posts/following";
      case "likes":
        return "/api/posts/likes";
      case "user":
        return "/api/posts/user";
      default:
        return "/api/posts/all";
    }
  };

  const POST_ENDPOINT = getPostEndpoint();

  const {
    data: POSTS = [],
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const response = await fetch(POST_ENDPOINT);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        return response.json();
      } catch (error) {
        console.error("Error fetching posts:", error);
        throw new Error(
          error.message || "An error occurred while fetching posts"
        );
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [feedType, refetch]);


  return (
    <>
      {(isLoading || isRefetching) && (
        <div className="flex flex-col justify-center">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      {!isLoading && !isRefetching && POSTS?.length === 0 && (
        <p className="text-center my-4">No posts in this tab. Switch 👻</p>
      )}

      {!isLoading && !isRefetching && POSTS?.length >= 1 && (
        <div>
          {POSTS.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};
export default Posts;
