import { useReducer, useState } from 'react';
import axios from 'axios';

const initialState = {
  templateList: [],
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TEMPLATE_SUCCESS':
      return {
        ...state,
        templateList: action.payload
      };
    case 'GET_TEMPLATE_ERR':
      return {
        ...state,
        error: action.payload
      };
    case 'ADD_TEMPLATE_SUCCESS':
      return {
        ...state,
        templateList: action.payload
      };
    case 'ADD_TEMPLATE_ERR':
      return {
        ...state,
        error: action.payload
      };
    case 'DELETE_TEMPLATE_SUCCESS':
      return {
        ...state,
        templateList: action.payload
      };
    case 'DELETE_TEMPLATE_ERR':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

const useTemplate = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getTemplateList = async ({ googleId }) => {
    try {
      // Test endpoint
      const response = await axios.get(
        `${process.env.REACT_APP_ENDPOINT_URL}/api/template/${googleId}`
      );
      console.log('googleId', googleId);
      console.log('getTemplate response', response.data);
      dispatch({
        type: 'GET_TEMPLATE_SUCCESS',
        payload: response.data
      });
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: 'GET_TEMPLATE_ERR',
        payload: err.response
      });
    }
  };

  const addTemplate = async (data, { googleId }) => {
    const template = {
      ...data,
      googleId
    };
    console.log('addTemplate', template);
    try {
      await axios.post(
        `${process.env.REACT_APP_ENDPOINT_URL}/api/template`,
        template
      );
      dispatch({
        type: 'ADD_TEMPLATE_SUCCESS',
        payload: await getTemplateList()
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'GET_TEMPLATE_ERR',
        payload: err.response
      });
    }
  };

  const deleteTemplate = async id => {
    try {
      // Test endpoint
      const response = await axios.delete(
        `${process.env.REACT_APP_ENDPOINT_URL}/api/template/${id}`
      );
      console.log(response.data);
      dispatch({
        type: 'DELETE_TEMPLATE_SUCCESS',
        payload: response.data
      });
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: 'GET_TEMPLATE_ERR',
        payload: err.response
      });
    }
  };

  return {
    templateList: state.templateList,
    getTemplateList,
    addTemplate,
    deleteTemplate
  };
};

export default useTemplate;
