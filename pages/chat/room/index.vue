<!-- ~/chat/room : 채팅방 목록 확인 -->
<template>
  <div>
    <div id="chat-page">
      <div class="chat-container">
        <div class="chat-header">
          <h2>Room List</h2>
          <h4 style="text-align: right">[user] {{$store.state.user.userInfo.name}}</h4>
        </div>
        <!-- 채팅방 리스트 나열 -->
        <ul id="roomArea">
          <li class="room" v-for="room in roomList" :key="room.id" :data-room-id="room.id" @click.prevent="goRoom(room.id)">
            <div>
              <span>[{{ room.id }}] {{room.name}}</span>
              <p>owner : {{ room.name }}</p>
            </div>
          </li>
        </ul>
        <!-- 방만들기 버튼 -->
        <div class="form-group text-center">
          <button class="accent" @click="showModal=true">CREATE</button>
        </div>
      </div>
    </div>
    <!-- Modal Component -->
    <Modal v-if="showModal" @close="showModal=false" @create="createRoom">
      <h3 slot="header" class="modal-h3">Create the Room</h3>
      <div slot="body" class="modal-cont">
        <div><label for="room-name">title</label><input type="text" id="room-name" placeholder="제목"></div>
        <div><label for="room-sec">공개 여부(임시)</label><input type="checkbox" id="room-sec"></div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from '~/components/utils/Modal.vue'
  export default {
    name: "index",
    components: {
      Modal
    },
    data() {
      // let rooms = this.$store.state.chat.rooms;
      let rooms = this.$store.state.chat.loadedData;
      console.log(this.$store.state.chat.loadedData)
      return {
        roomList: rooms,
        showModal: false
      }
    },
    beforeCreate() {
      // userInfo 체크
      if(!this.$store.state.user.userInfo.name) {
        console.log("[chat/room] username 없을 경우 첫페이지로 리턴");
        this.$router.push('/');
      }
    },
    methods: {
      goRoom(roomId) {
        // chat페이지 이동
        this.$router.push('/chat/room/' + roomId);
      },
      createRoom() {
        let roomName = document.getElementById("room-name").value;
        // store room 추가
        let newRoomId = this.roomList.length+1;
        this.$store.state.chat.rooms.push({
          roomId: `${newRoomId}`,
          ownerId: "userID",
          ownerName: `${this.$store.state.user.userInfo.name}`,
          roomName: roomName
        });
       // this.goRoom(newRoomId);
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
  font-size: 0.9rem;
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

/***** Modal Custom *****/
.modal-h3 {
  margin-top: 0;
  color: #128ff2;
}
.modal-cont {

}
</style>
