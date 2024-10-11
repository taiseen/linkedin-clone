import { motion } from "framer-motion";

const LoadingSpinner = () => {

    return (
        <div className='h-[50vh] flex items-center justify-center relative overflow-hidden'>

            {/* Simple Loading Spinner */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className='w-16 h-16 border-4 border-t-4 border-t-blue-600 border-blue-300 rounded-full'
            />

        </div>
    );
};

export default LoadingSpinner;
