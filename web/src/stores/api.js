import { defineStore } from "pinia";
import md5 from "crypto-js/md5";

export const useApiStore = defineStore("api", {
  state: () => ({
    env: import.meta.env.VITE_META_API_ENV,
    isLive: false,
    liveRefreshInterval: 5000,
    liveConnections: {}, // {connectionUrlHash: id}
    url: import.meta.env.VITE_META_API_URL,
  }),
  getters: {
    entity: (state) => state.url + "/entity",
    entityField: (state) => state.url + "/entity/field",
    entityConstant: (state) => state.url + "/entity/constant",
    entityLineage: (state) => state.url + "/entity/lineage",
    export: (state) => state.url + "/export",
    jobFieldMap: (state) => state.url + "/job/field/map",
    job: (state) => state.url + "/job",
    run: (state) => state.url + "/job/run",
    runFlow: (state) => state.url + "/job/run/flow",
    runLog: (state) => state.url + "/job/run/log",
    jobConstant: (state) => state.url + "/job/constant",
    jobDepend: (state) => state.url + "/job/depend",
    jobDependant: (state) => state.url + "/job/dependant",
    jobNext: (state) => state.url + "/job/next",
    jobRelationship: (state) => state.url + "/job/relationship",
    jobSource: (state) => state.url + "/job/source",
    jobTarget: (state) => state.url + "/job/target",
    query: (state) => state.url + "/query",
    search: (state) => state.url + "/search",
  },
  actions: {
    storeLiveConnection(page, id) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.liveConnections.hasOwnProperty(page)) {
        this.liveConnections[page].push(id);
      } else {
        this.liveConnections[page] = [id];
      }
    },
    retrieveLiveConnection(page) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.liveConnections.hasOwnProperty(page)) {
        return this.liveConnections[page];
      } else {
        return [];
      }
    },
    getHash(value) {
      return md5(value).toString();
    },
    toggleLive() {
      this.isLive = !this.isLive;
    },
  },
});
