# Angular 2 autologout example using Redux

This example explores implementing an "auto logout" feature using redux and reactive extensions. It relies on subscribing to state changes, filtering them out, and mapping to a new timer observable that fires when there's been a period of inactivity.

## Running the example

This uses the method described in the Angular 2 quick start guide, so you need to first install packages, and then you should be able to just run things:

```
npm install
npm start
```

That should compile everything for you and launch a browser that will react to changes in any file.