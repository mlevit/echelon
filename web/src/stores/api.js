import { defineStore } from 'pinia'
import md5 from 'crypto-js/md5'

export const useApiStore = defineStore('api', {
  state: () => ({
    env: import.meta.env.VITE_META_API_ENV,
    isLive: false,
    liveRefreshInterval: 5000,
    liveConnections: {}, // {connectionUrlHash: id}
    url: import.meta.env.VITE_META_API_URL
  }),
  getters: {
    artefact: (state) => state.url + '/artefact',
    artefactAttribute: (state) => state.url + '/artefact/attribute',
    artefactConstant: (state) => state.url + '/artefact/constant',
    artefactLineage: (state) => state.url + '/artefact/lineage',
    processAttributeMap: (state) => state.url + '/process/attribute/map',
    process: (state) => state.url + '/process',
    processAudit: (state) => state.url + '/process/audit',
    processAuditFlow: (state) => state.url + '/process/audit/flow',
    processAuditLog: (state) => state.url + '/process/audit/log',
    processConstant: (state) => state.url + '/process/constant',
    processDepend: (state) => state.url + '/process/depend',
    processDependant: (state) => state.url + '/process/dependant',
    processRun: (state) => state.url + '/process/run',
    processSource: (state) => state.url + '/process/source',
    processTarget: (state) => state.url + '/process/target',
    query: (state) => state.url + '/query',
    search: (state) => state.url + '/search'
  },
  actions: {
    storeLiveConnection(page, id) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.liveConnections.hasOwnProperty(page)) {
        this.liveConnections[page].push(id)
      } else {
        this.liveConnections[page] = [id]
      }
    },
    retrieveLiveConnection(page) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.liveConnections.hasOwnProperty(page)) {
        return this.liveConnections[page]
      } else {
        return []
      }
    },
    getHash(value) {
      return md5(value).toString()
    },
    toggleLive() {
      this.isLive = !this.isLive
    }
  }
})
