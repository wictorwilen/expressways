import "reflect-metadata";
import * as  core from "express-serve-static-core";
import { ParsedQs } from "qs";
import { RequestHandler } from "express";
/**
 * Defines an expressways route method
 * @param method HTTP method
 * @param name path of the route method
 * @param handler the Request Handler for the route method
 */
export const way = <Params extends core.Params = any, ReqBody = any, ResBody = any, Query = ParsedQs, Method extends 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head' = any>(
    method: Method,
    name: core.PathParams,
    handler: RequestHandler<Params, ResBody, ReqBody, Query>) => {
    Reflect.defineMetadata("method", method, handler);
    Reflect.defineMetadata("name", name, handler);
    return handler;
};
