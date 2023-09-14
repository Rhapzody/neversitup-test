export const getErrorMessage = (error) => {
    const message = error.response ? error.response.data.message : error.message
    return message
}