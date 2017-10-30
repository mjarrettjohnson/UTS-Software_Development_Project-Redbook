class ErrorHandler {
  handle = error => {
    if (!error) return {};

    if (!error.response) {
      // eslint-disable-next-line
      return error;
    }

    if (!error.response.status) {
      return error.response;
    }

    return {
      status: error.response.status || '',
      body: error.response.data.message || error.response.data,
    };
  };
}
export default new ErrorHandler();
