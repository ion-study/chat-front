import Vuex from 'vuex';
import user from './user';

const store = () => new Vuex.Store({
  modules: {
    user
  }
})

export default store
