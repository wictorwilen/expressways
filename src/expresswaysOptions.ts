import { RequestHandler, Router } from "express";

/**
 * expressways options 
 */
export interface expresswaysOptions {
    /**
     * The route methods to use
     */
    methods: any;

    /**
     * Optional additional Express Request handlers
     */
    handlers?: Array<RequestHandler>;

    /**
     * Optional output logging helper method
     */
    log?: (message?: any, ...optionalParams: any[]) => void;

    /**
     * Optional use an existing router, of not a new one will be created
     */
    router?: Router;
}