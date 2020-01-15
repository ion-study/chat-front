t<template>
    <div class="username-page-container">
        <div class="join-wrap">
            <div class="join-header">
                <h2>회원가입</h2>
            </div>
<!--        <div class="join-section">-->
<!--                <table>-->
<!--                    <tr>-->
<!--                        <td class="thead">이름</td>-->
<!--                        <td>-->
<!--                            <input type="text" value="">-->
<!--                        </td>-->
<!--                    </tr>-->
<!--                    <tr>-->
<!--                        <td class="thead">패스워드</td>-->
<!--                        <td>4</td>-->
<!--                    </tr>-->
<!--                </table>-->
<!--        </div>-->

            <form id="usernameForm" name="usernameForm">
                <div class="join-bottom form-group">
                    <div class="form-box">

                    </div>
                    <button type="submit" class="accent">JOIN</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
    .join-section{
        width:100%;
        margin:0 auto;
    }
    .join-section table{
        border:1px solid #acacac;
        width:100%;
        max-width: 390px;
        margin:0 auto;
        margin-bottom:20px;
        border-collapse: collapse;
    }
    table tr td{
        border:1px solid #000000;
    }
    .thead{
        width:30%;
        background: #acacac;
    }
</style>