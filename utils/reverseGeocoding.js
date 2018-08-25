import axios from 'axios';

export default (lat, lng) => {
  const KEY = 'AIzaSyCVRHS8BladFVAXfUvmehGUorh1zGsLgR8'
  return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${KEY}`)
}