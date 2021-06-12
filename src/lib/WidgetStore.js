import UcBridge from './UcBridge';

class WidgetStore {
  constructor () {
    this.store = {};
  }

  /**
   * Register a widget into the store
   *
   * @param {string} ucId Usercentrics Service ID
   * @param {Base} widget Widget instance
   */
  register (ucId, widget) {
    if (!this.store[ucId]) {
      this.store[ucId] = [];
    }
    this.store[ucId].push(widget);
  }

  /**
   * Remove the given widget instance
   *
   * @param {string} ucId Usercentrics Service ID
   * @param {Base} widget Widget instance
   */
  unregister (ucId, widget) {
    const widgets = this.store[ucId];

    if (widgets) {
      for (let i = 0; i < widgets.length; i++) {
        if (widgets[i] === widget) {
          delete widgets[i];
          break;
        }
      }
    }
  }

  /**
   * Remove all widget references from the store
   *
   * @param {string} ucId Usercentrics Service ID
   */
  unregisterAll (ucId) {
    this.store[ucId] = [];
  }

  /**
   * Triggers activation of all widgets for the given Service ID and removed them
   * from the store
   *
   * @param {string} ucId Usercentrics Service ID
   */
  activate (ucId) {
    console.log('activate called');
    const widgets = this.store[ucId];

    if (widgets) {
      for (let i = 0; i < widgets.length; i++) {
        widgets[i] && widgets[i].activate(false);
      }
    }

    this.unregisterAll(ucId);
  }

  /**
   * Link CMP to all registered widgets to react on consents coming from the CMP itself
   */
  linkCmp () {
    const cmp = new UcBridge();

    for (const ucId of Object.keys(this.store)) {
      cmp.waitForCmpConsent(ucId, () => this.activate(ucId));
    }
  }
}

const widgetStore = new WidgetStore();
export { widgetStore };