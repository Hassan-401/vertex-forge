/* --------------------------------------------------------------------------
 * Menu Design 7 — the live "QU" menu. Rather than a re-creation, this design
 * embeds the real published app (qu-menu.vercel.app) full-screen, so the
 * client previews the actual product. The site allows framing (it sends no
 * X-Frame-Options / CSP frame-ancestors), so it loads directly in an iframe.
 * ------------------------------------------------------------------------ */

const QU_MENU_URL = "https://qu-menu.vercel.app/";

export function MenuDesign7() {
  return (
    <iframe
      src={QU_MENU_URL}
      title="QU Menu"
      className="fixed inset-0 z-0 h-full w-full border-0 bg-white"
      allow="clipboard-write; geolocation; fullscreen"
    />
  );
}
