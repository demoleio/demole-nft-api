const fs = require("fs")

const MAX_ID = 9212

let currentId = 6450;

function randomInteger(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

async function run() {
    const metadataDir = fs.readdirSync("./metadata-temp")

    if(currentId === MAX_ID) {
        return
    }

    const randomFilename = metadataDir[randomInteger(0, metadataDir.length - 1)]
    let metadata = fs.readFileSync(`./metadata-temp/${randomFilename}`)

    fs.writeFileSync(`./metadata-id/${currentId}.json`, metadata)
    fs.unlinkSync(`./metadata-temp/${randomFilename}`)

    console.log(`Saved ${currentId}: ${randomFilename}`);

    currentId++;
    run()
}

run()