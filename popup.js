document.addEventListener('DOMContentLoaded', () => {
    const enableShortcuts = document.getElementById('enableShortcuts');
    const versionSpan = document.getElementById('version');

    // バージョン表示（同期的に取得）
    try {
        const manifest = chrome.runtime.getManifest();
        versionSpan.textContent = manifest.version;
    } catch (error) {
        console.error('マニフェスト読み込みエラー:', error);
        versionSpan.textContent = 'エラー';
    }

    // 設定の読み込み
    chrome.storage.sync.get(['enableShortcuts'], (result) => {
        enableShortcuts.checked = result.enableShortcuts ?? true;
    });

    // 設定の保存
    enableShortcuts.addEventListener('change', () => {
        chrome.storage.sync.set({
            enableShortcuts: enableShortcuts.checked
        });
    });
});