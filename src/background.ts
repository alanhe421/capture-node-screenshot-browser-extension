chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
    if (msg.action === "captureNode") {
        const { x, y, width, height } = msg.boundingBox;

        try {
            const image = await chrome.tabs.captureVisibleTab(sender.tab?.windowId, { format: "png" });
            sendResponse({ image });
        } catch (error) {
            console.error("截图失败:", error);
            sendResponse({ error: "截图失败" });
        }

        return true;
    }
});
