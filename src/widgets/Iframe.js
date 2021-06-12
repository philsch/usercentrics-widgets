import Base from './Base';

class Iframe extends Base {
  activate () {
    super.activate();

    const el = this.el;
    if (el) {
      const dataSrc = el.getAttribute('data-src');
      el.setAttribute('data-src', null);

      this.container.parentElement.replaceChild(el, this.container);
      window.setTimeout(() => {
        el.setAttribute('src', dataSrc);
      }, 0);
    }
  }

  render () {
    const container = document.createElement('div');

    container.innerHTML = this.getEmbedding();
    container.setAttribute('class', 'uc-widget-container');

    this.el.replaceWith(container);

    container
      .getElementsByClassName('uc-widget-accept')[0]
      .addEventListener('click', this.activate.bind(this));

    this.container = container;

    // const container = document.createElement('iframe');
    // this.el.replaceWith(container);
    //
    // container.contentWindow.document.open();
    // container.contentWindow.document.write(`<body>${this.getEmbedding()}</body>`);
    // container.contentWindow.document.close();
    //
    // container.setAttribute('class', 'uc-widget');
    // container.setAttribute('style', `width: ${this.dimensions.width}px; height: ${this.dimensions.height}px`);
    //
    // container.contentWindow.document
    //     .getElementsByClassName('uc-widget-accept')[0]
    //     .addEventListener('click', this.activate.bind(this));
    //
    // this.container = container;
  }
}

export default Iframe;
