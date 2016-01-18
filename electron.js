'use strict'

// アプリケーションをコントロールするモジュール
var app = require('app');
// windowを作成するモジュール
var BrowserWindow = require('browser-window');

// メインウィンドウはGCされないようにグローバル宣言
var mainWindow = null;

// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', function(){
    if (process.platform != 'darwin') {
        app.quit();
    }
});

//　Electronの初期化完了後に実行
app.on('ready', function() {
    // メイン画面の表示。幅、高さを指定できる
    mainWindow = new BrowserWindow({
        width: 300,
        height: 300,
        transparent: true,  // ウィンドウの背景を透過
        frame: false,       // 枠の無いウィンドウ
        resizable: false,    // ウィンドウのリサイズを禁止
        show: true,         // アプリ起動時にウィンドウを表示しない
        "skip-taskbar": true,  // タスクバーに表示しない
        'always-on-top': true
    });
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // ウィンドウが閉じられたらアプリも終了
    mainWindow.on('closed', function() {
        mainWindow = null;
    });

    // タスクトレイに格納
    var Menu = require('menu');
    var Tray = require('tray');
    var nativeImage = require('native-image');

    var trayIcon = new Tray(nativeImage.createFromPath('./icon.png'));

    // タスクトレイに右クリックニューを追加
    var contextMenu = Menu.buildFromTemplate([
        { label: "表示",   click: function() { mainWindow.show(); mainWindow.focus(); } },
        { label: "非表示", click: function() { mainWindow.hide(); } },
        { label: "終了",   click: function() { mainWindow.close(); } },
    ]);
    trayIcon.setContextMenu(contextMenu);

    // タスクトレイのツールチップをアプリ名に
    trayIcon.setToolTip(app.getName());

    // 多宇区トレイが左クリックされた場合、アプリのウィンドウをアクティブ
    //trayIcon.on('clicked', function() {
    //    mainWindow.focus();
    //});
});
