
import { INCREMENT, DECREMENT, FETCH_USER_ERROR, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from './types';
import axios from 'axios';

export const increaseCounter = () => {

    return {

        type: INCREMENT,

    };

};

export const decreaseCounter = () => {

    return {

       type: DECREMENT,

    };

};

export const fetchAllUser =  () => {
    return async (dispatch, getState) => {
        dispatch(fetchUSersRequest());
        try {
            const res = await axios.get("http://localhost:8080/users/all");
            const data = res.data ? res.data : [];
            dispatch(fetchUSersSuccess(data))
        } catch (error) {
            dispatch(fetchUSersError());
        }
      
    }
}

const fetchUSersRequest = () => {
    return {
      type: FETCH_USER_REQUEST
    }
  }
  
const fetchUSersSuccess = (data) => {
    return {
      type: FETCH_USER_SUCCESS,
      dataUsers: data
    }
  }
  
const fetchUSersError = () =>  {
    return {
      type: FETCH_USER_ERROR
    }
  }