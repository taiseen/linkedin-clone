import { MessageSquare, ThumbsUp, UserPlus } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import NotificationActions from "./NotificationActions";
import NotificationContent from "./NotificationContent";
import NotifiedPost from "./NotifiedPost";
import route from "../../routes";


const NotificationItem = ({ notification }) => {

    const friendUrl = `${route.profile}${notification.relatedUser.userName}`;


    const notificationIcon = type => {
        switch (type) {
            case "like":
                return <ThumbsUp className='text-blue-500 size-4' />;
            case "comment":
                return <MessageSquare className='text-green-500 size-4' />;
            case "connectionAccepted":
                return <UserPlus className='text-purple-500 size-4' />;
            default:
                return null;
        }
    };


    return (
        <li
            className={`border rounded-lg p-4 my-4 transition-all hover:shadow-md 
            ${!notification.read ? "bg-gray-200/70 border-blue-500" : "bg-white border-gray-200"}`}
        >
            <div className='flex items-start justify-between'>
                <div className='flex items-center space-x-4'>

                    <Link to={friendUrl}>
                        <img
                            alt={notification.relatedUser.name}
                            src={notification.relatedUser.profilePicture || "/avatar.png"}
                            className='w-12 h-12 rounded-full object-cover'
                        />
                    </Link>

                    <div>
                        <div className='flex items-center gap-2'>
                            <div className='p-1 bg-gray-100 rounded-full'>
                                {notificationIcon(notification.type)}
                            </div>

                            <p className='text-sm'>
                                <NotificationContent friendUrl={friendUrl} notification={notification} />
                            </p>
                        </div>

                        <p className='text-xs text-gray-500 mt-1'>
                            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                        </p>

                        <NotifiedPost relatedPost={notification?.relatedPost} />
                    </div>
                </div>

                <NotificationActions notification={notification} />

            </div>
        </li>
    )
}

export default NotificationItem;