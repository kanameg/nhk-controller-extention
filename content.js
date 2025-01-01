
// 上書きするキーのリスト
const TARGET_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '];

// グローバル変数として定義
let SPACE_KEY_SELECTORS = [];
let LEFT_ARROW_KEY_SELECTORS = [];
let RIGHT_ARROW_KEY_SELECTORS = [];

// 設定ファイルを読み込む
fetch(chrome.runtime.getURL('selectors.json'))
    .then(response => response.json())
    .then(config => {
        SPACE_KEY_SELECTORS = config.SPACE_KEY_SELECTORS;
        LEFT_ARROW_KEY_SELECTORS = config.LEFT_ARROW_KEY_SELECTORS;
        RIGHT_ARROW_KEY_SELECTORS = config.RIGHT_ARROW_KEY_SELECTORS;
        console.log('セレクタ設定ファイルを読み込みました');
    })
    .catch(error => console.error('設定ファイルの読み込みエラー:', error));


// selectorで指定されたbuttonをクリックする
function buttonPress(selector) {
    try {
        const btn = document.querySelector(selector);
        if (btn) {
            console.log('セレクタ:', selector);
            console.log('要素:', btn);
            btn.click();
            return true;
        } else {
            // console.log('要素が見つかりませんでした');
            return false;
        }
    } catch (error) {
        console.error('エラーが発生しました:', error);
        return false; // エラー時はfalseを返す
    }
}

// 音量設定関数
function changeVolume(up) {
    try {
        const videoElement = document.querySelector('video');
        if (videoElement) {
            volume = videoElement.volume + up;
            // 音量の範囲を0から1に制限
            if (volume > 1) {
                volume = 1;
            } else if (volume < 0) {
                volume = 0;
            } else {
                // 小数点第2位で四捨五入
                volume = Math.round(volume * 100) / 100;
            }
            videoElement.volume = volume;
            console.log(`音量が設定されました: ${volume}`);
        } else {
            console.log('ビデオ要素が見つかりませんでした');
        }
    } catch (error) {
        console.error('音量設定中にエラーが発生しました:', error);
    }
}

// keydownイベントリスナーを設定
document.addEventListener('keydown', function (event) {
    // 対象のキーでない場合は通常の動作を許可
    if (!TARGET_KEYS.includes(event.key)) {
        return true;
    }

    // デフォルトのイベントとイベントの伝播を停止
    event.preventDefault();
    event.stopPropagation();

    // キーに対応するボタンをクリック

    // up arrow キー
    key = 'ArrowUp';
    if (event.key === key) {
        console.log(`キーが押されました: ${key}`);
        changeVolume(0.1);
    }

    // down arrow キー
    key = 'ArrowDown';
    if (event.key === key) {
        console.log(`キーが押されました: ${key}`);
        changeVolume(-0.1);
    }

    // left arrow キー
    key = 'ArrowLeft';
    if (event.key === key) {
        console.log(`キーが押されました: ${key}`);
        for (const selector of LEFT_ARROW_KEY_SELECTORS) {
            if (buttonPress(selector)) {
                break;
            }
        }
    }

    // right arrow キー
    key = 'ArrowRight';
    if (event.key === key) {
        console.log(`キーが押されました: ${key}`);
        for (const selector of RIGHT_ARROW_KEY_SELECTORS) {
            if (buttonPress(selector)) {
                break;
            }
        }
    }

    // spaceキー
    key = ' ';
    if (event.key === key) {
        console.log(`キーが押されました: ${key}`);
        for (const selector of SPACE_KEY_SELECTORS) {
            if (buttonPress(selector)) {
                break;
            }
        }
    }
});

// デバッグ用：拡張機能が正常に読み込まれたことを確認
console.log('キーボードイベントリスナーが設定されました');


// 操作方法
// --------------------------------
// 動作再生中
// ArrowLeft: 10秒戻る
// j: 10秒戻る
// ArrowRight: 30秒進む
// l: 30秒進む
// space: 再生/一時停止
// --------------------------------

// 動画開始前
// --------------------------------
// space: 再生開始
// --------------------------------

// 動画終了時
// --------------------------------
// space: もう一度再生
// --------------------------------