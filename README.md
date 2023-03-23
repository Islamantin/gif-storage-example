# Gif Storage Example App

Web interface for storing gif images from [Giphy.com](https://giphy.com)\
Search images via Giphy API; Sort, filter and download images from your collection.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.2.\
Bootstrap 5.0 was used as the styles framework. 

## Before you start
* Add `environment.ts` file to the `src/environmet` directory with the following contents:
```
export const environment = {
  production: false, 
  apiKey: {KEY},
};
```
 Where `{KEY}` is your 32-character API key provided by Giphy.com

* Refering project's root directory run `npm install` command in CLI

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
