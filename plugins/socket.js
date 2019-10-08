import Vue from 'vue';
import Stomp from 'vue-stomp';

let api_endpoint = 'http://ec2-18-223-151-196.us-east-2.compute.amazonaws.com:8080';
let local_endpoint = 'http://localhost:8080';

Vue.use(Stomp, `${local_endpoint}/ws`);
