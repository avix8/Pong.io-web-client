<template>
  <div>
    <label id="ping" style="position: fixed; z-index: 10 !important">
      ping: {{ ping }} ms
    </label>
    <lobby ref="lobby" :socket="socket" />
    <game ref="game" :socket="socket" />
    <winner ref="winner" />
    <notifications />
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      socket: {},
      ping: 0,
    }
  },
  created() {
    if (process.client) {
      this.socket = io(process.env.backendURL)
      this.socket.emit('joinRoom', this.$route.params.room)

      this.socket.on('msg', (msg) => {
        this.notify({ text: msg, color: 'info' })
      })

      this.socket.on('gameStart', (data) => {
        this.$refs.game.start(data)
        this.$refs.lobby.hide()
      })

      this.socket.on('gameFinish', (data) => {
        this.$refs.game.finish()
        this.$refs.lobby.show()
        this.$refs.winner.show(data.winner)
      })

      this.socket.on('pong_', (time) => {
        this.ping = Date.now() - time
      })
      setInterval(() => {
        this.socket.emit('ping_', Date.now())
      }, 1000)
    }
  },
  methods: {
    ...mapMutations({
      notify: 'notifications/notify',
    }),
  },
}
</script>
