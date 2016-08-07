'use strict'

// アプリケーションをコントロールするモジュール
var electron = require('electron');
var app = electron.app;
app.dock.hide(); // dockから非表示

// windowを作成するモジュール
var BrowserWindow = electron.BrowserWindow;

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
        height: 10,
        transparent: true,  // ウィンドウの背景を透過
        frame: false,       // 枠の無いウィンドウ
        resizable: false,   // ウィンドウのリサイズを禁止
        show: true,         // アプリ起動時にウィンドウを表示しない
        "skip-taskbar": true,  // タスクバーに表示しない
        'always-on-top': true
    });
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    //Open the DevTools.
    //mainWindow.webContents.openDevTools()

    // ウィンドウが閉じられたらアプリも終了
    mainWindow.on('closed', function() {
        mainWindow = null;
    });

    // タスクトレイに格納
    var Menu = electron.Menu;
    var Tray = electron.Tray;
    var trayIcon = new Tray(__dirname + '/assets/img/icon.png');

    // タスクトレイに右クリックニューを追加
    var contextMenu = Menu.buildFromTemplate([
        { label: "表示",   click: function() { mainWindow.show(); mainWindow.focus(); } },
        { label: "非表示", click: function() { mainWindow.hide(); } },
        { label: "終了",   click: function() { mainWindow.close(); } },
    ]);
    trayIcon.setContextMenu(contextMenu);

    // タスクトレイのツールチップをアプリ名に
    trayIcon.setToolTip(app.getName());

    // タスクトレイが左クリックされた場合、アプリのウィンドウをアクティブ
    //trayIcon.on('clickd', function() {
    //    console.log('clicked menu')
    //    mainWindow.focus();
    //});
});
