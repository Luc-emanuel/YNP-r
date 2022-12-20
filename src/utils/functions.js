//
export const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const calcPoints = (card, first, timeRange, color) => {
  let qty = card.length;
  let sum = 0,
    sumMissClick = 1;
  let res;
  if (qty) {
    if (qty > 0) {
      card.map((item, index) => {
        if (item === first) {
          sum += 1;
        } else {
          sumMissClick += 1;
        }
        return null;
      });
    }
    res = sum / timeRange;
  } else {
    res = 0;
  }
  let points =
    Math.round(
      ((100000 * (Math.round(res * 10000) / 10000)) / sumMissClick) * 10
    ) / 10;
  if (!color) {
    points = points * 1.5;
    points = Math.round(points * 10) / 10;
  }
  return { points: points, click_match: sum, click_miss: sumMissClick };
};
