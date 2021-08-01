const fs = require("fs")

const IMAGE_URL = "https://nft-api.demole.io/images/"

function capitalize(input) {  
    return input.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');  
}

async function run () {
    const imagesDir = fs.readdirSync("./images")

    for(let i = 0; i < imagesDir.length; i++) {
        const fileName = imagesDir[i]
        const fileNameWithoutExtension = fileName.split(".")[0]
        const attributes = fileNameWithoutExtension.split("_")
        const metadata = {
            name: fileNameWithoutExtension,
            description: "",
            image: IMAGE_URL + fileName,
            attributes: []
        }
        
        for(let j = 0; j < attributes.length; j++) {
            if(j == 0) {
                metadata.attributes.push({
                    trait_type: "Tribe",
                    value: capitalize(attributes[j])
                })
            } else {
                metadata.attributes.push({
                    trait_type: attributes[j][0],
                    value: attributes[j][1]
                })
            }
        }

        fs.writeFileSync(`./metadata/${fileNameWithoutExtension}.json`, JSON.stringify(metadata))
        console.log(`Saved ${fileName}.json`);
    }
}

run()