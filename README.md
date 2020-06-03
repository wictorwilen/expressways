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

### Define your route methods using `way()`

Each method you want to expose through your **expressways** route is exported and declared using the `way()`.

You can export multiple or individual methods per file.

``` TypeScript
import { way } from "expressways";

export const get1 = way("get", "/", (req, res, next) => {
    res.send("Foo");
});
```

### Strongly typed paths using `way<>`

You can use strongly typed parameters, request bodies, response bodies and query string objects using a templated `way` approach.

The following example specifies strongly typed arguments that allows you to have strict type checking while writing your code, to minimize errors.

``` TypeScript
export const postMethod2 = way<{ param: string }, { data: string }, { result: string }, { query: string }>("post", "/:param", (req, res, next) => {
    res.send({ result: req.body.data });
});

```

The arguments to the `way<Params, ReqBody, ResBody, Query, Method>(method, name, handler)` method are as follows:

| Argument | Description |
|---|---|
| `Params` | Defines the path parameters to be used - each object int `Params` must have a corresponding variable in the  `name` property  |
| `ReqBody`  | Defines the structure of the request body |
| `ResBody` | Defines the structure of the response body |
| `Query` | Defines the query string parameters |


### Use `expressways()` to create a dynamic Express router

To add the defined methods to an Express router you use the `expressways()` automagic router as follows.

``` TypeScript
import express from "express";
import { expressways } from "expressways";

const app = express();

app.use("/test", expressways({
    ways: require("./routes")
}));
```

### `expressways` options

The following options are available for **expressways** Router generation

| Option | Required | Description |
|---|---|---|
| `ways` | yes | A `require`, `import` or an object of the route methods  |
| `handlers`  | no | An array of additional Express request handlers |
| `router` | no | An existing Express Router to use, instead of creating a new one |
| `log` | no | Method for logging, for instance use `console.log` or `debug` |

## Sample application

File: `ways.ts`

``` TypeScript
import { way } from "expressways";

export const get1 = way("get", "/", (req, res, next) => {
    res.send("Foo");
});

export const get2 = way("get", "/two", async (req, res, next) => {
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
    ways: require("./ways")
}));

import("./ways").then( routes => {
    app.use("/test2", expressways({
        ways: routes,
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

A full example is also available at https://github.com/wictorwilen/expressways-sample/

## About

**expressways** is created and maintained by [Wictor Wilen](https://www.wictorwilen.se)

## License

MIT
