import { useDeleteNotification, useNotificationMarkAsRead } from '../../api/mutation';
import { Eye, Trash2 } from 'lucide-react'


const NotificationActions = ({ notification }) => {

    const { mutate: markAsReadNotification } = useNotificationMarkAsRead();
    const { mutate: deleteNotification } = useDeleteNotification();


    return (
        <div className='flex gap-2'>
            {
                !notification.read && (
                    <button
                        aria-label='Mark as read'
                        onClick={() => markAsReadNotification(notification._id)}
                        className='p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors'
                    >
                        <Eye size={16} />
                    </button>
                )
            }

            <button
                aria-label='Delete notification'
                onClick={() => deleteNotification(notification._id)}
                className='p-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors'
            >
                <Trash2 size={16} />
            </button>
        </div>
    )
}

export default NotificationActions