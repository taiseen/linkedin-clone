import { Link } from "react-router-dom";

const PageNotFound = () => {

    return (
        <div className="flex justify-center mt-28">

            <div className="bg-blue-200 rounded pt-4 pb-5 px-6 text-center space-y-3">
                <p className="text-3xl">404 | Page Not Found</p>
                <p className="text-xl underline underline-offset-8 decoration-wavy decoration-red-600">
                    <Link to="/">Back To Home Page</Link>
                </p>
            </div>

        </div>
    )
}

export default PageNotFound