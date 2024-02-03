import { notImplemented } from "./not_implemented";
import { NextFunction, Request, Response } from 'express';

describe('notImplemented middleware', () => {

  test('Should fail for any request', () => {

    // Mock request
    const req: Partial<Request> = {};

    // Mock response
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    const next: NextFunction = jest.fn();

    notImplemented(req as Request, res as Response, next);

    // Expect a 501 response code with a 'not implemented' message
    expect(res.status).toHaveBeenCalledWith(501);
    expect(res.json).toHaveBeenCalledWith({ message: 'Not Implemented' });

    // Expect the middleware next function to not be called
    expect(next).not.toHaveBeenCalled();

  });

});