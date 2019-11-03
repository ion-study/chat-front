<template>
  <div>
    <div id="chat-page">
      <div class="chat-container">
        <div class="chat-header">
          <h2>[{{$route.params.id}}] Room</h2>
        </div>
        <div class="connecting hidden">
          Connecting...
        </div>
        <ul id="messageArea">
          <template v-for="chat in chatList">
            <li class="event-message" v-if="chat.type=='JOIN'">
              <p>{{ chat.userName }}님이 입장하였습니다.</p>
            </li>
            <li class="event-message" v-if="chat.type=='LEAVE'">
              <p>{{ chat.userName }}님이 나갔습니다.</p>
            </li>
            <li class="chat-message" v-if="chat.type=='CHAT'" :class="myChat(chat.sessionId)" :data-user-id="chat.sessionId">
              <i style="background-color: rgb(33, 150, 243);"></i>
              <div>
                <span>{{ chat.userName }}</span>
                <p>{{ chat.content }}</p>
              </div>
            </li>
          </template>
        </ul>

        <form id="messageForm" name="messageForm">
          <div class="form-group">
            <div class="input-group clearfix">
              <input v-model="msg" type="text" id="message" placeholder="Type a message..." autocomplete="off" class="form-control"/>
              <button type="submit" class="primary" @click.prevent="message">Send</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import SockJS from "sockjs-client";
  import Stomp from "stompjs";
  export default {
    data() {
      return {
        msg: '',
        chatList: []
      }
    },
    mounted() {
      let _vue = this;
      console.log('mounted');
      _vue.connect();
    },
    methods: {
      connect() {
        var socket = new SockJS('http://localhost:8080/ws');
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, this.onConnected, this.onError);
      },
      onConnected() {
        // Subscribe to the Public Topic
        this.stompClient.subscribe('/topic/public', this.onMessageReceived);
        // Tell your username to the server
        this.stompClient.send("/app/chat.addUser",
          {},
          JSON.stringify({sender: this.$store.state.user.userInfo.name, type: 'JOIN', roomId: this.$route.params.id})
        )
        console.log('connect 성공',this.stompClient.ws);
        // stompClient 저장
        this.$store.state.user.stompClient = this.stompClient;
      },
      onError() {
        console.log('error')
      },
      onMessageReceived(m) {
        let body = JSON.parse(m.body);
        // let msgId = m.headers['message-id'];
        switch(body.type) {
          case 'JOIN':
            // 본인이 join한 경우 세션id 등록
            if(this.$store.state.user.userInfo.name == `${body.sender}`) {
              this.$store.state.user.userInfo.sessionId = `${body.sessionId}`;
              console.log('sessionId 등록:' + this.$store.state.user.userInfo.sessionId);
            }
            // 같은 room일 경우 리스트 추가
            if(this.$route.params.id == `${body.roomId}`) {
              this.chatList.push({
                type: 'JOIN',
                id: this.chatList.length+1,
                userName: `${body.sender}`,
                sessionId: `${body.sessionId}`,
                roomId: `${body.roomId}`
              });
            }
            break;
          case 'LEAVE':
            if(this.$route.params.id == `${body.roomId}`) {
              this.chatList.push({
                type: 'LEAVE',
                id: this.chatList.length+1,
                userName: `${body.sender}`,
                sessionId: `${body.sessionId}`,
                roomId: `${body.roomId}`
              });
            }
            break;
          case 'CHAT':
            if(this.$route.params.id == `${body.roomId}`) {
              this.chatList.push({
                type: 'CHAT',
                id: this.chatList.length + 1,
                userName: `${body.sender}`,
                content: `${body.content}`,
                sessionId: `${body.sessionId}`,
                roomId: `${body.roomId}`
              });
            }
            break;
          default:
            console.log('other type');
        }
        console.log('chatList: ', this.chatList[this.chatList.length-1]);
      },
      message() {
        if(this.msg && this.$store.state.user.stompClient) {
          var chatMessage = {
            sender: this.$store.state.user.userInfo.name,
            content: this.msg,
            type: 'CHAT',
            sessionId: this.$store.state.user.userInfo.sessionId,
            roomId: this.$route.params.id
          };
          this.$store.state.user.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
          this.msg = '';
        }
      }
    },
    computed: {
      myChat() {
        return function(id) {
          if(id === this.$store.state.user.userInfo.sessionId) return { 'my-chat': true }
          else return {'my-chat': false }
        }
      }
    }
  }
</script>

<style scoped>
  .my-chat {
    display: flex;
    flex-direction: row-reverse;
    text-align: right;
  }
  .my-chat > i {
    position: initial !important;
  }
  .my-chat > div {
    margin-right: 15px;
  }
</style>
