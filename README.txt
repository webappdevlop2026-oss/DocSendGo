DOCSENDGO v5.0 ADMIN ONLY UPDATE

REPLACE ONLY THIS FILE IN GITHUB ROOT:
- 232admin.html

DO NOT REPLACE OR RENAME:
- .well-known/assetlinks.json
- index.html
- manifest.webmanifest
- sw.js
- store.html

CHECK BEFORE COMMIT:
Open 232admin.html in GitHub. The first line must be:
<!doctype html>

If the first line starts with [{"relation"... you selected assetlinks.json by mistake.

After commit, wait for Vercel deployment to show Ready, then open:
https://doc-send-go.vercel.app/232admin.html?v=50
