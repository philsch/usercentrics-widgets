import { widgetStore } from '../lib/WidgetStore';
import UcBridge from '../lib/UcBridge';

const DEFAULT_WIDGET_TEXT = 'This external content may collect data about your activity. ' +
  'Click the button below to show the content.';
const DEFAULT_WIDGET_ACCEPT = 'Activate';

/**
 * Base widget class
 */
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
     * Calculated dimensions of the original element
     * @type {DOMRect}
     */
    this.dimensions = this.el.getBoundingClientRect();
    /**
     * Original node width
     * @type {string|number}
     */
    this.width = this.el.getAttribute('width');
    /**
     * Original node height
     * @type {string|number}
     */
    this.height = this.el.getAttribute('height');
    /**
     * Widget configuration
     * @type {{}}
     */
    this.cfg = {
      /**
       * Usercentrics Service ID defined via data-uc-id on the widget
       * @type {string}
       */
      ucId: this.el.getAttribute('data-uc-id'),
      /**
       * Custom widget text
       * @type {string}
       */
      text: this.el.getAttribute('data-text'),
      /**
       * Custom accept label
       * @type {string}
       */
      accept: this.el.getAttribute('data-accept')
    };
  }

  /**
   * Returns the placeholder text
   *
   * @returns {string}
   */
  getEmbeddingText () {
    return this.cfg.text || DEFAULT_WIDGET_TEXT;
  }

  /**
   * Returns the accept button text
   *
   * @return {string}
   */
  getAcceptButtonLabel () {
    return this.cfg.accept || DEFAULT_WIDGET_ACCEPT;
  }

  /**
   * Template for the embedding inside the main widget container
   *
   * @returns {string}
   */
  getEmbedding () {
    return `\
<img class="uc-widget-background" src="${this.getBackground()}"/>\
<div class="uc-widget-embedding">\
  <div class="uc-widget-text">${this.getEmbeddingText()}</div>\
  <div class="uc-widget-control"><button class="uc-widget-accept">${this.getAcceptButtonLabel()}</button></div>\
</div>\
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
   *
   * @param {boolean} fromWidget Indicates if the activation happened from the current Widget
   */
  activate (fromWidget) {
    const ucId = this.cfg.ucId;

    widgetStore.unregister(ucId, this);
    widgetStore.activate(ucId);

    if (fromWidget) {
      const cmp = new UcBridge();
      cmp.setConsent(ucId);
    }
  }

  /**
   * Render logic to show the widget
   */
  render () {
    const container = document.createElement('div');

    container.innerHTML = this.getEmbedding();
    container.setAttribute('class', 'uc-widget-container');

    const width = this.width ? (isNaN(this.width) ? this.width : `${this.width}px`) : `${this.dimensions.width}px`;
    const height = this.height ? (isNaN(this.height) ? this.height : `${this.height}px`) : `${this.dimensions.height}px`;
    container.setAttribute('style', `width: ${width}; height: ${height};`);

    this.el.replaceWith(container);

    container
      .getElementsByClassName('uc-widget-accept')[0]
      .addEventListener('click', this.activate.bind(this, true));

    this.container = container;

    widgetStore.register(this.cfg.ucId, this);
  }
}

export default Base;
