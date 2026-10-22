import {PhoneStore} from './store.js';
const store=new PhoneStore();let queue=Promise.resolve();
const download=(text,name)=>{const url=URL.createObjectURL(new Blob([text],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);};
const pickFile=()=>new Promise(resolve=>{const input=document.createElement('input');input.type='file';input.accept='.json,application/json';input.onchange=()=>resolve(input.files[0]||null);input.oncancel=()=>resolve(null);input.click();});
window.shop={call(action,data={}){if(action==='export'){return enqueue(async()=>{store.requireAdmin();download(JSON.stringify({format:'supermarket-phone-v1',state:store.s},null,2),'supermarket-phone-backup.json');return true;});}if(action==='import'){const file=pickFile();return file.then(f=>f?f.text():null).then(text=>text===null?null:enqueue(()=>store.restore(text)));}return enqueue(()=>store.call(action,data));}};
function enqueue(fn){const result=queue.then(()=>navigator.locks?navigator.locks.request('supermarket-phone-state',()=>execute(fn)):execute(fn));queue=result.catch(()=>{});return result;}
async function execute(fn){await store.load();try{return await fn();}catch(e){await store.load();throw e;}}
if('serviceWorker'in navigator&&import.meta.env.PROD){navigator.serviceWorker.register('./sw.js').catch(()=>{});}
import('./App.jsx');

