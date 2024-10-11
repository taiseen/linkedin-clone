import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;

// const baseURL = 'http://localhost:5000/api/v1' // local server url
const baseURL = import.meta.env.VITE_SERVER_URL // live server url


const api = axios.create({ baseURL, withCredentials: true });


export const key = {
    post: 'post',
    posts: 'posts',
    authUser: 'authUser',
    userProfile: 'userProfile',
    notifications: 'notifications',
    recommendedUsers: 'recommendedUsers',
    connections: 'connections',
    connectionStatus: 'connectionStatus',
    connectionRequests: 'connectionRequests',
}


/*
🟢🟢🟢🟢🟢🟢🟢🟢
🟢 GET Requests  🟢
🟢🟢🟢🟢🟢🟢🟢🟢
*/

export const getAuthChecking = async () => {
    try {
        const response = await api.get('/auth/me');
        return response.data.user;
    } catch (err) {
        toast.error(err.response.data.message || "Something went wrong");
        if (err.response && err.response.status === 403) return null;
        return null; // Ensure you return a value here
    }
}

export const getPosts = async () => (await api.get('/posts')).data;

export const getConnections = async () => (await api.get('/connections')).data;

export const getNotifications = async () => (await api.get('/notifications')).data;

export const getRecommendedUsers = async () => (await api.get('/users/suggestions')).data;

export const getConnectionRequests = async () => (await api.get('/connections/requests')).data

export const getPostById = async (obj) => (await api.get(`/posts/${obj.queryKey[1]}`)).data; // queryKey[1] === postId

export const getUserProfile = async (obj) => (await api.get(`/users/${obj.queryKey[1]}`)).data; // queryKey[1] === userName

export const getConnectionStatus = async (obj) => (await api.get(`/connections/status/${obj.queryKey[1]}`)).data; // queryKey[1] === userId


/*
✅✅✅✅✅✅✅✅
✅ POST Requests ✅
✅✅✅✅✅✅✅✅
*/

export const userRegistration = async (newUser) => (await api.post('/auth/register', newUser)).data;

export const userLogin = async (userData) => await api.post('/auth/login', userData);

export const userLogout = async () => await api.post('/auth/logout');

export const createPost = async (postData) => {
    const res = await api.post("/posts/create", postData, { headers: { "Content-Type": "application/json" } });
    return res.data;
}

export const likePost = async (postId) => await api.post(`/posts/${postId}/like`);

export const createComment = async ({ postId, comment }) =>
    await api.post(`/posts/${postId}/comment`, { content: comment })

export const sendConnectionRequest = async (userId) => await api.post(`/connections/request/${userId}`);


/*
☑️☑️☑️☑️☑️☑️☑️☑️
☑️ PUT Requests  ☑️
☑️☑️☑️☑️☑️☑️☑️☑️
*/

export const connectionRequestAccept = async (requestId) => await api.put(`/connections/accept/${requestId}`);

export const connectionRequestReject = async (requestId) => await api.put(`/connections/reject/${requestId}`);

export const notificationMarkAsRead = async (id) => await api.put(`/notifications/${id}/read`);

export const updateProfile = async (updatedData) => await api.put(`/users/profile`, updatedData);


/*
🔴🔴🔴🔴🔴🔴🔴🔴🔴
🔴 Delete Requests 🔴
🔴🔴🔴🔴🔴🔴🔴🔴🔴
*/

export const deletePost = async (id) => await api.delete(`/posts/delete/${id}`);

export const deleteNotification = async (id) => await api.delete(`/notifications/${id}`);

export const deleteConnection = async (userId) => await api.delete(`/connections/${userId}`)