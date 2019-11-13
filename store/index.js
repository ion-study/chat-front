import Vuex from 'vuex';
import user from './user';
import chat from './chat';

const store = () => new Vuex.Store({
  modules: {
    user,
    chat
  }
})

export default store
