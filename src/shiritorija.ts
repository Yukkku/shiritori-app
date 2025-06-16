// 正しい単語の形式か判定して, 正しい形式なら読み取りやすい形にして返す
// 正しくない形式ならnullを返す
const checkKanas = (s: string): string | null => {
  s = s.normalize("NFKC")
    .replaceAll('゛', "\u3099")
    .replaceAll("゜", "\u309a")
    .normalize("NFKD");
  if (!/^([ぁ-ちつ-ゖァ-チツ-ヶ][\u3099\u309a]?ー?[っッ]?)+$/u.test(s)) {
    return null;
  }
  return s;
};

const normalizeKana = (s: string): string => {
  const smalls = "ぁぃぅぇぉゕゖっゃゅょ";
  const bigs = "あいうえおかけつやゆよ";
  if (/[ァ-ヶ]/.test(s)) {
    s = String.fromCodePoint(s.codePointAt(0)! - 96);
  }
  if (smalls.includes(s)) {
    return bigs[smalls.indexOf(s)];
  } else {
    return s;
  }
};

// しりとりで「終わりの文字」と解釈されるものを返す
// "かぎ" -> "き"
// "はいきょ" -> "よ"
// "サンバ" -> "は"
// "ヒーロー" -> "ろ"
export const lastChar = (s: string): string | null => {
  const t = checkKanas(s);
  if (t == null) return null;
  return normalizeKana(t.match(/([ぁ-ちつ-ゖァ-チツ-ヶ])[\u3099\u309a]?ー?[っッ]?$/u)![1]);
};

// しりとりで「始めの文字」と解釈されるものを返す
// "ガス" -> "か"
// "サービス" -> "さ"
// "しょうぎ" -> "し"
// "さっぽろ" -> "さ"
export const firstChar = (s: string): string | null => {
  const t = checkKanas(s);
  if (t == null) return null;
  return normalizeKana(t.match(/^([ぁ-ちつ-ゖァ-チツ-ヶ])[\u3099\u309a]?ー?[っッ]?/u)![1]);
};

export const dropout = "ん";

export const gametitle = "しりとり";

export default {
  firstChar,
  lastChar,
  dropout,
  gametitle,
};
