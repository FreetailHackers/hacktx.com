# HackTX 2024
The static frontend for HackTX 2024.
Built with Node, Vite, ThreeJS.

## Getting started

First, make sure your terminal's working directory is within the folder that this README is in. 

Run `npm install` to install project dependencies.

Run `npm run dev` to start the live server.

Follow the link to access the page.

## Building

Run `npm run build` to compile the project. This will output deliverables to `./dist/`.

Here are the pipeline instructions during development of HackTX24:
```
- cd current
- npm install
- npm run build
- cd ..
- mv current/dist/* archive
- mv archive public
```