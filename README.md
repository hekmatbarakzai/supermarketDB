# Supermarket Desktop

A local Electron application with React, Lucide SVG icons and SQLite persistence. No web server or separately installed runtime is needed by buyers.

## Development

Use Node.js 24 or newer on the seller/developer machine.

```
npm install
npm test
npm run build
npm start
```

`npm run dev` serves only the frontend for development; the secure APIs are available inside Electron. No sample accounts or shop data are shipped. The first launch creates a unique installation and asks the owner to choose an automatic-backup folder and create an administrator with a password of at least eight characters. Existing installations keep their shop data and prompt the admin to choose a backup location after upgrading.

## Windows installer

```
npm run dist
```

The installer is written to `release/Supermarket-Setup.exe`. It creates Start Menu and desktop shortcuts. Buyers run this single file, launch Supermarket, create their own shop and admin, and start selling. The first 100 completed sales are free. After that POS requires a valid license; reports and other records remain accessible. For commercial release, sign the installer with your Windows code-signing certificate; the generated installer is otherwise unsigned.

## Seller licensing

This project has an initial Ed25519 key pair. Keep `seller/seller-private.pem` securely backed up and NEVER distribute it. Only `license-public.pem` is included in the installer. The seller folder is excluded from packaged application files.

For a new product key pair, use `node seller/license.cjs init` in a fresh checkout before building. The script refuses to overwrite existing keys. Do not replace the public key after distributing licenses unless you intentionally migrate all buyers.

Ask the buyer to copy their Installation ID from Settings, then run on the seller's machine:

```
node seller/license.cjs issue INSTALLATION_ID
node seller/license.cjs issue INSTALLATION_ID 2027-12-31
```

The first creates a perpetual license; the second expires at the end of the specified UTC date. Send the printed key to the buyer to paste into Settings > License key > Activate license. Keys are bound to an installation and signatures are checked locally. The client contains no key-generation capability. Local licensing assumes the operating system, app files and clock have not been tampered with.

## Data and backups

Shop records, credentials, license and Installation ID are stored in Electron's userData folder, normally `%APPDATA%/Supermarket/shop.sqlite` (the exact folder follows Electron's app name). No shop data belongs in the program folder. Copying the installed program alone to a new computer starts a fresh installation. Copying the userData folder deliberately clones the installation, so protect it as sensitive shop data.

Every committed change writes `latest.sqlite` and a timestamped copy to the selected backup location, inside a dedicated `Supermarket-backups-INSTALLATION_ID` subfolder. The Settings screen shows the exact folder and lets an admin change it. The newest 100 timestamped copies are retained. The app also maintains `userData/backups` as a local safety copy. If the selected location is unavailable (for example, a disconnected USB drive), a warning appears and local backups continue without interrupting sales. Folder preferences are stored on this device, separately from the exported shop database; restoring a backup does not change the selected folder. Settings exports/imports SQLite backup files. Imports are restricted to the same Installation ID and sign the user out after restore. Export backups to a separate drive regularly: local automatic backups cannot protect against device failure. Restore replaces the shop's current state, including users and sale history.

Passwords use PBKDF2-SHA256 with 210,000 iterations and random salts. Five failed logins lock the installation for five minutes. Admin-only mutations are checked in the Electron main process, independent of UI visibility. Cashiers can sell, manage customers and payments, see reports, and change their own password. They cannot delete records or manage settings, users, purchases or expenses.

## Working flows

- Add suppliers and products, then enter purchases to increase stock. Product cost changes on purchase; each sale stores its own cost and price snapshot for profit reports.
- USB barcode scanners type into the POS search field. Enter on an exact barcode adds it to the cart. Code 39 barcodes accept uppercase letters, digits and standard Code 39 punctuation. Missing barcodes are generated automatically.
- Cash sales reduce stock immediately. Credit sales require a customer and create a debt. Open a customer's Statement to record payments, see sales and payments, or print a statement.
- Print receipts after checkout or from recent sales. Products > Print labels prints a sheet with one Code 39 label per product. Use the Windows print dialog to choose paper and printer settings.
- Reports use an inclusive date range, historical sale costs, and expense dates. Stock value uses current stock multiplied by current cost. Currency is a shop-wide display setting and does not convert existing amounts.
- The language button cycles English, Dari and Pashto and applies RTL layout to both Afghan languages. Names and shop-entered content remain as entered.

## Project layout

- `main.cjs`, `preload.cjs`: Electron window, restricted IPC and native backup file dialogs.
- `database.cjs`: SQLite state, password security, role enforcement, business rules, backups and license verification.
- `scripts/prepare-app.cjs`: stages a standalone app folder for installer packaging.
- `src/`: React interface, translation strings, printable receipts and Code 39 SVG rendering.
- `seller/license.cjs`: seller-only key generation and signing tool.
- `tests/store.cjs`: business-rule and security regression tests.

The database stores the application state in a single SQLite row and commits each mutation synchronously. This is designed for one shop terminal, not concurrent terminals or a networked multi-user deployment. Taxes, returns, accounting integrations and weighted-average inventory costing are not implemented.


