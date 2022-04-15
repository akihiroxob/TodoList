'use strict';

// アプリケーションをコントロールするモジュール
const electron = require('electron');
const app = electron.app;
//app.dock.hide(); // dockから非表示

// windowを作成するモジュール
const BrowserWindow = electron.BrowserWindow;

// メインウィンドウはGCされないようにグローバル宣言
let mainWindow = null;
let trayIcon = null;

//　Electronの初期化完了後に実行
app.on('ready', function () {
    // メイン画面の表示。幅、高さを指定できる
    mainWindow = new BrowserWindow({
        minHeight: 45,
        minWidth: 300,
        title: 'ToDoList',
        resizable: true,
        useContentSize: true,
        minimizable: false,
        maximizable: false,
        closable: true,
        alwaysOnTop: true,
        skipTaskbar: true,
        show: true,
        frame: false,
        autoHideMenuBar: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    const ipcMain = electron.ipcMain;
    ipcMain.on('ignoreMouse', async (event, arg) => mainWindow.setIgnoreMouseEvents(arg, {forward: true}));
    ipcMain.on('setSize', async (event, arg) => mainWindow.setSize(arg.width, arg.height, true));
    ipcMain.on('hide', async (event, arg) => mainWindow.hide());

    mainWindow.setVisibleOnAllWorkspaces(true); // ワークスペース（デスクトップ）を移動しても表示される
    mainWindow.loadFile('./index.html');

    //Open the DevTools.
    //mainWindow.webContents.openDevTools()

    // ウィンドウが閉じられたらアプリも終了
    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    // タスクトレイに格納
    const Menu = electron.Menu;
    const Tray = electron.Tray;
    trayIcon = new Tray(__dirname + '/assets/img/icon.png');

    // タスクトレイに右クリックニューを追加
    const contextMenu = Menu.buildFromTemplate([
        {
            label: '表示',
            click: function () {
                mainWindow.show();
                mainWindow.focus();
            },
        },
        {
            label: '非表示',
            click: function () {
                mainWindow.hide();
            },
        },
        {
            label: '終了',
            click: function () {
                mainWindow.close();
            },
        },
    ]);
    trayIcon.setContextMenu(contextMenu);

    // タスクトレイのツールチップをアプリ名に
    trayIcon.setToolTip(app.getName());
    app.dock.hide();

    // 全てのウィンドウが閉じたら終了
    app.on('window-all-closed', () => app.quit());
});
