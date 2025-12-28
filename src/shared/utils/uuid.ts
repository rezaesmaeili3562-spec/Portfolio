export const v4 = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return Math.random().toString(36).substring(2, 12);
};

export { v4 as uuid };
