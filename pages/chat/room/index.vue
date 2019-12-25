<!-- ~/chat/room : 채팅방 목록 확인 -->
<template>
  <div>
    <div id="chat-page">
      <div class="chat-container">
        <div class="chat-header">
          <h2>Room List</h2>
          <div class="chat-subheader">
            <button class="accent" onclick="history.back();">BACK</button>
            <h4><p id="user-icon"></p> <span id="user-name">{{$store.state.user.userInfo.name}}</span></h4>
          </div>
        </div>
        <!-- 채팅방 리스트 나열 -->
        <ul id="roomArea">
          <li class="room" v-for="room in roomList" :key="room.id" :data-room-id="room.roomId" @click.prevent="goRoom(room.roomId)">
            <div class="room-img-icon"></div>
            <div class="room-info">
              <span>[{{ room.roomId }}] {{room.roomName}}</span>
              <p>owner : {{ room.ownerName }}</p>
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
      let rooms = this.$store.state.chat.rooms;
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
        this.goRoom(newRoomId);
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
    border-radius: 10px;
    margin: 10px !important;
  }
  .room:hover {
    border: 3px solid #128ff2 !important;
  }
  .room-img-icon{
    float:left;
    width:30%;
    height:100%;
    background:url("~assets/img/chat.png") 23px 20px no-repeat;
    border:1px solid cadetblue;
    border-radius: 10px;
  }
  .room-info{
    float:left;
    width:70%;
    text-align: center;
    margin-top:60px;
  }
  .chat-subheader{
    width:100%;
    max-width:640px;
    height:40px;
    margin: 0 auto;
  }
  .chat-subheader button{
    display:inline;
    float:left;
    height: 40px;
    border: 1px solid #acacac;
  }
  .chat-subheader h4{
    text-align: right;
  }
  #user-icon{
    display: inline-block;
    background:url("~assets/img/user1.png") no-repeat;
    width:40px;
    height: 40px;
    margin : 0 auto;
  }

  #user-name{
    vertical-align: middle;
    height: 58px;
    display: inline-block;
  }
  /***** Modal Custom *****/
  .modal-h3 {
    margin-top: 0;
    color: #128ff2;
  }
</style>
