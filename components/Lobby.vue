<template>
  <v-row align="center" justify="center">
    <v-col cols="12">
      <v-card class="mx-auto" max-width="500">
        <v-list-item :class="{ ready }">
          <v-list-item-avatar :color="color">
            <v-menu
              v-if="!ready"
              v-model="menu"
              right
              :close-on-content-click="false"
            >
              <template v-slot:activator="{ on }">
                <v-icon light v-on="on"> mdi-pencil </v-icon>
              </template>
              <v-card>
                <v-card-text class="pa-0">
                  <v-color-picker v-model="color" dot-size="25" hide-inputs />
                </v-card-text>
              </v-card>
            </v-menu>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-text-field v-model="name" :disabled="ready" />
          </v-list-item-content>

          <v-list-item-action>
            <v-btn @click="ready = !ready">
              {{ ready ? 'Не' : '' }} Готов</v-btn
            >
          </v-list-item-action>
        </v-list-item>

        <v-divider></v-divider>
        <v-list>
          <v-list-item
            v-for="player in players.filter((x) => x.id != socket.id)"
            :key="player.id"
            :class="{ ready: player.ready }"
          >
            <v-list-item-avatar :color="player.color" />
            <v-list-item-content>{{ player.name }}</v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    socket: { type: Object, required: true },
  },
  data() {
    return {
      players: [],
      ready: false,
      name: 'Player',
      color: '#ffffff',
      menu: false,
    }
  },
  watch: {
    menu(val) {
      this.socket.emit('setPlayerData', { color: this.color })
    },
    name(val) {
      this.socket.emit('setPlayerData', { name: val })
    },
    ready(val) {
      this.socket.emit('setPlayerData', { ready: val })
    },
  },
  mounted() {
    this.socket.on('setPlayers', (data) => {
      this.players = data
    })
  },
}
</script>

<style scoped>
.ready {
  background-color: darkgreen;
}
</style>
