# expressways

A simple but automagic way of creating express routers and route methods.

**expressways** allows you to dynamically create [Express](https://expressjs.com) routes, specifically useful when creating API"s and you are organizing your code in multiple files.

## Requirements

**expressways** has been tested with Express `4.17`

## Installation

Install **expressways** to your solution by using:

``` bash
npm install expressways --save
```

## Features

**expressways** has the following feature.

### Define your route methods using `method()`

Each method you want to expose through your **expressways** route is exported and declared using the `method()`.

You can export multiple or individual methods per file.

``` TypeScript
import { method } from "expressways";

export const get1 = method("get", "/", (req, res, next) => {
    res.send("Foo");
});
```

### Use `expressways()` to create a dynamic Express router

To add the defined methods to an Express router you use the `expressways()` automagic router as follows.

``` TypeScript
import express from "express";
import { expressways } from "expressways";

const app = express();

app.use("/test", expressways({
    methods: require("./routes")
}));
```

### `expressways` options

The following options are available for **expressways** Router generation

| option | required | description |
|---|---|---|
| `methods` | yes | A `require` or `import` of the route methods  |
| `handlers`  | no | An array of additional Express request handlers |
| `router` | no | An existing Express Router to use, instead of creating a new one |
| `log` | no | Method for logging, for instance use `console.log` or `debug` |

## Sample application

File: `router.ts`

``` TypeScript
import { method } from "expressways";

export const get1 = method("get", "/", (req, res, next) => {
    res.send("Foo");
});

export const get2 = method("get", "/two", async (req, res, next) => {
    res.send("Fie");
});
```

File: `index.ts`

``` TypeScript
import express from "express"
import { expressways } from "expressways";
const app = express();
const port = 3000

app.get("/", (req, res) => res.send("Hello World!"))

app.use("/test", expressways({
    methods: require("./routes")
}));

import("./routes").then( routes => {
    app.use("/test2", expressways({
        methods: routes,
        handlers: [
            (req, res, next) => {
                res.setHeader("X-expressways", "true"),
                next();
            }
        ]
    }));
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
```

## About

**expressways** is created and maintained by [Wictor Wilen](https://www.wictorwilen.se)

## License

MIT
