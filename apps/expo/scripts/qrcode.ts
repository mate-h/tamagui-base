#!/usr/bin/env node

import qrcode from "qrcode";

process.stdin.on("data", showQr);

function showQr(data) {
  const tunnelUrl = data.toString().match(/(http.*)/)[1];
  const expUrl = tunnelUrl.replace("https://", "exp://");
  qrcode.toString(expUrl, { type: "utf8", scale: 2 }, (err, string) => {
    console.log(expUrl + " - Open in expo");
    console.log(string);
  });
}
