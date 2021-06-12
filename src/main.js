import WidgetFactory from './WidgetFactory';

const WIDGET_CLASS = 'uc-widget';

function init () {
  const elements = document.getElementsByClassName(WIDGET_CLASS);
  for (const el of elements) {
    console.debug(el);
    const widget = WidgetFactory.create(el);
    widget.render();
  }
}

init();
