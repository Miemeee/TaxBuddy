const revokedTokens = new Set();

export const blacklistToken = (token) => {
  if (!token) return;
  revokedTokens.add(token);
};

export const isTokenBlacklisted = (token) => {
  if (!token) return false;
  return revokedTokens.has(token);
};
