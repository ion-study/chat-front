<template>
  <div>redirect => '/'</div>
</template>

<script>
  export default {
    name: "chatIndex",
    beforeCreate() {
      console.log('beforeCreate')
      if(!this.$store.state.user.userInfo.name) {
        this.$router.push('/');
      }
    }
  }
</script>

<style scoped>

</style>
