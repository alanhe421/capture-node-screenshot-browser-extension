import React, { useCallback, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

const Popup = () => {
  const [currentURL, setCurrentURL] = useState<string>();

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url);
    });
  }, []);

  return (
    <div style={{
      width: 300,
      height: 100,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}>
      <div>
        Current URL: {currentURL}
      </div>
      <div>
        <label>
          Click Behavior:
          <select defaultValue={'download'} onChange={(_) => {

          }}>
            <option value={'download'}>Download</option>
            <option value={'copy_to_clipboard'}>Copy to Clipboard</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Modifier Key:
          <select defaultValue={'alt'} onChange={(_) => {

          }}>
            <option value={'alt'}>Alt/Option</option>
            <option value={'ctrl'}>Ctrl</option>
            <option value={''}>Off</option>
          </select>
        </label>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Popup/>
  </React.StrictMode>,
);
