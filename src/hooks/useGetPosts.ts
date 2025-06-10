import {useQuery} from '@tanstack/react-query';
import {getPosts} from "@/api/getPosts";

export const useGetPosts = () => {
    return useQuery({
        queryKey: ['GET_POSTS'],
        queryFn: async () => getPosts(),
    });
};
