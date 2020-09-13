let nextId = 1;

const notification = {
  namespaced: true,
  state: {
    notifications: [],
  },
  mutations: {
    PUSH(state, notificationToAdd) {
      state.notifications.push({
        ...notificationToAdd,
        id: nextId += 1,
      });
    },
    DELETE(state, notificationToRemove) {
      state.notifications = state.notifications.filter(
        (note) => note.id !== notificationToRemove.id,
      );
    },
  },
  actions: {
    add({ commit }, payload) {
      commit('PUSH', payload);
    },
    remove({ commit }, payload) {
      commit('DELETE', payload);
    },
  },
};

export default notification;
