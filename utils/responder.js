const makeResponseObject = (data, message) => ({
    result: true,
    data,
    message
})

const makeErrorObject = (error, message) => ({
    result: false,
    error,
    message
})

module.exports = {
    makeErrorObject,
    makeResponseObject
}