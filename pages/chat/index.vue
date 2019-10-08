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
            <p>dd joined!</p>
          </li>
<!--          <li class="chat-message"><i style="background-color: rgb(33, 150, 243);">d</i><span>dd</span>-->
<!--            <p>안녕</p>-->
<!--          </li>-->
        </ul>

        <form id="messageForm" name="messageForm">
          <div class="form-group">
            <div class="input-group clearfix">
              <input type="text" id="message" placeholder="Type a message..." autocomplete="off" class="form-control"/>
              <button type="submit" class="primary">Send</button>
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
    methods: {

    },
    created () {
      console.log('user:'+this.$store.state.user.userInfo.name)
    }
  }
</script>

<style scoped>

</style>
