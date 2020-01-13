import axios from 'axios'

export default {
  state: {
    //userInfo: {name: '', sessionId: ''}
    authUser: null
  },
  // getters: {
  // },
  mutations: {
    LOGIN: function(state, user) {
      state.authUser = user
    },
    LOGOUT: function() {
      state.authUser = null
    },
    SET_USER: function(state, user) {
      state.authUser = user
    }
  },
  actions: {
    // nuxtServerInit는 모든 페이지를 서버 렌더링하기 전에 Nuxt.js에 의해 호출
    async nuxtServerInit({ commit }, { req }){
      if (req.session && req.session.authUser) {
        commit('SET_USER', req.session.authUser)
      }
    },
    async login({ commit }, { id, pw }) {
      //let { data } = await axios.post('/백엔드로그인경로', { id, pw })
      //test용
      let data;
      if((id==='admin') && (pw==='success')) data = {user: id}
      if(!data) throw new Error('로그인에 실패했습니다.')
      commit('LOGIN', data.user)
    },
    async logout({ commit }) {
      await axios.post('/백엔드로그아웃경로').then(() => commit('LOGOUT'))
    }
  }
}
