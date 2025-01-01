/** @type {string} 作成者 */
const AUTHER = 'kaname.g@gmail.com';

/**
 * NHK+コントローラー拡張機能 - content.js
 * 
 * NHK+のビデオプレーヤーにキーボードショートカットを追加するChrome拡張機能
 * 
 * @author {AUTHER}
 */

// 上書きするキーのリスト
const TARGET_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'w', 'f'];

// 各ボタンのセレクタ
const PAUSE_SELECTOR = "#app > div > div.main > div > main > div.stream_panel--player > div > div > div > div.player--inner.none > div > div > div.hls-player_frame > div.hls-player_autoplay_blocked > button";
const RESUME_SELECTOR = "#app > div > div.main > div > main > div.stream_panel--player > div > div > div > div.player--inner.none > div > div > div.hls-player_frame > div.hls-player_autoplay_blocked > button";
const PLAY_SELECTOR = "#app > div > div.main > div > main > div.stream_panel--player > div > div > div > div.player--inner.none > div > div > div.player--cover--message > div:nth-child(2) > button";
const REPLAY_SELECTOR = "#app > div > div.main > div > main > div.stream_panel--player > div > div > div > div.player--inner.none > div > div > div.hls-player_frame > div.hls-player_overlay > div > div:nth-child(3) > button";
const REW10_SELECTOR = "#app > div > div.main > div > main > div.stream_panel--player > div > div > div > div.player--inner.none > div > div > div.hls-player_frame > div.hls-player_overlay > div > div:nth-child(2) > button";
const FF30_SELECTOR = "#app > div > div.main > div > main > div.stream_panel--player > div > div > div > div.player--inner.none > div > div > div.hls-player_frame > div.hls-player_overlay > div > div:nth-child(4) > button";
const WEB_FULL_SCREEN_SELECTOR = "#app > div > div.main > div > main > div.stream_panel--player > div > div > div > div.player--inner.none > div > div > div.hls-player_frame > div.hls-player_controller > div > div > div.controls--row.-seekbar > div:nth-child(2) > div:nth-child(5) > button";
const FULL_SCREEN_SELECTOR = "#app > div > div.main > div > main > div.stream_panel--player > div > div > div > div.player--inner.none > div > div > div.hls-player_frame > div.hls-player_controller > div > div > div.controls--row.-seekbar > div:nth-child(2) > div:nth-child(6) > button";


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

    // 各キーに対応した処理を分岐
    // 音量アップ [VOL_UP]
    key = 'ArrowUp';
    if (event.key === key) {
        console.log(`キーが押されました: ${key}`);
        changeVolume(0.1);
    }

    // 音量ダウン [VOL_DOWN]
    key = 'ArrowDown';
    if (event.key === key) {
        console.log(`キーが押されました: ${key}`);
        changeVolume(-0.1);
    }

    // 10秒戻る [REW10]
    key = 'ArrowLeft';
    if (event.key === key) {
        console.log(`キーが押されました: ${key}`);
        buttonPress(REW10_SELECTOR);
    }

    // 30秒進む [FF30]
    key = 'ArrowRight';
    if (event.key === key) {
        console.log(`キーが押されました: ${key}`);
        buttonPress(FF30_SELECTOR);
    }

    // 一時停止 [PAUSE]
    key = ' ';
    if (event.key === key) {
        console.log(`キーが押されました: ${key}`);
        buttonPress(PAUSE_SELECTOR);
    }

    // 再開 [RESUME]
    key = ' ';
    if (event.key === key) {
        console.log(`キーが押されました: ${key}`);
        buttonPress(RESUME_SELECTOR);
    }

    // 再生開始 [PLAY]
    key = ' ';
    if (event.key === key) {
        console.log(`キーが押されました: ${key}`);
        buttonPress(PLAY_SELECTOR);
    }

    // もう一度再生 [REPLAY]
    key = ' ';
    if (event.key === key) {
        console.log(`キーが押されました: ${key}`);
        buttonPress(REPLAY_SELECTOR);
    }

    // ブラウザ内全画面 [WEB_FULL_SCREEN]
    key = 'w';
    if (event.key === key) {
        console.log(`キーが押されました: ${key}`);
        buttonPress(WEB_FULL_SCREEN_SELECTOR);
    }

    // 全画面 [FULL_SCREEN]
    key = 'f';
    if (event.key === key) {
        console.log(`キーが押されました: ${key}`);
        buttonPress(FULL_SCREEN_SELECTOR);
    }
});

// デバッグ用：拡張機能が正常に読み込まれたことを確認
console.log('キーボードイベントリスナーが設定されました');

/**
 * 操作一覧

動作再生中
--------------------------------
10秒戻る[REW10] ←
30秒進む[FF30] →
再開[RESUME] space
一時停止[PAUSE] space
LIVE同期[LIVE_SYNC] l
全画面[FULL_SCREEN] f
ブラウザ内全画面[WEB_FULL_SCREEN] w
--------------------------------

動画開始前
--------------------------------
再生開始[PLAY] space
--------------------------------

動画終了時
--------------------------------
もう一度再生[REPLAY] space
--------------------------------

 */
