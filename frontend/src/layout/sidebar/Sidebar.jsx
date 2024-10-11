import { Home, UserPlus, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import route from "../../routes";


const Sidebar = ({ user }) => {

    const userUrl = `${route.profile}${user.userName}`;

    return (
        <div className='bg-secondary rounded-lg shadow'>
            <div className='p-4 text-center'>

                <div
                    className='h-16 rounded-t-lg bg-cover bg-center'
                    style={{
                        backgroundImage: `url("${user?.bannerImg || "/banner.png"}")`,
                    }}
                />

                <Link to={userUrl}>
                    <img
                        alt={user.name}
                        src={user.profilePicture || "/avatar.png"}
                        className='w-20 h-20 rounded-full mx-auto mt-[-40px]'
                    />

                    <h2 className='text-xl font-semibold mt-2'>{user.name}</h2>
                </Link>

                <p className='text-info'>{user.headline}</p>
                <p className='text-info text-xs'>{user.connections.length} connections</p>
            </div>


            <div className='border-t border-base-100 p-4'>
                <nav>
                    <ul className='space-y-2'>
                        <li>
                            <Link to={route.root} className='sidebarLink'>
                                <Home className='mr-2' size={20} /> Home
                            </Link>
                        </li>

                        <li>
                            <Link to={route.network} className='sidebarLink'>
                                <UserPlus className='mr-2' size={20} /> My Network
                            </Link>
                        </li>

                        <li>
                            <Link to={route.notifications} className='sidebarLink'>
                                <Bell className='mr-2' size={20} /> Notifications
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>


            <div className='border-t border-base-100 p-4 '>
                <Link to={userUrl} className='text-sm font-semibold'>
                    Visit your profile
                </Link>
            </div>

        </div>
    );
}

export default Sidebar