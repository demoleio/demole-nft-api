const fs = require("fs")

async function run() {

    const ids = fs.readdirSync("./metadata-id")
    const result = {}

    for(let i = 0; i < ids.length; i++) {
        const fileName = ids[i]

        let metadata = fs.readFileSync(`./metadata-id/${fileName}`).toString()
        metadata = JSON.parse(metadata)

        const tribeName = metadata.attributes[0].value

        if(result.hasOwnProperty(tribeName)) {
            result[tribeName]++
        } else {
            result[tribeName] = 1
        }
    }

    console.log(result);
}

run()