!function(){"use strict";class t{waitForCmp(t){window.UC_UI&&window.UC_UI.isInitialized()?t():window.addEventListener("UC_UI_INITIALIZED",(function(e){t()}))}waitForCmpConsent(t,e){this.waitForCmp((()=>{!0===this.getConsent(t)&&e()}))}isCmpReady(){return window.UC_UI&&window.UC_UI.isInitialized()}setConsent(t){if(!this.isCmpReady())throw new Error("Usercentrics CMP is not ready!");window.UC_UI.acceptService(t)}getConsent(t){try{const e=window.UC_UI.getServicesBaseInfo();for(let i=0;i<e.length;i++)if(e[i].id===t)return!!e[i].consent.status;return!1}catch(t){return!1}}}const e=new class{constructor(){this.store={}}register(t,e){this.store[t]||(this.store[t]=[]),this.store[t].push(e)}unregister(t,e){const i=this.store[t];if(i)for(let t=0;t<i.length;t++)if(i[t]===e){delete i[t];break}}unregisterAll(t){this.store[t]=[]}activate(t){const e=this.store[t];if(e)for(let t=0;t<e.length;t++)e[t]&&e[t].activate(!1);this.unregisterAll(t)}linkCmp(){const e=new t;for(const t of Object.keys(this.store))e.waitForCmpConsent(t,(()=>this.activate(t)));window.addEventListener("UC_UI_VIEW_CHANGED",(t=>{if(!t.detail||"NONE"!==t.detail.previousView&&"PRIVACY_BUTTON"!==t.detail.previousView)for(const t of Object.keys(this.store))e.waitForCmpConsent(t,(()=>this.activate(t)))}))}};class i extends class{constructor(t){this.el=t,this.dimensions=this.el.getBoundingClientRect(),this.width=this.el.getAttribute("width"),this.height=this.el.getAttribute("height"),this.ucId=this.el.getAttribute("data-uc-id")}getEmbeddingText(){return"This external content may collect data about your activity. Click the button below to show the content."}getEmbedding(){return`\n            <img class="uc-widget-background" src="${this.getBackground()}"/>\n            <div class="uc-widget-embedding">\n                <div class="uc-widget-text">${this.getEmbeddingText()}</div>\n                <div class="uc-widget-control"><button class="uc-widget-accept">Activate</button></div>\n            </div>\n        `}getBackground(){return"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="}activate(i){if(e.unregister(this.ucId,this),e.activate(this.ucId),i){(new t).setConsent(this.ucId)}}render(){const t=document.createElement("div");t.innerHTML=this.getEmbedding(),t.setAttribute("class","uc-widget-container");const i=this.width?isNaN(this.width)?this.width:`${this.width}px`:`${this.dimensions.width}px`,s=this.height?isNaN(this.height)?this.height:`${this.height}px`:`${this.dimensions.height}px`;t.setAttribute("style",`width: ${i}; height: ${s};`),this.el.replaceWith(t),t.getElementsByClassName("uc-widget-accept")[0].addEventListener("click",this.activate.bind(this,!0)),this.container=t,e.register(this.ucId,this)}}{activate(t){super.activate(t);const e=this.el;if(e){const t=e.getAttribute("data-src");e.setAttribute("data-src",null),this.container.parentElement.replaceChild(e,this.container),window.setTimeout((()=>{e.setAttribute("src",t)}),0)}}}class s{constructor(t){this.url=t;const e=t.split("/");this._protocol=e.shift(),e.shift(),this._host=e.shift();const i=e.join("/").split(/[?#]/);this._pathname=i[0]}get host(){return this._host}get protocol(){return this._protocol}get pathname(){return this._pathname}}class n extends i{getBackground(){const t=this.el.getAttribute("data-src");if(!t)return super.getBackground();try{const e=new s(t);return`https://privacy-proxy-server.usercentrics.eu/video/youtube/${e.pathname.split("/").pop()}-poster-image`}catch(t){return super.getBackground()}}}class r{static create(t){try{const e=new s(t.getAttribute("data-src")).host;t.tagName.toLowerCase();return/\.youtube(-nocookie)\./.test(e)?new n(t):new i(t)}catch(e){return new i(t)}}}function o(){if("complete"!==document.readyState)return;document.removeEventListener("readystatechange",o);const t=(i=document.getElementsByClassName("uc-widget"),Array.prototype.slice.call(i));var i;for(const e of t){r.create(e).render()}e.linkCmp()}"complete"===document.readyState?o():document.addEventListener("readystatechange",o)}();
