## Task
Create an application, which has a canvas drawing board using any canvas drawing library e.g. Fabric.js, Konva.js. Drawing board must have a pencil tool. Other tools (e.g. Circle, Rectangular) apart from pencil are not important.
This application will have a take screenshot button. On click of that button a current screenshot of canvas will be captured and saved in the backend. Screenshot list will be visible in UI and list will be populated on refresh of the page.

## Technology Used
- React.Js
- Node.Js
- MongoDB
- Cloudinary
    - For storing image
- Heroku
    - For app deployment

## Two servers have been deployed
- 1st for API for authentication, uploading and getting list of images
    - On: [https://manish-api-server.herokuapp.com](https://manish-api-server.herokuapp.com)
- 2nd for React application.
    - Everything is custom made and SSR has been done in this.
    - On: [https://manish-canvas.herokuapp.com](https://manish-canvas.herokuapp.com)

## Front End Setup
- `git clone https://github.com/mmax904/react-ssr-times-internet`
- `npm install`
- `npm run dev`
- Server will start on [http://localhost:6060](http://localhost:6060)

## Back End Setup
- `git clone https://github.com/mmax904/manish-api-server`
- `npm install`
- `npm run dev`
- Server will start on [http://localhost:5000](http://localhost:5000)

## Demo:
[https://manish-canvas.herokuapp.com](https://manish-canvas.herokuapp.com)