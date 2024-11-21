chrome.runtime.onMessage.addListener(function (
  msg: { color?: string },
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: string) => void
) {
  if (msg.color) {
    console.log("Receive color = " + msg.color);
    document.body.style.backgroundColor = msg.color;
    sendResponse("Change color to " + msg.color);
  } else {
    sendResponse("Color message is none.");
  }
});

document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.ctrlKey) {
        document.addEventListener('mouseover', addBorder);
        document.addEventListener('click', getNode);
    }
});

document.addEventListener('keyup', (event: KeyboardEvent) => {
    if (!event.ctrlKey) {
        document.removeEventListener('mouseover', addBorder);
        document.removeEventListener('click', getNode);
        removeBorder();
    }
});

function addBorder(event: MouseEvent) {
    const target = event.target;
    if (target instanceof HTMLElement) {
        target.style.border = '2px solid red';
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
}
