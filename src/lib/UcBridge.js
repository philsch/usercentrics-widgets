class UcBridge {
  /**
   * Wait for Usercentrics CMP to be ready
   *
   * @param {function} callback
   */
  waitForReady (callback) {
    if (window.UC_UI && window.UC_UI.isInitialized()) {
      callback();
    } else {
      window.addEventListener('UC_UI_INITIALIZED', function (e) {
        callback();
      });
    }
  }

  /**
   * Indicates the Usercentrics CMP is ready
   *
   * @return {boolean}
   */
  isReady () {
    return window.UC_UI && window.UC_UI.isInitialized();
  }

  /**
   * Signals the Ucercentrics CMP that a consent was given via widget
   *
   * @param {string} ucId Usercentrics Service ID
   */
  setConsent (ucId) {
    if (!this.isReady()) {
      throw new Error('Usercentrics CMP is not ready!');
    }
    window.UC_UI.acceptService(ucId); // TODO: promise (also in IE11!)
  }

  /**
   * Retrieves the current stored consent decision from the Usercentrics CMP
   *
   * @param {string} ucId
   * @return {boolean}
   */
  getConsent (ucId) {

  }
}

export default UcBridge;
