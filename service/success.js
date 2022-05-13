
function success(res, data) {
    res.send({
        status: true,
        data: data
    }).end();
}

module.exports = success;