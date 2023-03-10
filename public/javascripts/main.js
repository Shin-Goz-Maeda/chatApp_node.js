
const socket = io();

// 共通する要素のDOMを取得
const btn = document.getElementById('button');
const chat = document.getElementById('chat');
const textarea = document.getElementById('textarea');

// どちらが送信したのか判別するための変数
let isMyself = true;


// 自分が送信する際の処理
function mySend() {
  if (textarea.value !== "") {
    // textareaに入力されたテキストを取得
    let Message = textarea.value;

    // #chatの子要素になるdiv要素を生成しクラスを付与
    const MessageBox = document.createElement('div');
    MessageBox.classList.add('MyMessageBox');

    // #chat > .MyMessageBoxの子要素になるdivを生成し、クラスを付与
    const time = document.createElement('div');
    time.classList.add('time');

    // .timeに現在の時間を表示する関数を代入
    time.textContent = showTime() + " " + "Me";

    // #chat > .MyMessageBoxの子要素になるdivを生成
    const sentMessage = document.createElement('div');

    // .MyMessageBox > sentMessageの子要素になるpタグを生成し、クラスを付与
    const myMessage = document.createElement('p');
    myMessage.classList.add('myMessage');

    // ページの最下部に画面を固定
    MessageBox.scrollIntoView(false);

    socket.emit("myMessage", Message);

    socket.on('myMessage', function(msg){
      // textareaに入力されたテキストをpタグに格納
      myMessage.textContent = msg;

      // 各要素を格納
      sentMessage.appendChild(myMessage);
      MessageBox.appendChild(time);
      MessageBox.appendChild(sentMessage);
      chat.appendChild(MessageBox);

      // 送信ボタンをクリックしたらtextareaを空にする
      textarea.value = "";

      // 交互に送信するために変数を変更
      isMyself = false;
    });

  }
}


//  相手が送信する際の処理
function otherSend() {
  if (textarea.value !== "") {
      // textareaに入力されたテキストを取得
  let Message = textarea.value;

  // #chatの子要素になるdiv要素を生成しクラスを付与
  const MessageBox = document.createElement('div');
  MessageBox.classList.add('OtherMessageBox');

  // #chat > .OtherMessageBoxの子要素になるdivを生成し、クラスを付与
  const time = document.createElement('div');
  time.classList.add('time');

  // #chat > .OtherMessageBoxの子要素になるdivを生成
  time.textContent = showTime();

  // #chat > .OtherMessageBoxの子要素になるdivを生成
  const sentMessage = document.createElement('div');

  // .otherMessageBox > sentMessageの子要素になるpタグを生成し、クラスを付与
  const otherMessage = document.createElement('p');
  otherMessage.classList.add('otherMessage');

  // ページの最下部に画面を固定
  MessageBox.scrollIntoView(false);

  socket.emit("otherMessage", Message);

  socket.on('otherMessage', function(msg){
  // textareaに入力されたテキストをpタグに格納
  otherMessage.textContent = msg;

  // 各要素を格納
  sentMessage.appendChild(otherMessage);
  MessageBox.appendChild(time);
  MessageBox.appendChild(sentMessage);
  chat.appendChild(MessageBox);

  // 送信ボタンをクリックしたらtextareaを空にする
  textarea.value = "";

  // 交互に送信するために変数を変更
  isMyself = true;
  });
  }
}


// 現在の時間を取得
function showTime() {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  return hour + ":" + minutes + " " + month + "/" + day;
}


// 送信ボタンクリック時にイベント発火
btn.addEventListener('click', function() {
  if (isMyself === true) {
    mySend();
  } else {
    otherSend();
  }
});