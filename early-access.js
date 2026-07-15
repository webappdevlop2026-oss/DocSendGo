(function(){
  const FEATURES={
    store_beta:{title:'Universal Store Beta',icon:'🏪',desc:'Try the latest Store Panel and billing improvements.',url:'store.html'},
    smart_tools:{title:'New Smart Tools',icon:'✨',desc:'Preview selected new document tools before public release.',url:'index.html#tools'},
    ui_beta:{title:'New App Experience',icon:'🚀',desc:'Preview experimental interface updates.',url:'index.html'}
  };
  function esc(s){return String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
  function getProfile(){try{return JSON.parse(localStorage.getItem('docsendgo_profile')||'null')}catch(e){return null}}
  async function loadFlag(){
    if(!window.firebase || !firebase.apps || !firebase.apps.length) return null;
    const p=getProfile(); const id=p?.code||p?.userId||localStorage.getItem('docsendgo_profile_code');
    if(!id) return null;
    try{const d=await firebase.firestore().collection('earlyAccess').doc(id).get();return d.exists?{id,...d.data()}:null}catch(e){console.warn('Early access:',e);return null}
  }
  function renderBadge(flag){
    if(!flag?.enabled) return;
    const wrap=document.createElement('div');
    wrap.id='earlyAccessBadge';
    wrap.innerHTML=`<button aria-label="Open Early Access" style="position:fixed;right:16px;bottom:88px;z-index:9997;border:0;border-radius:18px;padding:11px 14px;background:linear-gradient(135deg,#6d28d9,#2563eb);color:#fff;font-weight:900;box-shadow:0 12px 35px rgba(37,99,235,.35);cursor:pointer">🚀 Early Access</button>`;
    wrap.querySelector('button').onclick=()=>location.href='early-access.html';
    document.body.appendChild(wrap);
  }
  document.addEventListener('DOMContentLoaded',async()=>renderBadge(await loadFlag()));
  window.DocSendGoEarlyAccess={loadFlag,FEATURES,esc};
})();