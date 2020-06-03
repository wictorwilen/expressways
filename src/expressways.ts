import { expresswaysOptions } from "./expresswaysOptions";
import * as express from "express";

/**
 * Dynamically creates an Express router
 * @param options an expressways options object
 */
export const expressways = (options: expresswaysOptions): express.Router => {
    let router: express.Router;
    if (options.router) {
        router = options.router;
    } else {
        router = express.Router();
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
    return router;
};
