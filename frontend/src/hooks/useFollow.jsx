import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export default function useFollow() {
  const queryClient = useQueryClient();
  const { mutate: follow, isPending } = useMutation({
    mutationFn: async (userId) => {
      try {
        const response = await fetch(`/api/user/follow/${userId}`, {
          method: "POST",
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to follow user");
        }
        return data;
      } catch (error) {
        console.error("Error following user:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["rightPanelUsers"] }),
        queryClient.invalidateQueries({ queryKey: ["authUser"] }),
      ]);
      toast.success("Followed successfully");
    },
  });

  return {follow, isPending};

}
