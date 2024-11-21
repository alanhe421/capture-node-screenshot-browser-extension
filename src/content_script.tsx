chrome.runtime.onMessage.addListener(function (
  msg: { color?: string },
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: string) => void,
) {
  if (msg.color) {
    console.log('Receive color = ' + msg.color);
    document.body.style.backgroundColor = msg.color;
    sendResponse('Change color to ' + msg.color);
  } else {
    sendResponse('Color message is none.');
  }
});

document.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.ctrlKey) {
    document.addEventListener('mouseover', addBorder);
    document.addEventListener('mouseout', removeBorderFromTarget);
    document.addEventListener('click', getNode);
  }
});

document.addEventListener('keyup', (event: KeyboardEvent) => {
  if (!event.ctrlKey) {
    document.removeEventListener('mouseover', addBorder);
    document.removeEventListener('mouseout', removeBorderFromTarget);
    document.removeEventListener('click', getNode);
    removeBorder();
  }
});

function addBorder(event: MouseEvent) {
  const target = event.target;
  if (target instanceof HTMLElement) {
    target.style.border = '2px solid red';
    target.style.boxSizing = 'border-box';
  }
}

function removeBorderFromTarget(event: MouseEvent) {
  const target = event.target;
  if (target instanceof HTMLElement) {
    target.style.border = '';
    target.style.boxSizing = 'content-box';
  }
}

function removeBorder() {
  const elements = document.querySelectorAll<HTMLElement>('*');
  elements.forEach(el => el.style.border = '');
}

function getNode(event: MouseEvent) {
  event.preventDefault();
  const target = event.target;
  console.log(target);

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    var activeTabId = activeTab.id;
    chrome.debugger.sendCommand({ tabId: activeTabId }, 'Page.captureScreenshot', {
      format: 'png',
    }, (result) => {
      console.log(result, 'result');
    });
  });

  if (target instanceof HTMLElement) {
    const rect = target.getBoundingClientRect();
    const boundingBox = {
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
      width: rect.width,
      height: rect.height,
    };

    chrome.runtime.sendMessage(
      { action: 'captureNode', boundingBox },
      (response) => {
        if (response.error) {
          console.error(response.error);
        } else {
          const img = new Image();
          img.src = response.image;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = boundingBox.width;
            canvas.height = boundingBox.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(
                img,
                boundingBox.x,
                boundingBox.y,
                boundingBox.width,
                boundingBox.height,
                0,
                0,
                boundingBox.width,
                boundingBox.height,
              );
              const croppedImage = new Image();
              croppedImage.src = canvas.toDataURL();
              croppedImage.style.position = 'fixed';
              croppedImage.style.top = '0';
              croppedImage.style.left = '0';
              croppedImage.style.zIndex = '10000';
              document.body.appendChild(croppedImage);
            }
          };
        }
      },
    );
  }
}
