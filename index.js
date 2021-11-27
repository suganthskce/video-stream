const express = require("express");
const app = express();
const fs = require("fs");

app.get("/video", function (req, res) {
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
    }

    // const videName  ="first.mp4";
    const videName = "second.mp4";

    const videoPath = videName;
    const videoSize = fs.statSync(videName).size;

    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);


    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
});

app.get("/status", function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Server is UP!!!!!', status: true }));
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8000, function () {
    console.log("Listening on port 8000!");
});
