# GeoBettr

A lightweight browser extension for GeoGuessr. Enhance the game experience by
quality of life features, such as an in-game notepad.

## Disclaimer

This is a personal project I do for fun, to add features I would like to 
GeoGuessr and learn how to create web browser extensions. I do not intend
to publish it. There is no guarantee that I will keep the project
up-to-date.

## User policy

You are totally free to use the extension as you want and modify it. You
can re-use the code for you own project, as long as you do not sell it.
You do not need to credit me (it would be appreciated if you do though).

## Installation / build

The extension is built using webpack and web-ext. The package.json contains
scripts for building the artifact or starting a development environment with
hot-reload.

Install node LTS (build tested with version 18.4.2). Recommended way to do
this is using [nvm](https://github.com/nvm-sh/nvm) :

```shell
nvm install lts
```

Install the dependencies :

```shell
npm install
```

Build the extension artifact :

```shell
npm run build
```

Run a test environment (using `web-ext`) :

```shell
npm run start
```

## Features I want to add

- Score history tracker
  - Stored in a file (maybe in a remote storage later)
  - See your score history (best score for a specific format, best time 
  on a map, etc.)
- Add a clock for unlimited games (round time + global time)