<template>
  <div>
    <div id="username-page">
      <div class="username-page-container">
        <h1 class="title">LOGIN</h1>
        <form id="usernameForm" name="usernameForm">
          <div class="form-group">
            <input type="email" id="id" placeholder="Email" autocomplete="off" class="form-control" v-model="userId"/>
          </div>
          <div class="form-group">
            <input type="password" id="pw" placeholder="Password" autocomplete="off" class="form-control" v-model="userPw"/>
          </div>
          <div v-show="returnMsg" class="error">
            {{ returnMsg }}
          </div>
          <div class="form-group">
            <button type="submit" class="accent username-submit" @click.prevent="login">LOGIN</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      returnMsg: null,
      userId: '',
      userPw: ''
    }
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', {
          id: this.userId,
          pw: this.userPw
        }).then(() => this.redirect())
      }catch(e) {
        this.returnMsg = e.message
      }
    },
    redirect() {
      //this.$router.push('/')
      alert('로그인 성공!')
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
