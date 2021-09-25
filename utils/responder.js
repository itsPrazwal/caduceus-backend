const makeResponseObject = (data, message) => ({
    result: true,
    data,
    message
})

const makeErrorObject = (error, message) => ({
    result: false,
    status: error.status || 400,
    message
})

module.exports = {
    makeErrorObject,
    makeResponseObject
}