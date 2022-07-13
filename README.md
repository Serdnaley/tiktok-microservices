# [Not Ready Yet] TikTok Microservices

Simple TikTok app based on microservices architecture.

Made out of boredom. But if you also think that TikTok has no chance against my masterpiece - you can use my version.

## Example
Working example available here: <br>
[tiktok.ley.pp.ua](https://tiktok.ley.pp.ua) <br>
[api.tiktok.ley.pp.ua/v1/docs](https://api.tiktok.ley.pp.ua/v1/docs) <br>
Test credentials: <br>
Email: `test@example.com` <br>
Password: `password`

## Setup

1. `yarn install` - Install dependencies
2. Fill out all .env files with your data
3. `yarn run db:refresh:all` - Refresh databases
4. `cd ./packages/api-gateway && yarn run start:dev` - Start api gateway
5. `cd ./packages/api-service-chats && yarn run start:dev` - Start chats service
6. `cd ./packages/api-service-users && yarn run start:dev` - Start users service
7. `cd ./packages/api-service-videos && yarn run start:dev` - Start videos service
