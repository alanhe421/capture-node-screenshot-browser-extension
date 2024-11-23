import html2canvas from 'html2canvas';

// 示例函数：捕获指定元素的截图并发送回内容脚本
export async function captureElement(element: HTMLElement): Promise<string> {
    try {
        const canvas = await html2canvas(element);
        return canvas.toDataURL('image/png');
    } catch (error) {
        console.error('截图失败:', error);
        throw error;
    }
}

// 监听来自页面的消息
window.addEventListener('message', async (event) => {
    if (event.source !== window) return; // 只处理来自同一页面的消息
    if (event.data.type === 'CAPTURE_NODE') {
        const { elementId } = event.data;
        const targetElement = document.getElementById(elementId);
        if (targetElement) {
            const imageData = await captureElement(targetElement);
            // 将截图发送回内容脚本
            window.postMessage({ type: 'CAPTURED_IMAGE', imageData }, '*');
        }
    }
});
