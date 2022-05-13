const error = ({
    res,
    message = '操作錯誤，請查看錯誤訊息',
    error
}) => {
    res.status(400).send({
        status: false,
        message,
        error
    }).end()
}
module.exports = error;