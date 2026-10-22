const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('shop',{call:(action,data)=>ipcRenderer.invoke('shop',action,data)});
