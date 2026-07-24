(() => {
  'use strict';
  const APP_URL = 'https://doc-send-go.vercel.app/';

  window.shareDocSendGoApp = async function shareDocSendGoApp() {
    const data = {
      title: 'DocSendGo',
      text: 'DocSendGo – Scan, send, receive and print documents securely.',
      url: APP_URL
    };
    try {
      if (window.AndroidBridge && typeof window.AndroidBridge.shareText === 'function') {
        window.AndroidBridge.shareText(`${data.text} ${data.url}`);
        return;
      }
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(`${data.text} ${data.url}`);
      if (typeof window.showToast === 'function') window.showToast('App link copied ✅');
      else alert('App link copied');
    } catch (error) {
      if (error && error.name !== 'AbortError') {
        if (typeof window.showToast === 'function') window.showToast('Unable to share right now', 'error');
      }
    }
  };

  const makeNetworkBanner = () => {
    if (document.getElementById('dsgNetworkBanner')) return;
    const bar = document.createElement('div');
    bar.id = 'dsgNetworkBanner';
    bar.setAttribute('role', 'status');
    bar.style.cssText = 'display:none;position:fixed;left:12px;right:12px;top:12px;z-index:10050;padding:11px 14px;border-radius:13px;background:#7f1d1d;color:#fff;text-align:center;font:800 13px system-ui;box-shadow:0 10px 30px #0f172a40';
    bar.textContent = 'No internet connection — sending and receiving are paused.';
    document.body.appendChild(bar);
    const update = () => { bar.style.display = navigator.onLine ? 'none' : 'block'; };
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    update();
  };

  window.addEventListener('DOMContentLoaded', () => {
    makeNetworkBanner();
    if (window.AndroidBridge && typeof window.AndroidBridge.isNativeApp === 'function') {
      document.documentElement.classList.add('native-android-app');
    }
  });
})();
