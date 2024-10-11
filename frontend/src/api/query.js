import { useQuery } from "@tanstack/react-query";
import {
    getAuthChecking, getConnectionRequests, getConnections, getConnectionStatus,
    getNotifications, getPostById, getPosts, getRecommendedUsers, getUserProfile, key
} from ".";


export const useGetAuthChecking = () => {

    return useQuery({
        queryKey: [key.authUser],
        queryFn: getAuthChecking,
        // refetchOnWindowFocus: false,  // Prevent refetching on window focus
        // refetchOnReconnect: false,    // Prevent refetching on reconnect
        // staleTime: 1000 * 60 * 60, // 🟢
    });
}


export const useGetUserProfile = (userName) => {

    return useQuery({ queryKey: [key.userProfile, userName], queryFn: getUserProfile });
}


export const useGetPosts = () => useQuery({ queryKey: [key.posts], queryFn: getPosts });


export const useGetPostById = (id) => useQuery({ queryKey: [key.post, id], queryFn: getPostById });


export const useGetRecommendedUsers = () => {

    return useQuery({ queryKey: [key.recommendedUsers], queryFn: getRecommendedUsers });
}


export const useGetNotifications = (authUser) => {

    return useQuery({
        queryKey: [key.notifications],
        queryFn: getNotifications,
        enabled: !!authUser,
    });
}


export const useGetConnections = () => useQuery({ queryKey: [key.connections], queryFn: getConnections });


export const useGetConnectionRequests = (authUser) => {

    return useQuery({
        queryKey: [key.connectionRequests],
        queryFn: getConnectionRequests,
        enabled: !!authUser,
    });
}


export const useGetConnectionStatus = (friendId) => {

    return useQuery({ queryKey: [key.connectionStatus, friendId], queryFn: getConnectionStatus });
}