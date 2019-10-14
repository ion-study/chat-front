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
            <p>{{ userName }} joined!</p>
          </li>

          <li class="chat-message" v-for="chat in chatList" :key="chat.id"><i style="background-color: rgb(33, 150, 243);">d</i><span>{{ chat.userName }}</span>
            <p>{{ chat.content }}</p>
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
          {id: 1, userName: 'a', content: 'a test'},
          {id: 2, userName: 'b', content: 'b test'},
          {id: 3, userName: 'c', content: 'c test'}
        ]
      }
    },
    // computed: {
    //   userName: function() {
    //     console.log(this.$store)
    //     return this.$store.state.user.userInfo.name
    //   }
    // },
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
      }
    },
    created() {
      console.log('created:')
      console.log(this.$store.state.user)
      this.userName = this.$store.state.user.userInfo.name
      console.log(this.userName)
    }
  }
</script>

<style scoped>
.my-chat {
  color: red;
}
.your-chat {
  color: blue;
}
</style>
