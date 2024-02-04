import { NextFunction, Request, Response } from "express";
import { authMiddleware } from "./auth_middleware";
import { createAccessToken } from "../utils/token_utils";

describe('authMiddleware', () => {

  test('Should return 401 for missing token', () => {

    // Mock request with no token provided
    const mockReq: Partial<Request> = {};
    mockReq.headers = {};
    mockReq.headers.authorization = '';

    // Mock response with status and json fields
    const mockRes: Partial<Response> = {};
    mockRes.status = jest.fn().mockReturnValue(mockRes);
    mockRes.json = jest.fn().mockReturnValue(mockRes);

    // Mock next function
    const mockNext: NextFunction = jest.fn();

    // Call middleware
    authMiddleware(mockReq as Request, mockRes as Response, mockNext);

    // Expect the desired status code, error message, and that next function is not called
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Missing token' });
    expect(mockNext).not.toHaveBeenCalled();

  });

  test('Should return 401 for invalid token', () => {

    // Mock request with no token provided
    const mockReq: Partial<Request> = {};
    mockReq.headers = {};
    mockReq.headers.authorization = 'Bearer definitely-not-a-token';

    // Mock response with status and json fields
    const mockRes: Partial<Response> = {};
    mockRes.status = jest.fn().mockReturnValue(mockRes);
    mockRes.json = jest.fn().mockReturnValue(mockRes);

    // Mock next function
    const mockNext: NextFunction = jest.fn();

    // Call middleware
    authMiddleware(mockReq as Request, mockRes as Response, mockNext);

    // Expect the desired status code, error message, and that next function is not called
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid token' });
    expect(mockNext).not.toHaveBeenCalled();

  });

  test('Should call next for valid token', () => {

    // Mock token
    const userId = 'someUserId';
    const mockToken = createAccessToken(userId);

    // Mock request with no token provided
    const mockReq: Partial<Request> = {};
    mockReq.headers = { authorization: `Bearer ${mockToken}` };
    mockReq.body = {};

    // Mock response with status and json fields
    const mockRes: Partial<Response> = {};
    mockRes.status = jest.fn().mockReturnValue(mockRes);
    mockRes.json = jest.fn().mockReturnValue(mockRes);

    // Mock next function
    const mockNext: NextFunction = jest.fn();

    // Call middleware
    authMiddleware(mockReq as Request, mockRes as Response, mockNext);

    // Expect no status code, userId added to body, and that next function is called
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockReq.body.userId).toEqual(userId);
    expect(mockNext).toHaveBeenCalled();

  });

});