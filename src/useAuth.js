import React, { useEffect, useReducer, useState } from 'react';
import ReactDOM from 'react-dom';

function useAuth(api) {
    let [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'LOADING': {
        return { ...state, loading: true }
      }
      case 'RESOLVED': {
        return {
          ...state,
          loading: false,
          response: action.response,
          error: null
        }
      }
      case 'ERROR': {
        return {
          ...state,
          loading: false,
          response: null,
          error: action.error
        }
      }
      default:
        return state
    }
  }, {
    loading: false,
    response: null,
    error: null
  })
  
  useEffect(() => {
    let isCurrent = true
    dispatch({ type: "LOADING" })
    fetch(api)
      .then(response => response.json())
      .then(json => {
        if (isCurrent) {
          dispatch({ type: "RESOLVED", response: JSON.parse(json.data) })
        }
      }).catch(error => {
        dispatch({ type: "ERROR", error })
      })
    return () => {
      isCurrent = false
    }
  }, [])
  
  return [state.loading, state.response, state.error]
}

export default useAuth