import { Navigate, Route, Routes } from "react-router-dom";
import { useGetAuthChecking } from "./api/query";

import RegistrationPage from "./pages/auth/RegistrationPage";
import NotificationsPage from "./pages/NotificationsPage";
import PageNotFound from "./pages/PageNotFound";
import LoginPage from "./pages/auth/LoginPage";
import NetworkPage from "./pages/NetworkPage";
import ProfilePage from "./pages/ProfilePage";
import SidebarLayout from "./layout/sidebar";
import PostPage from "./pages/PostPage";
import HomePage from "./pages/HomePage";
import Toast from "./utils/Toast";
import Layout from "./layout";
import route from "./routes";


const App = () => {

  const { data: authUser, } = useGetAuthChecking();

  // if (isLoading) return <LoadingSpinner />;

  return (
    <Layout>

      <Routes>
        <Route path={route.register} element={!authUser ? <RegistrationPage /> : <Navigate to={route.root} />} />

        <Route path={route.login} element={!authUser ? <LoginPage /> : <Navigate to={route.root} />} />

        <Route
          path={route.root}
          element={
            authUser
              ? <SidebarLayout authUser={authUser}>
                <HomePage authUser={authUser} />
              </SidebarLayout>
              : <Navigate to={route.login} />
          }
        />

        <Route
          path={`${route.post}:postId`}
          element={
            authUser ?
              <SidebarLayout authUser={authUser}>
                <PostPage authUser={authUser} />
              </SidebarLayout>
              : <Navigate to={route.login} />
          }
        />

        <Route
          path={route.network}
          element={
            authUser ?
              <SidebarLayout authUser={authUser}>
                <NetworkPage authUser={authUser} />
              </SidebarLayout>
              : <Navigate to={route.login} />
          }
        />

        <Route
          path={route.notifications}
          element={
            authUser ?
              <SidebarLayout authUser={authUser}>
                <NotificationsPage authUser={authUser} />
              </SidebarLayout>
              : <Navigate to={route.login} />
          }
        />

        <Route
          path={`${route.profile}:userName`}
          element={
            authUser ? <ProfilePage authUser={authUser} /> : <Navigate to={route.login} />
          }
        />


        <Route
          path={`${route.pageNotFound}`}
          element={<PageNotFound />}
        />

      </Routes>

      <Toast />

    </Layout>
  )
}

export default App;