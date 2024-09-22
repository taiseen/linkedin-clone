import path, { dirname } from 'path';
import httpStatus from 'http-status';
import { fileURLToPath } from 'url';


// Create __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const routeNotFound = (req, res) => {

    const responseData = {
        status: false,
        message: 'Api Route Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API not found',
            },
        ],
    };

    res.status(httpStatus.NOT_FOUND).json(responseData);


    // Return as an html template...
    // res
    //     .status(httpStatus.NOT_FOUND)
    //     .sendFile(path.join(__dirname, '..', '..', 'public', '404.html'));
    // '..', '..', <== this mean relative path navigation...
};


export default routeNotFound;