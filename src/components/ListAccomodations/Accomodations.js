import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import ListAccommodations from './ListAccommodations';
import {
  detailsAccommodation,
  listAccommodations,
} from '../../redux/actions/accommodationActions';

const Accommodation = () => {
  const { accommodations, loading, error } = useSelector(
    (state) => state.accommodations
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listAccommodations());
  }, []);

  return (
    <div className="mainContent" data-testid="update-1">
      <ListAccommodations
        accommodations={accommodations}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Accommodation;
