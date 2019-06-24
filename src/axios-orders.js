import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://burger-builder-4405e.firebaseio.com'
});


export default instance;