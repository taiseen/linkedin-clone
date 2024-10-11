import { useGetAuthChecking } from "../../api/query";
import { Link } from "react-router-dom";
import BeforeLogin from "./BeforeLogin";
import AfterLogin from "./AfterLogin";
import route from "../../routes";


const Navbar = () => {

    const { data: authUser } = useGetAuthChecking();


    return (
        <nav className='bg-secondary shadow-md sticky top-0 z-10'>
            <div className='max-w-7xl mx-auto px-4'>
                <div className='flex justify-between items-center py-3'>

                    <div className='flex items-center space-x-4'>
                        <Link to={route.root}>
                            <img className='h-8 rounded' src='/logo.png' alt='LinkedIn' />
                        </Link>
                    </div>

                    <div className='flex items-center gap-4 md:gap-6'>
                        {
                            authUser
                                ? <AfterLogin authUser={authUser} />
                                : <BeforeLogin />
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar