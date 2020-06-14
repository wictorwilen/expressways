// SPDX-License-Identifier: MIT
// Copyright Wictor Wilén 2020

import { expresswaysOptions } from "./expresswaysOptions";
import * as express from "express";
import { way } from "./way";

/**
 * Dynamically creates an Express router
 * @param options an expressways options object
 */
export const expressways = (options: expresswaysOptions | express.RequestHandler): express.Router => {
    let router: express.Router = express.Router();
    if (!options) { throw "Options not specified"; }
    if (typeof options === "function") {
        const method: string = Reflect.getMetadata("method", options);
        const path: string = Reflect.getMetadata("name", options);
        if (method && path) {
            (router as any)[method](
                path,
                options);

        }
    } else {
        if (options && options.router) {
            router = options.router;
        }

        for (const methodName in options.ways) {
            const handler = options.ways[methodName];
            if (typeof handler === "function") {
                const method: string = Reflect.getMetadata("method", handler);
                const path: string = Reflect.getMetadata("name", handler);
                if (method && path) {
                    if (options.handlers) {
                        (router as any)[method](
                            path,
                            options.handlers,
                            handler);

                    } else {
                        (router as any)[method](
                            path,
                            handler);
                    }
                    if (options.log) {
                        options.log(`Method: ${method} at ${path}`);
                    }
                }
            }
        }
    }
    return router;
};
