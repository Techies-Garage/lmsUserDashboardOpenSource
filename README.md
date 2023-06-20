
# user lms dashboard api

A simple repository for an lms user dashboard api written in rust, and also using nodejs events to handle communication across independent monolith modules.

### Run locally with nodejs

Ensure you have >=nodejs v18 installed on your computer
#### Use NodeJS 18
```
npm install; node index.js
```

Setup .env file. Ensure you follow the example .env provided.

#### Start the server
```
npm start
```
or
```
node index.js
```


### Run with Docker
#### Buid Docker File
```
docker build -t your_image_name .
```

#### Run Docker File
```
docker run -p 3000:3000 -d your_image_name
```

#### Access app at http://localhost:3000.


#### Use Compose
```
docker-compose up
```




