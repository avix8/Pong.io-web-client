<template>
  <div>
    <v-snackbar
      v-for="(notification, index) in notifications"
      :key="notification.id"
      :value="notification.showing"
      :color="notification.color"
      :timeout="notification.timeout"
      :style="`top: ${index * 60}px`"
      class="notification"
      top
      @input="close(notification.id)"
    >
      {{ notification.text }}
      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="close(notification.id)">
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters({ notifications: 'notifications/notifications' }),
  },
  methods: {
    ...mapMutations({
      removeNotification: 'notifications/removeNotification',
      hideNotification: 'notifications/hideNotification',
    }),
    close(id) {
      this.hideNotification(id)
      setTimeout(() => {
        this.removeNotification(id)
      }, 150)
    },
  },
}
</script>

<style scoped>
.notification {
  z-index: 20000;
}
</style>
