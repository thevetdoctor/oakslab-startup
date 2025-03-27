import { HttpStatus } from '@nestjs/common';

export const axiosErrorLogic = (
  error,
): { status: HttpStatus; message: string } => {
  let status = 404;
  let message = '';
  if (error.code === 'ECONNABORTED' || error.response?.status === 408) {
    // Timeout or explicit 408 error
    status = HttpStatus.REQUEST_TIMEOUT;
    message = 'Request timed out. Please try again later';
  } else if (error.response) {
    // The request was made and the server responded with a status code
    status = error.response.status || HttpStatus.INTERNAL_SERVER_ERROR;
    message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      'External service error';
  } else if (error.request) {
    // The request was made but no response was received
    status = HttpStatus.SERVICE_UNAVAILABLE;
    message = 'No response from external service';
  } else {
    // Something happened in setting up the request that triggered an error
    status = HttpStatus.INTERNAL_SERVER_ERROR;
    message = error.message || 'Internal request error';
  }
  return { status, message };
};
