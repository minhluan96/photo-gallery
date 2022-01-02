import React from 'react';
import { useDispatch } from 'react-redux';
import { notification } from 'antd';

const showMessage = (type, message) => {
  switch (type) {
    case 'error':
      return notification.error({
        message: 'Error',
        description: message,
      });
    case 'success':
      return notification.success({
        message: 'Success',
        description: message,
      });
    case 'info':
      return notification.info({
        message: 'Session Expired',
        description: message,
      });
    default:
      return null;
  }
};

const useFetchApi = () => {
  const dispatch = useDispatch();

  const handleFailure = (error, onFailure) => {
    if (error.status === 500) {
      showMessage('error', '500 Internal server error!!!');
    } else {
      showMessage('error', error?.data?.message || '');
    }

    if (typeof onFailure === 'function') onFailure(error || '');
  };

  const handleSuccess = (response, onSuccess) => {
    if (response?.message) showMessage('success', response.message);
    if (typeof onSuccess === 'function') onSuccess(response);
  };

  const call = ({ type, params, onSuccess = null, onFailure = null }) => {
    dispatch({
      type,
      params,
      onSuccess: (response) => handleSuccess(response, onSuccess),
      onFailure: (error) => handleFailure(error, onFailure),
    });
  };

  return { call };
};

export default useFetchApi;
