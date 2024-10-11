import { Link } from "react-router-dom";

const NotificationContent = ({ notification, friendUrl }) => {

    const { type, relatedUser: { name: friendName } } = notification;

    switch (type) {
        case "like":
            return (
                <span>
                    <Link to={friendUrl} className='font-bold'>
                        {friendName}
                    </Link>{" "} liked your post
                </span>
            );

        case "comment":
            return (
                <span>
                    <Link to={friendUrl} className='font-bold'>
                        {friendName}
                    </Link>{" "}
                    commented on your post
                </span>
            );

        case "connectionAccepted":
            return (
                <span>
                    <Link to={friendUrl} className='font-bold'>
                        {friendName}
                    </Link>{" "}
                    accepted your connection request
                </span>
            );

        default:
            return null;
    }
}

export default NotificationContent