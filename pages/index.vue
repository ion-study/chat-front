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
            <button type="submit" class="accent username-submit" @click.prevent="goRoomList">Start Chatting</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>


export default {

  components: {
  },
  data() {
    return {
      userName: ''
    }
  },
  methods: {
    goRoomList() {
      // username 저장
      this.$store.state.user.userInfo.name = this.userName;
      // roomList 이동
      this.$router.push('/chat/room');
    }

  }

}
</script>

<style>
</style>
