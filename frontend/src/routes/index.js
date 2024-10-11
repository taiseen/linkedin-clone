const route = {
    root: '/',
    login: '/login',
    register: '/register',

    network: '/network',
    post: '/post/', // :postId 
    profile: '/profile/', // :userName
    notifications: '/notifications',

    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password/:token',
    emailVerification: '/email-verification',
    pageNotFound: '*',
}

export default route;