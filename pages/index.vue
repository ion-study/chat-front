<template>
  <div>
    <div id="username-page">
      <div class="username-page-container">
        <h1 class="title">Type your username</h1>
        <form id="usernameForm" name="usernameForm">
          <div class="form-group">
            <input type="text" id="name" placeholder="Username" autocomplete="off" class="form-control" v-model="userName"/>
          </div>
          <div class="form-group">
            <button type="submit" class="accent username-submit" @click.prevent="connect">Start Chatting</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import SockJS from "sockjs-client";
  // import Stomp from 'stompjs';

  export default {

  components: {
  },
  data() {
    return {
      userName: '',
      stompClient: null
    }
  },
  computed: mapState({
    userInfo: state => state.user.userInfo
  }),
  methods: {
    connect() {
      //let api_url = 'http://ec2-18-223-151-196.us-east-2.compute.amazonaws.com:8080';
      let test_url = 'http://localhost:8080';
      console.log('connect')
      if(this.userName) {
        console.log(this.userName)
        var socket = new SockJS(`${test_url}/ws`);
        this.stompClient = Stomp.over(socket,{ debug: false });
        this.stompClient.connect({}, this.onConnected, this.onError);

      }
    },
    onConnected() {
      // Subscribe to the Public Topic
      this.stompClient.subscribe('/topic/public', this.onMessageReceived);

      //Tell your username to the server
      this.stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender: this.userName, type: 'JOIN'})
      )
    },
    onError() {
      console.log('error')
    },

    // onMessageReceived
    onMessageReceived(payload) {
      let message = JSON.parse(payload.body);
      console.log(message)

      if(message.type === 'JOIN') {
        console.log('join')
        // user 정보 state 저장
        this.userInfo.name = message.sender;
        console.log(this.userInfo)
        // 채팅 화면으로 이동
        this.$router.push('/chat');

        //message.content = message.sender + ' joined!';
      }
    }
  }
}
</script>

<style>
</style>
