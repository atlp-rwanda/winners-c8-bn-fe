/**
 * @jest-environment jsdom
 */
 import React from 'react';
 import configureStore from 'redux-mock-store';
 import thunk from 'redux-thunk';
 import axios from 'axios';
 import MockAdapter from 'axios-mock-adapter';
 import { listAccommodations, updateAccommodationRequest } from '../../src/redux/actions/accommodationActions';
import AxiosMockAdapter from 'axios-mock-adapter';
import axiosInstance from '../helpers/http';
const mockAxiosAdapter = new AxiosMockAdapter(axiosInstance);
const middleware = [thunk];
const mockStore = configureStore(middleware);
const mock = new MockAdapter(axios);
const store = mockStore({});
import { accommodationsReducer, AccommodationUpdateReducer, deleteAccommodationReducer } from '../../src/redux/reducers/accommodationReducers';
import { cleanup } from '@testing-library/react';
import Accommodation from '../components/ListAccomodations/Accomodations';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  MemoryRouter as MemoryRouter,
} from 'react-router-dom';
import '@testing-library/jest-dom';
import renderer, { act } from 'react-test-renderer';
import {
    render,
    screen,
    fireEvent,
    waitFor,
  } from '@testing-library/react';
  import { 
    FETCH_ACCOMMODATIONS_LOADING, 
    FETCH_ACCOMMODATIONS_SUCCESS, 
    FETCH_ACCOMMODATIONS_FAILED,
    FETCH_SINGLE_ACCOMMODATION_FAILED,
    FETCH_SINGLE_ACCOMMODATION_LOADING,
    FETCH_SINGLE_ACCOMMODATION_SUCCESS,
    ACCOMMODATION_UPDATE_LOADING,
    ACCOMMODATION_UPDATE_SUCCESS,
    ACCOMMODATION_UPDATE_FAILURE,
    ACCOMMODATION_DELETE_SUCCESS,
    ACCOMMODATION_DELETE_LOADING,
    ACCOMMODATION_DELETE_FAILURE,
    ACCOMMODATION_VIEW_SUCCESS,
    ACCOMMODATION_VIEW_FAILURE,
    ACCOMMODATION_VIEW_LOADING
} from "../redux/actions/actionTypes";

