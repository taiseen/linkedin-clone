import NotificationItem from "../components/notification";
import { useGetNotifications } from "../api/query";


const NotificationsPage = ({ authUser }) => {

    const { data: notifications, isLoading } = useGetNotifications(authUser);

    return (
        <div className='col-span-1 lg:col-span-3'>
            <div className='bg-white rounded-lg shadow p-6'>

                <h1 className='text-2xl font-bold mb-6'>Notifications</h1>

                {
                    isLoading
                        ? <p>Loading notifications...</p>
                        : notifications?.length > 0
                            ? <ul>
                                {
                                    notifications.map(notifiy =>
                                        <NotificationItem key={notifiy._id} notification={notifiy} />
                                    )
                                }
                            </ul>
                            : <p>No notification at the moment.</p>
                }
            </div>
        </div>
    )
}

export default NotificationsPage