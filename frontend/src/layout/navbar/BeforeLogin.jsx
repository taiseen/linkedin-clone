import { Link } from "react-router-dom";
import route from "../../routes"


const BeforeLogin = () => {

    return (
        <>
            <Link to={route.login} className='btn btn-ghost'>
                Sign In
            </Link>

            <Link to={route.register} className='btn btn-primary'>
                Join now
            </Link>
        </>
    )
}

export default BeforeLogin