# demole-nft-api
Demole NFT API

# Upload
Create and upload images to folder: ./images

# Run
`npm install`

`node app`

Get Metadata by tokenId:
> http://localhost:5000/:tokenId >
Get Image:
> http://localhost:5000/images/:fileName >
Get Image with resize:
> http://localhost:5000/images/:fileName?size=500 (width = 500, height = auto) >

# Run with Docker
`docker build -t demole-nft-api:latest .`

`docker-compose up`

Get Metadata by tokenId:
> http://localhost/:tokenId >
Get Image:
> http://localhost/images/:fileName >
Get Image with resize:
> http://localhost/images/:fileName?size=500 (width = 500, height = auto) >
