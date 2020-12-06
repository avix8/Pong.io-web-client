<template>
  <div class="ScoreTable">
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Ник</th>
            <th class="text-left">Очки</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="player in players"
            :key="player.id"
            :style="{ color: player.color }"
            style="font-weight: 'bold'"
          >
            <td>{{ player.name }}</td>
            <td>{{ player.score }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  props: {
    socket: { type: Object, required: true },
  },
  data() {
    return {
      players: [],
    }
  },
  mounted() {
    this.socket.on('scoreUpdate', (players) => {
      players.forEach((p) => {
        this.players.find((x) => x.id === p.id).score = p.score
      })
      this.players.sort((a, b) => b.score - a.score)
    })
  },
  methods: {
    start(players) {
      this.players = []
      players.forEach((p) => {
        let slicedName = p.name.slice(0, 16)
        if (slicedName.length < p.name.length) slicedName += '...'

        this.players.push({
          id: p.id,
          name: slicedName,
          score: p.score,
          color: p.color,
        })
      })
    },
  },
}
</script>

<style scoped>
.ScoreTable {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10;
  opacity: 0.5;
}
</style>
