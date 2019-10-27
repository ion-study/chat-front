<!-- ~/chat/room : 채팅방 목록 확인 -->
<template>
  <div>
    <div id="chat-page">
      <div class="chat-container">
        <div class="chat-header">
          <h2>Room List</h2>
          <h4 style="text-align: right">[user] {{$store.state.user.userInfo.name}}</h4>
        </div>
        <ul id="roomArea"> <!-- 채팅방 리스트 나열 -->
          <li class="room" v-for="room in rooms" :key="room.id" :data-room-id="room.roomId" @click.prevent="goRoom(room.roomId)">
            <div>
              <span>{{ room.roomId }}번 Room</span>
              <p>방장 : {{ room.ownerName }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>





  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        // 더미 data
        rooms: [
          {roomId: "1", ownerId: "111", ownerName: '가'},
          {roomId: "2", ownerId: "222", ownerName: '나'},
          {roomId: "3", ownerId: "333", ownerName: '다'},
          {roomId: "4", ownerId: "444", ownerName: '라'}
          ]
      }
    },

    methods: {
      goRoom(roomId) {
        // chat페이지 이동
        this.$router.push('/chat/room/' + roomId);
      }
    }

  }
</script>

<style scoped>
#roomArea {
  overflow-y: auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.room {
  border: 3px solid #dedede !important;
  width: 20vh;
  height: 20vh;
  border-radius: 5%;
  margin: 10px !important;
}
.room:hover {
  border: 3px solid #128ff2 !important;
}
</style>
