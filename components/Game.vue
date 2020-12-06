<template>
  <div v-show="game.running">
    <canvas id="viewport"></canvas>
    <score-table ref="scoreTable" :socket="socket" />
  </div>
</template>

<script>
import Game from '@/js/game'

export default {
  props: {
    socket: { type: Object, required: true },
  },
  data() {
    return {
      game: {},
    }
  },
  mounted() {
    this.game = new Game(document.getElementById('viewport'), this.socket)
    this.socket.on('worldUpdate', (data) => {
      this.game.worldUpdate(data)
    })
  },
  methods: {
    start(data) {
      this.game.start(data)
      this.$refs.scoreTable.start(data.players)
    },
    finish() {
      this.game.finish()
    },
  },
}
</script>

<style scoped>
canvas {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
