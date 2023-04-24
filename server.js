const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const ytmux = require('ytdl-core-muxer');
const exp = express();
const logC = console.log;

// Express and YTDL Code
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const port = process.env.PORT;
exp.use(cors());
exp.use(express.static(__dirname + '//src'));
exp.listen(port, () => {
    logC(`Server Initialized on port ${port}`)
});

exp.get('/downloadmp4', async(req,res) => {
    var URL = req.query.URL;
    var Quality = req.query.Quality;
    
    ytdl.getInfo(URL).then(info => {
        const videoTitle = info.videoDetails.title.replace('|','').toString('ascii');
        logC(`Video Name: ${videoTitle}`);
    
        res.header('Content-Disposition', `attachment; filename="${videoTitle}.mp4"`);
        if (Quality == "high")
        {
            ytmux.download(URL, {
                format: 'mp4',
                filter: 'audioandvideo', 
                quality: 'highestvideo'
            }).pipe(res);
            logC('Format: MP4, Quality: High')
        } else if (Quality == "low")
        {
            ytdl(URL, {
                format: 'mp4'
            }).pipe(res);
            logC('Format: MP4, Quality: Low')
        }
    })
    });

exp.get('/downloadmp3', (req,res) => {
    var URL = req.query.URL;
    ytdl.getInfo(URL).then(info => {
    const videoTitle = info.videoDetails.title.replace('|','').toString('ascii');
    console.log(`Video Name: ${videoTitle}`);
    res.header('Content-Disposition', `attachment; filename="${videoTitle}.mp3"`);
    ytdl(URL, {
        format: 'mp3',
        filter: 'audioonly'
        }).pipe(res);
    });
    logC('Format: MP3')
});