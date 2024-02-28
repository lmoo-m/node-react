const response = (res, status, msg, data) => {
    return res.json({
        status,
        msg,
        data,
    });
};

export default response;
