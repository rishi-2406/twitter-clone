import { Link } from "react-router-dom";
import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import LoadingSpinner from "./LoadingSpinner.jsx";

import { useQuery } from "@tanstack/react-query";
import useFollow from "../../hooks/useFollow";

const RightPanel = () => {
  const { data: Users, isLoading } = useQuery({
    queryKey: ["rightPanelUsers"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/user/suggested");
        if (!response.ok) {
          throw new Error("Failed to fetch suggested users");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching suggested users:", error);
        return [];
      }
    },
  });

  const { follow, isPending } = useFollow();
  if (!Users || Users.length === 0) {
    return <div className="md:w-64 w-0"></div>;
  }


  const handleFollow = (e, userId) => {
    e.preventDefault();
    follow(userId);
  };

  return (
    <div className="hidden lg:block my-4 mx-2">
      <div className="bg-[#16181C] p-4 rounded-md sticky top-2">
        <p className="font-bold">Who to follow</p>
        <div className="flex flex-col gap-4">
          {/* item */}
          {isLoading && (
            <>
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
            </>
          )}
          {!isLoading &&
            Users?.map((user) => (
              <Link
                to={`/profile/${user.username}`}
                className="flex items-center justify-between gap-4"
                key={user._id}
              >
                <div className="flex gap-2 items-center">
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img src={user.profileImg || "/avatar-placeholder.png"} />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold tracking-tight truncate w-28">
                      {user.fullname}
                    </span>
                    <span className="text-sm text-slate-500">
                      @{user.username}
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    className="btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm"
                    onClick={(e) => {handleFollow(e, user._id)}}
                  >
                    {isPending ? <LoadingSpinner size="sm" /> : "Follow"}
                  </button>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};
export default RightPanel;
