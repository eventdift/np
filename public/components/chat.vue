<template>
<div>
<!--chat discussions-->
<div id="overlay" v-show="chat_show" @click="chat_show=false">
<span></span>
</div>
<div id="popup" v-show="chat_show" v-on:keyup="chat_show=false">
  <div class="chat_window">
      <div class="top_menu">
          <div class="buttons">
              <div class="button close" @click="leave_chat">X</div>
          </div>
          <div class="title">Chat</div>
      </div>
      <ul class="messages">
        <div class="message_template" v-for="message in messages">
            <li class="message">
                <div class="avatar"></div>
                <div class="text_wrapper">
                    <div class="text">{{message.message}}</div>
                </div>
            </li>
        </div>
      </ul>
      <div class="bottom_wrapper clearfix">
          <div class="message_input_wrapper">
              <input v-model="message" @keyup.enter="chat(`message`)"class="message_input" placeholder="Type your message here..." />
          </div>
          <div class="send_message" @click="chat(`message`)">
              <div class="icon"></div>
              <div class="text">Send</div>
          </div>
      </div>
  </div>
      
  
      
</div>
<!--end of chat-->
</div>
</template>
<script>


export default{
  data(){
    return{
      perspective_id : '',
      messages : [],
      user_id: localStorage.getItem('id_token'),
      message: '',
      chat_show: false
    }
  },
  props:['chat_sho'],
  created(){
    console.log(this.$io.channel('chat')._io.on())
    this.$io.channel('chat')._io.on('message', (message) => {
        this.messages.push(message)
    })

  },
  methods:{
    chat(message){
      this.$io.channel('chat')._io.inRoom(this.perspective_id).emit('message', {message:message,user:this.user_id})
    },
    join_chat(perspective_id){
      this.$io.channel('chat')._io.joinRoom(this.perspective_id, {}, function (error, joined) {
          // status
      })
      this.perspective_id = perspective_id;
      this.chat_show = true;
      this.messages = [];
    },
    leave_chat(){
      this.$io.channel('chat')._io.LeaveRoom(this.perspective_id, {}, function (error, joined) {
        // status
      })
      this.chat_show = false;
    }
  }
}
</script>