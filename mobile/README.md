# Supermarket Phone

A separate installable, offline-capable phone version of Supermarket. Windows source and installer are unchanged.

Open the GitHub Pages URL in Safari or Chrome. Use Share > Add to Home Screen on iPhone, or the browser's Install/Add to Home screen option on Android. The first visit requires internet to download the app; subsequent visits can use the offline cache.

Create a new shop/admin for this phone and enable automatic backups during setup. The same English, Dari and Pashto screens are available, with touch navigation, sales, inventory, purchases, customers/debts, suppliers, expenses, reports, users and signed license activation. Barcode scanners that type into the search field work; camera scanning is not implemented. Printing uses the phone's system print support and compatible printers.

## Data and backups

This version stores records and the newest 100 automatic snapshots in this browser's IndexedDB. Nothing is uploaded to GitHub. Browsers on phones do not generally allow a website to choose an arbitrary folder and write files there automatically, so Settings > Export backup downloads a JSON file. Export it regularly to Files, a drive, or cloud storage. Clearing browser data, uninstalling the browser/PWA, private browsing, or storage eviction can erase both records and local snapshots. The app requests persistent storage where supported, but cannot guarantee it. See [MDN's directory-picker compatibility notes](https://developer.mozilla.org/en-US/docs/Web/API/Window/showDirectoryPicker).

Each browser installation has its own ID and accounts. Phone records do not sync with Windows or other phones. Its JSON backups are specific to this phone installation and cannot be imported into the Windows SQLite app, or into a different installation. Restoring replaces the current phone shop state and signs you out.

A static site has no trusted server. Password hashing, lockout, roles, trial limits and Ed25519 verification run in the browser for local access control. A device owner with developer tools can alter browser data/code. This does not provide server-enforced authorization or tamper-resistant commercial licensing. Use a hosted authenticated backend for shared accounts, protected remote records or cross-device synchronization.

## Seller licensing

Use the existing seller tool on your seller PC, with this phone's Installation ID:

```
node seller/license.cjs issue PHONE_INSTALLATION_ID
```

The private key is never included in GitHub or the phone bundle. Only the public verification key ships. A Windows key is not transferable to a phone ID.

## Build locally

```
cd mobile
npm install
npm test
npm run build
npm run dev
```

`dist/` contains the static app. Deploy its contents under a stable HTTPS path: changing host/path creates a different browser storage installation. The root Windows commands continue to build only Windows.

## GitHub Pages

The repository includes `.github/workflows/mobile-pages.yml`. In repository Settings > Pages, select **GitHub Actions** as the source if it is not already enabled. A push to `main` builds and deploys only `mobile/`; the Windows installer is not published to Pages. Expected address: `https://hekmatbarakzai.github.io/supermarketDB/`.
