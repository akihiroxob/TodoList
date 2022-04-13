import {ipcRenderer} from 'electron';

export function ignoreMouse(bool) {
    ipcRenderer.send('ignoreMouse', bool);
}

export function setSize(height, width) {
    ipcRenderer.send('setSize', {height, width});
}
