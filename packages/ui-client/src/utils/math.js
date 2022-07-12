const { sin } = Math;

export const fract = (num) => {
  let sign = 0;

  if (num < 0) {
    num = -num;
    sign = 1;
  }

  if (num % 1 !== 0 && num < 999999999999999934464) {
    let toFract = num - Math.floor(num);
    return Math.abs(sign - toFract);
  }

  if (num < 1) {
    return Math.abs(sign - num);
  }

  return 0;
};

export const dot = (a, b) =>
  a.map((x, i) => a[i] * b[i])
    .reduce((m, n) => m + n);

export const randomBySeed = (seed = 0) => {
  return fract(
    sin(
      dot([seed + 123.8612, seed * 3.6012], [12.9898, 78.233]),
    ) * (
      43758.5453123 + seed
    ),
  );
};
