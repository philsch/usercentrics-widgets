/**
 * Base widget class
 */
import UcBridge from '../lib/UcBridge';

class Base {
  /**
   * Base constructor for all widgets
   *
   * @param {Element} el
   */
  constructor (el) {
    /**
     * Original node element
     * @type {Element}
     */
    this.el = el;
    /**
     * Dimensions of the original element
     * @type {DOMRect}
     */
    this.dimensions = this.el.getBoundingClientRect();
    /**
     * Usercentrics Service ID defined via data-uc-id on the widget
     * @type {string}
     */
    this.ucId = this.el.getAttribute('data-uc-id');
  }

  /**
   * Returns the placeholder text
   *
   * @returns {string}
   */
  getEmbeddingText () {
    return 'This external content may collect data about your activity. ' +
      'Click the button below to show the content.';
  }

  /**
   * Template for the embedding inside the main widget container
   *
   * @returns {string}
   */
  getEmbedding () {
    return `
            <img class="uc-widget-background" src="${this.getBackground()}"/>
            <div class="uc-widget-embedding">
                <div class="uc-widget-text">${this.getEmbeddingText()}</div>
                <div class="uc-widget-control"><button class="uc-widget-accept">Activate</button></div>
            </div>
        `;
  }

  /**
   * Background image for the widget (default: transparent inline pixel)
   *
   * @returns {string}
   */
  getBackground () {
    return 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
  }

  /**
   * Logic for replacing the embedding with the original content
   */
  activate () {
    const cmp = new UcBridge();
    cmp.setConsent(this.ucId);
  }

  /**
   * Render logic to show the widget
   */
  render () {
  }
}

export default Base;
