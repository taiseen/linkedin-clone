const getCurrentUser = async (req, res) => {

    const { user } = req;
    // this { user } set into req, by "protectedRoute()" middleware for tracking the user...

    try {

        res.status(200).json({ success: true, user });

    } catch (error) {

        console.log("🔴🔴🔴 Error in checkAuth ", error);

        res
            .status(400)
            .json({ success: false, error: error.message, message: 'Internal Server error 🔴' });
    }
};


export default getCurrentUser;