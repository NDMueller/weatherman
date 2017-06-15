import { buildURL, formatWeatherData } from '../utils/weatherUtils';
import axios from "axios";

const initialState = {
  error: false,
  loading: false, 
  search: true,
  weather: {}
};

const RESET = "RESET";
const SET_WEATHER = "SET_WEATHER";

export default function weather( state = initialState, action ) {
  switch ( action.type ) {
    case SET_WEATHER + "_PENDING":
      return {
        error: false,
        loading: true,
        search: false,
        weather: {}
      };
    case SET_WEATHER + "_FULFILLED":
      console.log( action.payload );
      return {
        error: false,
        loading: false,
        search: false,
        weather: action.payload
      };
    case SET_WEATHER + "_REJECTED":
      return {
        error: true,
        loading: false,
        search: false,
        weather: {}
      };
      
    case RESET: return initialState;
    default: return state;
  }
}

export function reset() {
  return { type: RESET };
}

export function setWeather( location ) {
  var url = buildURL( location );
  const promise = axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appId=06ccdcc5f56aa95aa46a018eda003e1b&units=imperial`).then( response => formatWeatherData( response.data ) );
  return {
    type: SET_WEATHER,
    payload: promise
  }
}