<template>
  <div v-show="game.running">
    <canvas id="viewport"></canvas>
    <div style="position: fixed; top: 60px; color: white">
      <label id="fps">0</label>
    </div>
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
    this.game = new Game(document.getElementById('viewport'))
    // this.game.setTestScene()
    this.socket.on('worldUpdate', (data) => {
      this.game.worldUpdate(data)
    })
  },
  methods: {
    start(data) {
      this.game.start(data)
      this.game.setScene(data)
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
