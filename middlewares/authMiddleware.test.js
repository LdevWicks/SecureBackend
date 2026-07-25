const jwt = require('jsonwebtoken');
const { authMiddleware } = require('./authMiddleware');

jest.mock('jsonwebtoken');

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('authMiddleware', () => {
  const next = jest.fn();

  beforeEach(() => {
    next.mockClear();
  });

  it('rejects requests with no Authorization header', () => {
    const req = { header: () => undefined };
    const res = mockRes();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ msg: 'No token, authorization denied' });
    expect(next).not.toHaveBeenCalled();
  });

  it('rejects an Authorization header with no token part', () => {
    const req = { header: () => 'Bearer' };
    const res = mockRes();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('rejects an invalid or expired token', () => {
    jwt.verify.mockImplementation(() => {
      throw new Error('invalid signature');
    });
    const req = { header: () => 'Bearer bad.token.here' };
    const res = mockRes();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Token is not valid' });
    expect(next).not.toHaveBeenCalled();
  });

  it('attaches the decoded userId and calls next() for a valid token', () => {
    jwt.verify.mockReturnValue({ userId: 'user-123' });
    const req = { header: () => 'Bearer good.token.here' };
    const res = mockRes();

    authMiddleware(req, res, next);

    expect(req.user).toBe('user-123');
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });
});
