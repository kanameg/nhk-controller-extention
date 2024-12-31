
// 上書きするキーのリスト
const TARGET_KEYS = ['ArrowLeft', 'ArrowRight', 'j', 'l', ' '];

// スペースキー用のパスパターン
const SPACE_KEY_SELECTORS = [
    "#app > div > div.main > div > main > div.stream_panel--player > div > div > div > div.player--inner.none > div > div > div.hls-player_frame > div.hls-player_autoplay_blocked > button", // 動画再生前
    "#app > div > div.main > div > main > div.stream_panel--player > div > div > div > div.player--inner.none > div > div > div.player--cover--message > div:nth-child(2) > button", // 動画終了後
    "#app > div > div.main > div > main > div.stream_panel--player > div > div > div > div.player--inner.none > div > div > div.hls-player_frame > div.hls-player_overlay > div > div:nth-child(3) > button", // 動画再生中
];

// 左矢印キー用のパスパターン 
const LEFT_ARROW_KEY_SELECTORS = ["#app > div > div.main > div > main > div.stream_panel--player > div > div > div > div.player--inner.none > div > div > div.hls-player_frame > div.hls-player_overlay > div > div:nth-child(2) > button"];

// 右矢印キー用のパスパターン
const RIGHT_ARROW_KEY_SELECTORS = ["#app > div > div.main > div > main > div.stream_panel--player > div > div > div > div.player--inner.none > div > div > div.hls-player_frame > div.hls-player_overlay > div > div:nth-child(4) > button"];


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

// keydownイベントリスナーを設定
document.addEventListener('keydown', function (event) {
    // 対象のキーでない場合は通常の動作を許可
    if (!TARGET_KEYS.includes(event.key)) {
        return true;
    }

    // デフォルトのイベントとイベントの伝播を停止
    event.preventDefault();
    event.stopPropagation();

    // 左矢印キー
    // key = "ArrowLeft";
    // path = "#app > div > div.main > div > main > div.stream_panel--player > div > div > div > div.player--inner.none > div > div > div.hls-player_frame > div.hls-player_overlay > div > div:nth-child(2) > button";
    // if (event.key === key) {
    //     console.log(`キーが押されました: ${key}`);
    //     buttonPress(key, path);
    // }

    // 右矢印キー
    // key = "ArrowRight";
    // path = "#app > div > div.main > div > main > div.stream_panel--player > div > div > div > div.player--inner.none > div > div > div.hls-player_frame > div.hls-player_overlay > div > div:nth-child(4) > button";
    // if (event.key === 'ArrowRight') {
    //     console.log(`キーが押されました: ${key}`);
    //     buttonPress(key, path);
    // }

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