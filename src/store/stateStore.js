import { defineStore } from 'pinia';

export const useStateStore = defineStore('state', {
  state: () => ({
    popupFlag: false,
    popupReport: '',
    isLoading: false,
  }),
  actions: {
    setLoading(flag) {
      this.isLoading = flag;
    },
    openPopup() {
      this.popupFlag = false;
      setTimeout(() => {
        this.popupFlag = true;
      }, 250);
    },
    setPopupReportIndex(index) {
      this.popupReport = index;
    },
  },
});
