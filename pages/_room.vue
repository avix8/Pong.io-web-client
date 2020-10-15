<template>
  <div>
    <lobby :socket="socket" />
    <game :socket="socket" />
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  data() {
    return {
      socket: {},
    }
  },
  created() {
    if (process.client) {
      this.socket = io(process.env.backendURL)
      this.socket.emit('joinRoom', this.$route.params.room)
    }
  },
}
</script>
