function injectScript(file: string, node: string) {
  const th = document.getElementsByTagName(node)[0];
  const s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', file);
  th.appendChild(s);
}

injectScript(chrome.runtime.getURL('js/sdk.js'), 'body');
injectScript(chrome.runtime.getURL('js/html2canvas.min.js'), 'body');

