import "reflect-metadata";
import { PathParams } from "express-serve-static-core";
import { RequestHandler } from "express";
/**
 * Defines an expressways route method
 * @param method HTTP method
 * @param name path of the route method
 * @param handler the Request Handler for the route method
 */
export const method = <Method extends 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' = any>(
    method: Method,
    name: PathParams,
    handler: RequestHandler) => {
    Reflect.defineMetadata("method", method, handler);
    Reflect.defineMetadata("name", name, handler);
    return handler;
};
