import { useGetConnectionRequests, useGetNotifications } from "../../api/query";
import { Bell, Home, LogOut, Users } from "lucide-react";
import { useLogout } from "../../api/mutation";
import { Link } from "react-router-dom";
import route from "../../routes";


const AfterLogin = ({ authUser }) => {

    const { mutate: logout } = useLogout();

    const { data: notifications } = useGetNotifications(authUser);
    const { data: connectionRequests } = useGetConnectionRequests(authUser);

    const unReadNotification = notifications?.filter(notify => !notify.read).length;
    const unReadConnectionRequests = connectionRequests?.length;


    return (
        <>
            <Link to={route.root} className='navLink'>
                <Home size={20} />
                <span className='text-xs hidden md:block'>Home</span>
            </Link>


            <Link to={route.network} className='navLink relative'>
                <Users size={20} />
                <span className='text-xs hidden md:block'>My Network</span>
                {
                    unReadConnectionRequests > 0 && (
                        <span className='notificationCircle'>
                            {unReadConnectionRequests}
                        </span>
                    )
                }
            </Link>


            <Link to={route.notifications} className='navLink relative'>
                <Bell size={20} />
                <span className='text-xs hidden md:block'>Notifications</span>
                {
                    unReadNotification > 0 && (
                        <span className='notificationCircle'>
                            {unReadNotification}
                        </span>
                    )
                }
            </Link>


            <Link
                className='navLink'
                to={`${route.profile}${authUser.userName}`}
            >
                {/* <User size={20} /> */}
                <img
                    alt={authUser.name}
                    src={authUser.profilePicture || "/avatar.png"}
                    className='size-6 rounded-full'
                />
                <span className='text-xs hidden md:block'>Me</span>
            </Link>


            <button className='logoutBtn' onClick={() => logout()}>
                <LogOut size={20} />
                <span className='hidden md:inline'>Logout</span>
            </button>
        </>
    )
}

export default AfterLogin