describe('RUD accommodations Test', () => {
    it('It should list all accommodations', async () => {
      let response;
      mockAxiosAdapter
        .onGet(
          '/accommodations/',
          {},
          expect.objectContaining({
            Authorization: expect.stringMatching(/^Bearer/),
          })
        )
        .reply(200);
      response = await axiosInstance.get('/accommodations/');
      expect(response).toBeUndefined();
      localStorage.setItem('auth-token', 'Token');
      response = await axiosInstance.get('/accommodations/');
      expect(response.status).toBe(200);
    });

    it('should be able to handle the 401 error', async () => {
        mockAxiosAdapter.onGet(/tokenError/i).reply(401, {
        success: false,
        status: 401,
        data: { message: 'Access denied. Invalid token' },
      });
      const result = await axiosInstance.get('/tokenError');
      expect(result.status).toBe(401);
    });

    describe('accommodationsReducer(state, action)', () => {
        const state = {};
      
        const getAllAccommodations = {
          type: FETCH_ACCOMMODATIONS_SUCCESS,
          payload:'payload'
        };
      
        const FailureToGetAccommodations = {
          type: FETCH_ACCOMMODATIONS_FAILED,
          error: 'message',
        };
      
        const requestFetchingAccommodations = {
          type: FETCH_ACCOMMODATIONS_LOADING,
        };
      describe('listing accommodations', ()=>{
        it('it should return false for loading and all accommodations', () => {
            const updatedState = accommodationsReducer(state, getAllAccommodations);
            expect(updatedState).toEqual({ 
              loading: false
              });
          });
        
          it('should return false for loading and failure message', () => {
            const updatedState = accommodationsReducer(state, FailureToGetAccommodations);
            expect(updatedState).toEqual({ loading: false });
          });
        
          it('should return true for loading and send fetch req to server', () => {
            const updatedState = accommodationsReducer(state, requestFetchingAccommodations);
            expect(updatedState).toEqual({ loading: true });
          });
      })

      const updateAccommodation = {
        type: ACCOMMODATION_UPDATE_SUCCESS,
        data:'payload'
      };
    
      const FailureToUpdateAccommodation = {
        type: ACCOMMODATION_UPDATE_FAILURE,
        error: 'message',
      };
    
      const requestUpdatingAccommodations = {
        type: ACCOMMODATION_UPDATE_LOADING,
      };

      describe('updating accommodations', ()=>{
        it('it should update', async()=>{
          const store = mockStore({ 
            id: 23,
            name: "Sport view",
            description: "this is a good house, I swear.",
            location_id: 2,
            latitude: 15.234,
            longitude: -100,
            images_links: [
              "http://res.cloudinary.com/atlp8winners/image/upload/v1661447268/winners-c8-bn-be/production/accommodations/facilities/opxayjemz7cruygl3apy.jpg"
            ],
           });
      mockAxiosAdapter
      .onPatch(
        '/accommodations/23',
        {},
        expect.objectContaining({
          Authorization: expect.stringMatching(/^Bearer/),
        })
      )
      .reply(200);
          await store.dispatch(listAccommodations());
          const actions = store.getActions();
          expect(actions[1].type).toEqual(FETCH_ACCOMMODATIONS_FAILED);
        })

        it('it should return false for loading and isUpdated true', () => {
            const updatedState = AccommodationUpdateReducer(state, updateAccommodation);
            expect(updatedState).toEqual({ 
                loading: false,
				        isUpdated: true
              });
          });
        
          it('should return false for loading and failure message', () => {
            const updatedState = AccommodationUpdateReducer(state, FailureToUpdateAccommodation);
            expect(updatedState).toEqual({ loading: false, isUpdated: false });
          });
        
          it('should return true for loading and send fetch req to server', () => {
            const updatedState = AccommodationUpdateReducer(state, requestUpdatingAccommodations);
            expect(updatedState).toEqual({ loading: true, isUpdated: false });
          });
      })


      const deleteAccommodation = {
        type: ACCOMMODATION_DELETE_SUCCESS,
      };
    
      const FailureToDeleteAccommodation = {
        type: ACCOMMODATION_DELETE_FAILURE,
        error: 'message',
      };
    
      const requestDeletingAccommodations = {
        type: ACCOMMODATION_DELETE_LOADING,
      };

      describe('DELETING accommodations', ()=>{
        it('it should return false for loading and isUpdated true', () => {
            const updatedState = deleteAccommodationReducer(state, deleteAccommodation);
            expect(updatedState).toEqual({ 
                loading: false,
				        isDeleted: true
              });
          });
        
          it('it should return false for loading and failure message', () => {
            const updatedState = deleteAccommodationReducer(state, FailureToDeleteAccommodation);
            expect(updatedState).toEqual({ loading: false, isDeleted: false });
          });
        
          it('it should return true for loading and send fetch req to server', () => {
            const updatedState = deleteAccommodationReducer(state, requestDeletingAccommodations);
            expect(updatedState).toEqual({ loading: true, isDeleted: false });
          });
      })
      });
      

      describe('list accommodation(accommodations) actions', () => {

        it('dispatches FETCH_ACCOMMODATIONS_LOADING before', async () => {
          store.clearActions();
          await store.dispatch(listAccommodations());
         
        });
      
        it('dispatches FETCH_ACCOMMODATIONS_SUCCESS', async () => {
          store.clearActions();
          await store.dispatch(listAccommodations());
        });

        it('dispatches FETCH_ACCOMMODATIONS_FAILED', async () => {
          store.clearActions();
          await store.dispatch(listAccommodations());
        });
      });
      

  });
  axiosInstance;

  describe('Connected Accommodation Component to React-Redux', () => {
    let store;
    let component;
  
    beforeEach(() => {
      store = mockStore({
        accommodations: [],
        updatingAccomodation:{
            loading: true,
            isUpdated: false
        },
        deletingAccommodation:{
            loading: true,
            isDeleted:false
        },
        error: ''

      });
      mockAxiosAdapter
      .onGet(
        '/accommodations/',
        {},
        expect.objectContaining({
          Authorization: expect.stringMatching(/^Bearer/),
        })
      )
      .reply(200);
  
      component = renderer.create(
        <Provider store={store}>
          <Router>
            <Accommodation />
          </Router>
        </Provider>
      );
    });
  
    it('should render with given state from Redux store', () => {
      expect(component.toJSON()).toMatchSnapshot();
    });
  });