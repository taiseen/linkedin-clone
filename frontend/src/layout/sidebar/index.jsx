import { useLocation } from 'react-router-dom';
import route from '../../routes';
import Sidebar from "./Sidebar"


const SidebarLayout = ({ children, authUser }) => {

    const location = useLocation();

    // checking the current path... for conditionaly ui rendering...
    const isNetworkPage = location.pathname === route.network // || location.pathname === route.notifications;

    return (
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>

            <div className={`${isNetworkPage ? '' : 'hidden'} lg:block lg:col-span-1`}>
                <Sidebar user={authUser} />
            </div>

            {children}

        </div>
    )
}

export default SidebarLayout