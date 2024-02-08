'use strict';

// アプリケーションをコントロールするモジュール
const electron = require('electron');
const app = electron.app;
app.dock.hide(); // dockから非表示

// windowを作成するモジュール
const {BrowserWindow, shell} = electron;

// メインウィンドウはGCされないようにグローバル宣言
let mainWindow = null;
let trayIcon = null;

//　Electronの初期化完了後に実行
app.on('ready', () => {
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
        hasShadow: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    const ipcMain = electron.ipcMain;
    ipcMain.on('ignoreMouse', async (event, arg) => mainWindow.setIgnoreMouseEvents(arg, {forward: true}));
    ipcMain.on('hide', async (event, arg) => mainWindow.hide());

    mainWindow.setIgnoreMouseEvents(true);
    mainWindow.setVisibleOnAllWorkspaces(true); // ワークスペース（デスクトップ）を移動しても表示される
    mainWindow.loadFile('./index.html');

    //Open the DevTools.
    //mainWindow.webContents.openDevTools()

    // タスクトレイに格納
    const Menu = electron.Menu;
    const Tray = electron.Tray;
    trayIcon = new Tray(__dirname + '/assets/img/icon.png');

    // タスクトレイに右クリックニューを追加
    const contextMenu = Menu.buildFromTemplate([
        {
            label: '表示',
            click: () => mainWindow.show() && mainWindow.focus(),
        },
        {
            label: '非表示',
            click: () => mainWindow.hide(),
        },
        {
            label: '終了',
            click: () => mainWindow.close(),
        },
    ]);
    trayIcon.setContextMenu(contextMenu);

    // タスクトレイのツールチップをアプリ名に
    trayIcon.setToolTip(app.getName());

    mainWindow.maximize();
    mainWindow.webContents.setWindowOpenHandler(({url}) => {
        if (url.startsWith('http')) shell.openExternal(url);
        return {action: 'deny'};
    });
    // ウィンドウが閉じられたらアプリも終了
    mainWindow.on('closed', () => {
        mainWindow = null;
        app.quit();
    });
    app.on('window-all-closed', () => app.quit()); // 全てのウィンドウが閉じたら終了
});
