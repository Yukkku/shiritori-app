// 正しい単語の形式か判定して, 正しい形式なら読み取りやすい形にして返す
// 正しくない形式ならnullを返す
const checkLetters = (s: string): string | null => {
  s = s.trim().normalize("NFKC").toUpperCase();
  if (!/^[A-Z]+$/u.test(s)) {
    return null;
  }
  return s;
};

export const lastChar = (s: string): string | null => {
  const t = checkLetters(s);
  if (t == null) return null;
  return t.at(-1)!;
};

export const firstChar = (s: string): string | null => {
  const t = checkLetters(s);
  if (t == null) return null;
  return t[0];
};

export const dropout = "X";

export const gametitle = "Shiritori";

export default {
  firstChar,
  lastChar,
  dropout,
  gametitle,
};
