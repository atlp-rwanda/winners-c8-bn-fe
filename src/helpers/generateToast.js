import React from 'react';
import { toast, Zoom } from 'react-toastify';

export const errorToast = (msg) => {
  toast.error(<div>{msg}</div>, {
    draggable: true,
    autoClose: 5000,
    transition: Zoom,
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const existToast = (msg) => {
  toast.error(<div>{msg}</div>, {
    draggable: true,
    autoClose: 5000,
    transition: Zoom,
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const successToast = (msg) => {
  toast.success(<div>{msg}</div>, {
    draggable: true,
    autoClose: 5000,
    transition: Zoom,
    position: toast.POSITION.TOP_RIGHT,
  });
};
