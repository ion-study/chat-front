export default {
  state: {
    // rooms: [
    //   {roomId: "1", ownerId: "1001", ownerName: "ann", roomName: "ann room"},
    //   {roomId: "2", ownerId: "1002", ownerName: "sangkey", roomName: "sangkey room"},
    //   {roomId: "3", ownerId: "1003", ownerName: "avan", roomName: "avan room"}
    // ],
    loadedData: []
  },
  mutations: {
    setData(state, roomsData){
      state.loadedData = roomsData
    }
  },
  actions: {
    async nuxtServerInit({ commit }, { app }){
      try{
        const {data} = await app.$axios.$get('/room/list')
        console.log(data)
        commit('setData', data)
      } catch(e){
        console.error(e)
      }
    }
  },
  getters: {
    loadedData(state) {
      return state.loadedData
    }
  }
}
