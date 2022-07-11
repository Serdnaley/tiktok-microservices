export const formatNumber = (number, fractionDigits = 0) => {
  if (!Number.isFinite(number)) return 0;

  const reverse = (str) => [...str].reverse().join('');
  const splitWithSpaces = (str) =>
    reverse(
      reverse(str)
        .match(/.{1,3}/g)
        .join(' '),
    );

  const [left, right = ''] = number.toFixed(fractionDigits).split('.');
  const leftFormatted = +left < 10000 ? left : splitWithSpaces(left);
  const rightFormatted = right.replace(/^0+/, '').replace(/0+$/, '');

  return rightFormatted ? `${leftFormatted}.${rightFormatted}` : leftFormatted;
};
