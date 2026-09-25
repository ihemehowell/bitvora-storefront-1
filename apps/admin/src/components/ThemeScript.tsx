const THEME_STORAGE_KEY = 'bitvora-admin-theme'

// Runs before React hydrates so there's no flash of the wrong theme.
// Kept as a tiny inline script (not a useEffect) specifically so it executes
// pre-paint. Only ever rendered inside apps/admin's <head>.
const script = `
(function() {
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var isDark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
