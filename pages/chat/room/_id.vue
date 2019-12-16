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
  export default {
    data() {
      return {
        msg: '',
        chatList: [],
        roomId : this.$route.params.id
      }
    },
    beforeCreate() {
      console.log("beforeCreate()");
      if(!this.$store.state.user.userInfo.name) {
        console.log("here");
        this.$router.push('/');
      }
    },
    mounted() {
      this.$ws.$connect({},this.onConnected, this.onError, this);
    },
    beforeRouteLeave (to, from, next) { // 현재 페이지 나가기 전 실행
      if(this.$store.state.user.userInfo.name) { // beforeCreate() 훅 때문에 분기처리 필요
        this.disconnect();
        next();
      }
      next();
    },
    methods: {
      onConnected() {
        // roomId 구독
        this.stompClient.subscribe(`/topic/public/room/${this.roomId}`, this.onMessageReceived);
        // Tell your username to the server
        this.stompClient.send("/app/chat.addUser",
          {},
          JSON.stringify({sender: this.$store.state.user.userInfo.name, type: 'JOIN', roomId: this.$route.params.id})
        )
        console.log('connect 성공',this.stompClient.ws);
      },
      disconnect() {
        // stompClient disconnect
        if(this.stompClient != null) {
          this.stompClient.disconnect();
          console.log("stompClient disconnected");
        }
        // this.$ws.$disconnect(this)
        // user state reset
        this.$store.state.user.userInfo.name = "";
        this.$store.state.user.userInfo.sessionId = "";
        console.log("userinfo reset");
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
            this.chatList.push({
              type: 'JOIN',
              id: this.chatList.length++,
              userName: `${body.sender}`,
              sessionId: `${body.sessionId}`,
              roomId: `${body.roomId}`
            });
            break;
          case 'LEAVE':
            this.chatList.push({
              type: 'LEAVE',
              id: this.chatList.length++,
              userName: `${body.sender}`,
              sessionId: `${body.sessionId}`,
              roomId: `${body.roomId}`
            });
            break;
          case 'CHAT':
            this.chatList.push({
              type: 'CHAT',
              id: this.chatList.length++,
              userName: `${body.sender}`,
              content: `${body.content}`,
              sessionId: `${body.sessionId}`,
              roomId: `${body.roomId}`
            });
            break;
          default:
            console.log('other type');
        }
        console.log('chatList: ', this.chatList[this.chatList.length-1]);
      },
      message() {
        let stompClient = this.stompClient;
        if(this.msg && stompClient) {
          var chatMessage = {
            sender: this.$store.state.user.userInfo.name,
            content: this.msg,
            type: 'CHAT',
            sessionId: this.$store.state.user.userInfo.sessionId,
            roomId: this.roomId
          };
          stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
          this.msg = '';
        }
      },
      /******** css ********/
      myChat(id) {
        if(id === this.$store.state.user.userInfo.sessionId) return { 'my-chat': true }
        else return {'my-chat': false }
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
