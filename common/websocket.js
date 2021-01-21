
let websocket, lockReconnect = false;
let backInfo = "123";
let success = false
let createWebSocket = (Url, me) => {
	//PC
  //   websocket = new WebSocket(url);
  //   websocket.onopen = function () {
  //      // heartCheck.reset();
	 //   uni.showToast({
	 //   	title:"连接成功"
	 //   })
  //   }
  //   websocket.onerror = function () {
  //       reconnect(url);
  //   };
  //   websocket.onclose = function (e) {
  //       console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
  //   }
  //   websocket.onmessage = function (event) {
  //       backInfo = event.data;
  //       // console.log(event.data);
  //       lockReconnect=true;
		// me.backInfo = event.data;
  //       //event 为服务端传输的消息，在这里可以处理
		// /* uni.$emit('back',{'info':backInfo}) */
  //   }
	
	//mobile
	websocket = uni.connectSocket({
		url:Url
	})
	uni.onSocketOpen(function(){
		uni.showToast({
			title:"连接成功"
		})
		me.success = true
	})
	uni.onSocketError(function(){
		reconnect(Url);
	})
	uni.onSocketClose(function(){
		console.log('websocket 断开 ')
		me.success = false
	})
	uni.onSocketMessage(function(event){
		backInfo = event.data;
		lockReconnect=true;
		me.backInfo = event.data;
	})
}


let reconnect = (url) => {
    if (lockReconnect) return;
    //没连接上会一直重连，设置延迟避免请求过多
    setTimeout(function () {
        createWebSocket(url);
        lockReconnect = false;
    }, 4000);
}

let heartCheck = {
    timeout: 60000, //60秒
    timeoutObj: null,
    reset: function () {
        clearInterval(this.timeoutObj);
        return this;
    },
    start: function () {
        this.timeoutObj = setInterval(function () {
            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            //onmessage拿到返回的心跳就说明连接正常
            websocket.send("HeartBeat");
        }, this.timeout)
    }
}
//关闭连接
let closeWebSocket=()=> {
	//PC
    // websocket && websocket.close();
	
	//mobile
	uni.closeSocket(function(){
		console.log('WebSocket 已关闭！');
	})
}

export {
    websocket,
    backInfo,
    createWebSocket,
    closeWebSocket,
	success
};
