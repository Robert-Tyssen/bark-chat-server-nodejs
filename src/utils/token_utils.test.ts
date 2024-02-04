import { verifyAccessToken, createAccessToken } from "./token_utils";

describe('tokenUtils - create access token', () => {

  test('Should return token for userId', () => {
    const mockUserId = 'someUserId';
    const token = createAccessToken(mockUserId);
    expect(token).toBeTruthy;
  });

});

describe('tokenUtils - E2E create and verify', () => {

  test('Decoded user id should match id used to create token', () => {
    const mockUserId = 'someUserId';
    const token = createAccessToken(mockUserId);
    const decoded = verifyAccessToken(token);

    expect(decoded.userId).toEqual(mockUserId);
  });

});