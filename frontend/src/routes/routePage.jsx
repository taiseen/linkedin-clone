import RegistrationPage from "../pages/auth/RegistrationPage";
import NotificationsPage from "../pages/NotificationsPage";
import LoginPage from "../pages/auth/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import NetworkPage from "../pages/NetworkPage";
import HomePage from "../pages/HomePage";
import PostPage from "../pages/PostPage";
import route from ".";


const routesConfig = [
    { path: route.root, isPrivate: false, element: <HomePage /> },
    { path: route.login, isPrivate: false, element: <LoginPage /> },
    { path: route.network, isPrivate: true, element: <NetworkPage /> },
    { path: route.register, isPrivate: true, element: <RegistrationPage /> },
    { path: route.notifications, isPrivate: true, element: <NotificationsPage /> },
    { path: `${route.profile}:userName`, isPrivate: true, element: <ProfilePage /> },
    { path: `${route.post}:postId`, isPrivate: true, element: <PostPage /> },
];


export default routesConfig;