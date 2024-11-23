(function () {
  let isAltPressed = false;
  let hoverElement = null;

  const handleKeyDown = (event) => {
    if (event.key === 'Alt') {
      isAltPressed = true;
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Alt') {
      isAltPressed = false;
    }
  };

  // 监听鼠标点击事件
  const handleClick = (event) => {
    if (isAltPressed && event.button === 0) { // 按下 Option 键并左键点击
      event.preventDefault();
      const targetElement = event.target;
      if (targetElement) {
        console.log('targetElement:', targetElement);
        // @ts-ignore
        html2canvas(targetElement).then((canvas) => {
          const url = canvas.toDataURL('image/png');
          const a = document.createElement('a');
          a.href = url;
          a.download = `${location.hostname}_screenshot.png`;
          a.click();
        });
      }
    }
  };


  // 监听鼠标移动事件，添加样式到聚焦元素
  const handleMouseMove = (event) => {
    if (hoverElement) {
      hoverElement.style.outline = '';
      hoverElement = null;
    }

    if (isAltPressed && event.target instanceof HTMLElement) {
      hoverElement = event.target;
      hoverElement.style.outline = '2px solid rgba(0, 128, 255, 0.7)'; // 添加样式，但不改变宽高
    }
  };

  // 添加事件监听器
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
  document.addEventListener('click', handleClick);
  document.addEventListener('mousemove', handleMouseMove);


  window.addEventListener('unload', () => {
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('keyup', handleKeyUp);
    document.removeEventListener('click', handleClick);
  });
})();
