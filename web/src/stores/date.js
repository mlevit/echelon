import { defineStore } from 'pinia'

export const useDateStore = defineStore('date', {
  state: () => ({
    startDate: null,
    endDate: null
  }),
  getters: {
    startTimestamp: (state) => state.startDate + ' 00:00:00',
    endTimestamp: (state) => state.endDate + ' 23:59:59',
    isReady(state) {
      return state.startDate != null && state.endDate != null
    }
  }
})
