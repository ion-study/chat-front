/**
 * Socket관련 util
 * 사용자 정의 util모듈을 만들 경우 이런 패턴으로 만듭니다. ~/plugin/socket.js 참고
 * 이런방식으로 모듈 만들 수 있는데 socket의 경우 이렇게 쓸지말지는 추가 논의해서 결정합시다.
 */
'use strict'
const SockJS = require("sockjs-client");
const Stomp = require("stompjs");
module.exports = {
  '$connect': function(connectHeader ,onConnected, onError, _app) {
    let socket = new SockJS(`${process.env.baseUrl}/ws`);
    _app.stompClient = Stomp.over(socket);
    _app.stompClient.connect(connectHeader, onConnected, onError);
  },
  '$disconnect':function(_app) {
    _app.stompClient.disconnect()
    console.log("stompClient disconnected");
  }
}
