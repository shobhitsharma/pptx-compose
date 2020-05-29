/**
 * @func uuid
 * Generates a random unique ID
 *
 * @returns {string}
 */

export const uuid = () => {
  const primary = (Math.random() * 46656) | 0;
  const secondary = (Math.random() * 46656) | 0;
  const p1 = ("000" + primary.toString(36)).slice(-3);
  const p2 = ("000" + secondary.toString(36)).slice(-3);
  return p1 + p2;
};
