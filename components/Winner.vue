<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="justify-center">
          Победил {{ winner.name }}
        </v-card-title>

        <v-card-actions>
          <v-btn block color="primary" @click="dialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      winner: '',
    }
  },
  methods: {
    show(winner) {
      this.winner = winner
      this.dialog = true
    },
  },
}
</script>
