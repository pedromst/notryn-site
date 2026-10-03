"use strict";
(() => {
  const $ = id => document.getElementById(id);
  const command = "curl -fsSL https://notryn.com/install.sh | sh";
  $('install-command').textContent = command;
  const platforms = {
    linux: ['Linux x86_64 · Omarchy', 'Your Linux. Your colors.', 'Install for your user, then open Notryn from your application menu. Everything needed to run the app is included. On Omarchy, Notryn automatically follows your desktop theme. You can also choose any of the built-in themes.', 'Your notes and settings are kept when you update or uninstall.'],
    macos: ['macOS beta · Intel / Apple silicon', 'At home on your Mac.', 'The installer detects your Mac and places Notryn in your Applications folder. Open it there, or from the terminal.', 'Experimental, not Apple-notarized. macOS may block the app. Read the Mac guide before installing.'],
    windows: ['', 'Windows · Coming soon', '', '']
  };
  const fill = (el, text) => { el.textContent = text; el.hidden = text === ''; };
  document.querySelectorAll('[data-platform]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-platform]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    const key = button.dataset.platform;
    const [status, title, description, note] = platforms[key];
    fill($('install-status'), status);
    fill($('platform-title'), title);
    fill($('platform-description'), description);
    fill($('platform-note'), note);
    $('command-area').hidden = key === 'windows';
    $('platform-guide').hidden = key === 'windows';
    $('platform-guide').href = 'guide.html#' + key;
  }));
  $('copy-install').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(command); $('copy-install').textContent = 'Copied'; }
    catch { $('copy-install').textContent = 'Select the command to copy'; }
    setTimeout(() => { $('copy-install').textContent = 'Copy command'; }, 2500);
  });
})();
