export const state = () => ({
  notifications: [],
})

export const getters = {
  notifications: (state) => state.notifications,
}

export const mutations = {
  notify(state, newNotification) {
    state.notifications.push({
      text: newNotification.text,
      color: newNotification.color,
      timeout: newNotification.timeout,
      showing: true,
      id: Date.now() + state.notifications.length,
    })
  },
  hideNotification(state, id) {
    state.notifications.forEach((element) => {
      if (element.id === id) {
        element.showing = false
      }
    })
  },
  removeNotification(state, id) {
    state.notifications = state.notifications.filter((x) => {
      return x.id !== id
    })
  },
}
