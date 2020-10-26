<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-list-item :class="{ ready }">
      <v-list-item-avatar
        :color="color"
        :style="{ boxShadow: `0px 0px 6px 3px ${color}` }"
      >
        <v-menu
          v-if="!ready"
          v-model="menu"
          right
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ on }">
            <v-icon light v-on="on"> mdi-pencil </v-icon>
          </template>
          <v-card :color="color">
            <v-card-text class="pa-1">
              <v-color-picker
                v-model="color"
                dot-size="25"
                hide-mode-switch
                hide-canvas
              />
            </v-card-text>
          </v-card>
        </v-menu>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-text-field v-model="name" :disabled="ready" clearable />
      </v-list-item-content>

      <v-list-item-action>
        <v-btn min-width="150" @click="ready = !ready">
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
        <v-list-item-avatar
          :color="player.color"
          :style="{ boxShadow: `0px 0px 6px 3px ${player.color}` }"
        />
        <v-list-item-content>{{ player.name }}</v-list-item-content>
      </v-list-item>
    </v-list>
  </v-dialog>
</template>

<script>
export default {
  props: {
    socket: { type: Object, required: true },
  },
  data() {
    return {
      dialog: true,
      players: [],
      ready: false,
      name: 'Введите имя',
      color: '#ff0000',
      menu: false,
    }
  },
  watch: {
    menu(val, prevVal) {
      if (prevVal) {
        this.socket.emit('setPlayerData', { color: this.color })
      }
    },
    name(val) {
      this.socket.emit('setPlayerData', { name: val })
    },
    ready(val) {
      this.menu = false
      this.socket.emit('setPlayerData', { ready: val })
    },
  },
  mounted() {
    this.socket.on('lobbyUpdate', (data) => {
      this.players = data
    })
  },
  methods: {
    hide() {
      this.dialog = false
    },
    show() {
      this.ready = false
      this.dialog = true
    },
  },
}
</script>

<style scoped>
.ready {
  background-color: darkgreen;
}
</style>
