import { Toaster } from "react-hot-toast";

const Toast = () => {

    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 4000,
                style: {
                    background: '#363636',
                    color: '#fff',
                },
            }}
        />
    )
}

export default Toast