import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
    createPost, deleteNotification, deletePost, likePost, userLogin, userLogout,
    sendConnectionRequest, userRegistration, updateProfile, deleteConnection,
    connectionRequestAccept, connectionRequestReject, createComment, key,
    notificationMarkAsRead,
} from ".";


// 🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒
// 🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒
// 🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒
// Authentication Related Mutations...


export const useRegistration = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: userRegistration,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [key.authUser] });
            toast.success("Account created successfully", { duration: 5000 });
        },

        onError: (err) => toast.error(err.response.data.message || "Something went wrong"),
    })
}



export const useLogin = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: userLogin,

        onSuccess: () => queryClient.invalidateQueries({ queryKey: [key.authUser] }),

        onError: (err) => toast.error(err.response.data.message || "Something went wrong")
    })
}



export const useLogout = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: userLogout,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [key.authUser] })
    })
}



// 🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️
// 🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️
// 🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️


export const useUpdateProfile = (userName) => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            toast.success("Profile updated successfully");
            queryClient.invalidateQueries(["userProfile", userName]);
            queryClient.invalidateQueries({ queryKey: [key.userProfile, userName] })
        }

    })
}



// 📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰
// 📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰
// 📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰📰
// Post Related Mutations...

export const useCreatePost = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPost,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [key.posts] });
            toast.success("Post created successfully");
        },

        onError: (err) => toast.error(err.response.data.message || "Failed to create post"),
    })
}



export const useDeletePost = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletePost,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [key.posts] });
            toast.success("Post deleted successfully");
        },

        onError: (err) => toast.error(err.message),
    })
}



export const useLikePost = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: likePost,

        onSuccess: (_, postId) => {
            queryClient.invalidateQueries({ queryKey: [key.posts] });
            queryClient.invalidateQueries({ queryKey: [key.post, postId] });
        },
    })
}



export const useCreateComment = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createComment,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [key.posts] });
            toast.success("Comment added successfully");
        },

        onError: (err) => toast.error(err.response.data.message || "Failed to add comment"),
    })
}



// 🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗
// 🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗
// 🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗
// Connection Related Mutations...

export const useSendConnectionRequest = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: sendConnectionRequest,

        onSuccess: (_, friendId) => {
            queryClient.invalidateQueries({ queryKey: [key.connectionStatus, friendId] });
            queryClient.invalidateQueries([key.connectionRequests]);
            toast.success("Connection request sent");
        },

        onError: (error) => toast.error(error.response?.data?.error || "An error occurred"),
    })
}



export const useConnectionRequestAccept = (friendId) => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: connectionRequestAccept,

        onSuccess: (_, requestId) => { // _, requestId
            queryClient.invalidateQueries({ queryKey: [key.connectionStatus, friendId] });
            queryClient.invalidateQueries({ queryKey: [key.connectionStatus, requestId] });
            queryClient.invalidateQueries([key.connectionRequests]);
            toast.success("Connection request accepted");
        },

        onError: (error) => toast.error(error.response?.data?.error || "An error occurred"),
    })
}



export const useConnectionRequestReject = (friendId) => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: connectionRequestReject,

        onSuccess: (_, requestId) => { // _, requestId
            queryClient.invalidateQueries({ queryKey: [key.connectionStatus, friendId] });
            queryClient.invalidateQueries({ queryKey: [key.connectionStatus, requestId] });
            queryClient.invalidateQueries([key.connectionRequests]);
            toast.success("Connection request rejected");
        },

        onError: (error) => toast.error(error.response?.data?.error || "An error occurred"),
    })
}


export const useConnectionDelete = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteConnection,

        onSuccess: () => { // _, requestId
            queryClient.invalidateQueries([key.connectionRequests]);
            toast.success("Connection removed");
        },

        onError: (error) => toast.error(error.response?.data?.error || "An error occurred"),
    })
}



export const useNetworkRequestAccept = (friendId) => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: connectionRequestAccept,

        onSuccess: () => { // _, requestId
            queryClient.invalidateQueries({ queryKey: [key.connectionStatus, friendId] });
            queryClient.invalidateQueries({ queryKey: [key.connectionRequests] });
            toast.success("Connection request accepted");
        },

        onError: (error) => toast.error(error.response?.data?.error || "An error occurred"),
    })
}



export const useNetworkRequestReject = (friendId) => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: connectionRequestReject,

        onSuccess: () => { // _, requestId
            queryClient.invalidateQueries({ queryKey: [key.connectionStatus, friendId] });
            queryClient.invalidateQueries({ queryKey: [key.connectionRequests] });
            toast.success("Connection request rejected");
        },

        onError: (error) => toast.error(error.response?.data?.error || "An error occurred"),
    })
}




// 🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔
// 🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔
// 🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔
// Notification Related Mutations...

export const useNotificationMarkAsRead = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: notificationMarkAsRead,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [key.notifications] }),
    })
}



export const useDeleteNotification = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteNotification,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [key.notifications] });
            toast.success("Notification deleted");
        },

        onError: (error) => toast.error(error.response?.data?.error || "An error occurred"),
    })
}