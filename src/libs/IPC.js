import { ipcRenderer } from 'electron';

export function ignoreMouse(bool) {
    ipcRenderer.send('ignoreMouse', bool);
}

export function hideWindow() {
    ipcRenderer.send('hide');
}
