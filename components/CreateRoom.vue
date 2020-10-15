<template>
  <v-btn @click="createRoom"> Создать комнату </v-btn>
</template>

<script>
export default {
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
