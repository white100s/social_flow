// Generates docs/repo-qr.png — a QR code pointing at the GitHub repo, used
// in the root README. Run with `npm run build:qr`.
const QRCode = require("qrcode");
const path = require("path");

const REPO_URL = "https://github.com/white100s/social_flow";
const outPath = path.join(__dirname, "repo-qr.png");

QRCode.toFile(
  outPath,
  REPO_URL,
  { width: 320, margin: 2, color: { dark: "#17181A", light: "#FFFFFF" } },
  (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log("Wrote", outPath);
  },
);
