<template>
  <div>
    <div id="chat-page">
      <div class="chat-container">
        <div class="chat-header">
          <h2>Spring WebSocket Chat Demo</h2>
        </div>
        <div class="connecting hidden">
          Connecting...
        </div>
        <ul id="messageArea">
          <li class="event-message">
            <p>{{ $store.state.user.userInfo.name }} joined!</p>
          </li>

          <li class="chat-message" v-for="chat in chatList" :key="chat.id" :class="myChat(chat.sessionId)" :data-user-id="chat.sessionId">
            <i style="background-color: rgb(33, 150, 243);"></i>
            <div>
              <span>{{ chat.userName }}</span>
              <p>{{ chat.content }}</p>
            </div>
          </li>
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
  export default {
    name: "index",
    data() {
      return {
        msg: '',
        chatList: [
          {id: 1, userName: 'a', content: 'a test', msgId: 'aaa', sessionId: 'aaa'},
          {id: 2, userName: 'b', content: 'b test', msgId: 'bbb', sessionId: 'bbb'},
          {id: 3, userName: 'c', content: 'c test', msgId: 'ccc', sessionId: 'ccc'}
        ]
      }
    },
    methods: {
      message() {
        if(this.msg && this.$store.state.user.stompClient) {
          var chatMessage = {
            sender: this.$store.state.user.userInfo.name,
            content: this.msg,
            type: 'CHAT'
          };
          this.$store.state.user.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
          this.msg = '';
        }
      },
      onMessageReceived2(m) {
        let body = JSON.parse(m.body);
        // let msgId = m.headers['message-id'];
        if(body.type === 'CHAT') {
          console.log("received2 sessionId", body.sessionId);
          console.log("received2 body", body);
          let chat = { id: this.chatList.length+1, userName: `${body.sender}`, content: `${body.content}`, sessionId: `${body.sessionId}` };
          console.log('chat, ', chat);
          // chatList Push
          this.chatList.push(chat)
        }else {
          console.log('body type not CHAT');
        }
      }
    },
    created() {
      console.log('created()')
      console.log('state userName: ', this.$store.state.user.userInfo.name)
      console.log('stomp: ', this.$store.state.user.stompClient)
      // 메시지 수신 리스너 등록
      this.$store.state.user.stompClient.unsubscribe('sub-0'); //기존리스너 삭제
      this.$store.state.user.stompClient.subscribe('/topic/public', this.onMessageReceived2);
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
