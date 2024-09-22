const getUserInfo = (userObject) => {

    return {
        ...userObject._doc,
        __v: undefined, // delete this property...
    };

};

export default getUserInfo;