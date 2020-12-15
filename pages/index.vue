<template>
  <v-app>
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-card width="400">
          <v-card-title class="justify-center text-h3"> Pong.io </v-card-title>
          <v-card-text>
            Многопользовательская игра, в которой игроки располагаются по кругу
            и отбивают мячи. Побеждает игрок набравший 100 очков. Колчество
            игроков не менее трёх.
          </v-card-text>
          <v-card-actions>
            <v-btn block @click="createRoom">Создать комнату</v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  methods: {
    createRoom() {
      this.$router.push({
        path:
          '/' +
          Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(36) +
          Date.now().toString(36),
      })
    },
  },
}
</script>
