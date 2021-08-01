const fs = require("fs")
const express = require('express')
const bodyParser = require("body-parser");
const cors = require('cors');
const sharp = require('sharp')

const app = express();
const PORT = 5000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.options('*', cors())

const init = async () => {
    app.get('/:tokenId', (req, res) => {
        fs.readFile(`./metadata-id/${req.params.tokenId}.json`, (error, data) => {
            if(error) {
                return res.status("404").send({error: "tokenId not exist"})
            }
            
            res.header("Content-Type",'application/json');
            res.send(data.toString())
        })
    });

    app.get('/images/:fileName', async (req, res) => {

        const path = `${__dirname}/images/${req.params.fileName}`

        const existFile = fs.existsSync(path)
        if(!existFile) {
            return res.status("404").send({error: "image not exist"})
        }

        if(req.query.size) {
            req.query.size = parseInt(req.query.size)
            const readStream = fs.createReadStream(path)
            let transform = sharp()
            let metadata = await sharp(path).metadata()
            const ratio = metadata.width / metadata.height

            if(req.query.size > metadata.width) {
                req.query.size = metadata.width
            }

            transform.resize(req.query.size, parseInt(req.query.size / ratio))
            readStream.pipe(transform).pipe(res)
        } else {
            res.sendFile(path)
        }
    })

    app.listen(PORT, () =>
        console.log(`Demole NFT API listening on port ${PORT}!`),
    );
}

init()