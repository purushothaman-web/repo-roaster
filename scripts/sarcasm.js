export function roast(msg, level = 1) {
  const roasts = {
    0: msg,
    1: `⚠️ ${msg}`,
    2: `🔥 ${msg} — future you is disappointed`
  };
  return roasts[level] || roasts[1];
}
