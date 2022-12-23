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
  return {
    points: points,
    click_match: sum,
    click_miss: sumMissClick === 1 ? 0 : sumMissClick,
  };
};

export const prime = (n) => {
  if (n <= 1) {
    return false;
  }
  if (n % 2 === 0) {
    return false;
  }
  let y = Math.round(Math.sqrt(n)),
    fats = [];
  for (let i = 1; i <= y; i++) {
    if (fats.length <= 1) {
      if (n % i === 0) {
        fats.push(i);
      }
    } else {
      break;
    }
  }
  if (fats.length === 1) {
    return true;
  } else {
    return false;
  }
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
