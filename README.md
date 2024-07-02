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

# Service-Worker with typescript

## CRA and Webpack build configuration

### 1. CRA sw, only for production build
First read this: https://create-react-app.dev/docs/making-a-progressive-web-app/
When using CRA, you can create a service-worker.ts or service-worker.js file in your src folder.
As long as the name is the same are the one defined for swSrc in paths.js the file will be taken, transpiled if necessary (if typescript) and used as a service worker.
Be aware that you must include somewhere at the beginning those 2 lines:
`import {precacheAndRoute} from 'workbox-precaching';` and `precacheAndRoute(self.__WB_MANIFEST);` otherwise building the project will error `Can't find self.__WB_MANIFEST in your SW source.`.
That is because CRA uses `WorkboxWebpackPlugin.InjectManifest` in webpack config. CRA is using workbox so you might as well use it too if you want.
Also, adding an import and not just the solution mentioned by CRA in the docs also helps when declaring self as ServiceWorkerGlobalScope. Adding an import makes the file a module and typescript no longer complains about not being able to redeclare self.

### 2. New webpack entry point
Otherwise, if ejected, create a service worker somewhere else or with a different name and add a new entry point in webpack config like this:
```
entry: {
    main: paths.appIndexJs,
    serviceWorker: {
        import: paths.appServiceWorker,
        filename: 'service-worker.js'
    }
},
```
where appServiceWorker is a new path added to paths.js to the new service worker

### 3. Separate build for service-worker without involving webpack

In the root folder I created a `workers` folder and inside that a `tsconfig.sw.json` and another folder `service-worker` containing the typescript sw file.
In package.json I created a script for running tsc with the dedicated tsconfig.sw.json file.

## Writing service worker in typescript

First of all this must be added at the top of the file:
```
/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */
```
And then if trying to declare self as ServiceWorkerGlobalScope like this: `declare var self: ServiceWorkerGlobalScope;` youll get an error that self cannot be redeclared as it already is. What you can do is add an import (and for workbox you already do).
Alternatively you can cast `self` to `ServiceWorkerGlobalScope`: `const swSelf = self as unknown as ServiceWorkerGlobalScope;`
and use `swSelf` instead of `self`.

## Ditch typescript for service-worker

Although TS is great, for service worker it's a pain in the ass. The above solution doesn't work in development build, only for production build.
Adding a new entry point adds a lot of boilerplate code by webpack.
Just compiling service-worker.ts alone implies not using tsconfig or creating a new one just for that
