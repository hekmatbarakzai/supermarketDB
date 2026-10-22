# Verification

Passed:

- Windows NSIS installer v1.0.1 generation completed successfully. Output: `release/Supermarket-Setup.exe`.

- Production frontend build with Vite 6.4.5: 1,574 modules transformed.
- Eleven backend/security tests, including four new checks for mandatory folder selection, persistence, admin access, unavailable-drive fallback, and restore behavior: unique fresh installations, password hashing and lockout, cashier permissions, sales and stock/purchases, customer debts and payments, backups and cross-installation restore rejection, 100-sale trial lock, Ed25519 key binding/expiry/tamper checks, and fractional-currency settlement.
- Syntax checks for Electron main/preload, database and seller licensing scripts.
- Packaged archive inspection: v1.0.1 folder selection, custom automatic-backup support, the single-instance lock and rounding fix are included; seller private keys and shop databases are excluded.

The Windows package uses the available Electron 44.9.0 runtime. The default source dependency is Electron 43.x; both provide the Node SQLite API used here. The build environment required Windows certificate-store support and a temporary build folder because package downloads/extraction failed in the workspace.

Not verified here:

- Interactive Windows application startup and all end-to-end user flows. A hidden desktop smoke test did not produce a verification report.
- Actual receipt/label printer and USB barcode scanner hardware.
- Native-speaker review of Dari/Pashto translations.
- Installer code signing: no seller certificate was configured.

Dependency installation reported eight moderate audit findings. Review and resolve applicable findings before commercial release. This project should not be represented as a fully validated commercial release until the remaining desktop and hardware checks are completed.



