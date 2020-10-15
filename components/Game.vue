<template>
  <div></div>
</template>

<script>
export default {
  props: {
    socket: { type: Object, required: true },
  },
  mounted() {
    this.socket.on('gameStart', (data) => {
      console.log(data)
    })
  },
}
</script>
