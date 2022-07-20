const wsConnection = new WebSocket("wss://data.cntry.io/websocket");
wsConnection.onopen = function() {
    console.log("Socket connected");
};

wsConnection.onclose = function(event) {
    console.log('Socket disconnected. Code: ' + event.code + ' reason: ' + event.reason);
};

wsConnection.onerror = function(error) {
  console.error("Error " + error.message);
};

const sendMessage = (pairName, id) => {
    if(!wsConnection.readyState){
        setTimeout(function (){
            sendMessage(pairName);
        },100);
    } else {
        wsConnection.send(JSON.stringify({ event: "orderbook", payload: { name: pairName }, id}));
    }
}

export const close = (id) => {
    if(!wsConnection.readyState){
        setTimeout(function (){
            sendMessage(id);
        },100);
    } else {
        wsConnection.send(JSON.stringify({ event: "close", id}));
    }
}

export const subscribeSocket = (name, id, socketIdCb, IdCb, dataCb) => {
  sendMessage(name, id)
  wsConnection.onmessage = (event) => {
    if (!event) return
    const data = JSON.parse(event.data)
    if (data.type === 'id') {
      socketIdCb(data.id)
    } else {
      dataCb(data)
      IdCb(data.id)
    }
  }
}