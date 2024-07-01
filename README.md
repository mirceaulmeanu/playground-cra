# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Localhost secure certificate (absolutely necessary for service worker to work on localhost)

For https://localhost we'll get an SSL invalid certificate error when trying to register the service worker.
In order to make the browser trust the local self-signed certificate we need to create and install one.
I chose to use "mkcert": https://github.com/FiloSottile/mkcert/releases
Download a release, rename to "mkcert.exe", copy it to a folder in your PATH (Environment variable) or add the folder containing the exe to your PATH.
Run `mkcert -install`.
Run `mkcert localhost`.
Two files will be generated `localhost.pem` and `localhost-key.pem`. Copy them in a folder outside of your project named `ssl-certificates` so they will be found when the app checks the pats in `.env` file: Example: `SSL_CRT_FILE=../ssl-certificates/localhost.pem`.
