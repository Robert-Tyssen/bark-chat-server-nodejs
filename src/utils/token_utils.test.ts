import { getLoginToken } from "./token_utils";

describe('getLoginToken', () => {

  test('Should return token for userId', () => {
    const mockUserId = 'someUserId';
    const token = getLoginToken(mockUserId);
    expect(token).toBeTruthy;
  });
});