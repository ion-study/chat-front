<template>
    <div>
        <div>
            <div class="username-page-container" id="loginbox">
                <h1 class="logo"><img src="~assets/img/man.png"></h1>
                <form id="usernameForm" name="usernameForm">
                    <div class="form-group">
                        <input type="text" id="userid" placeholder="아이디" autocomplete="off" class="form-control ipsize" />
                        <input type="password" id="userpwd" placeholder="패스워드" autocomplete="off" class="form-control ipsize" />
                    </div>

                    <div class="form-group">
                        <button type="button" class="accent2">Find ID / Password</button>
                        <button type="button" class="accent2" @click.prevent="goJoin">JOIN</button>
                        <button type="submit" class="accent username-submit" @click.prevent="goRoomList">LOGIN</button>

                    </div>


                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        component: ""
        ,data() {
            return {
                userId: '',
                userPwd:'',
            }
        },
        methods: {
            goRoomList() {
                // roomList 이동
                this.$router.push('/chat/room');
            },
            goJoin() {
                this.$router.push('/chat/join');
            }

        }
    }
</script>

<style scoped>
    #loginbox .logo{
        text-align: center;
        width: 150px;
        height: 90px;
        margin : 0 auto;
        padding: 5px 0;
        margin-bottom:30px;
        border-radius:10px;
        box-shadow:2px 2px 2px 2px #acacac;
    }
    #loginbox .logo img{
        margin-top:20px;
    }

    .form-group{
        text-align: center;
    }
    #loginbox{
        width:100%;
        max-width: 450px;
        height: 400px;
        border-radius: 10px;
        box-shadow:2px 2px 2px 2px #acacac;
    }
    .ipsize{
        margin-top:5px;
    }
    .accent2{
        margin-top:10px;
        border-radius:10px;
        background: #555555;
        color:#fff;
    }

@media screen and (max-width: 480px){
    #loginbox{
        margin:0 auto;
    }

    .username-page-container{
        top:120px;
    }
}
</style>