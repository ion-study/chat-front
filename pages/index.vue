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
  import Stomp from "webstomp-client";

  export default {

  components: {
  },
  data() {
    return {
      userName: '',
      stompClient: null
    }
  },
  methods: {
    connect() {
      if(this.userName) {
        var socket = new SockJS('http://localhost:8080/ws');
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, this.onConnected, this.onError);
      }
    },
    onConnected() {
      // Subscribe to the Public Topic
     // this.stompClient.subscribe('/topic/public', onMessageReceived);

      // Tell your username to the server
      this.stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender: this.userName, type: 'JOIN'})
      )
      console.log('connect 성공')
    },
    onError() {
      console.log('error')
    }
  }
}
</script>

<style>
</style>
