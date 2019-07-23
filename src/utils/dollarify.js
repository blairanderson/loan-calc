const DOLLARIFY = /\B(?=(\d{3})+(?!\d))/g;

export function dollarify(num, hideCents = false) {
  const dollared =
    typeof num.toFixed === "function"
      ? `$${num
          .toFixed(2)
          .toString()
          .replace(DOLLARIFY, ",")}`
      : `$${num.toString().replace(DOLLARIFY, ",")}`;

  if (hideCents) {
    const dollarsAndCents = dollared.split(".");
    return dollarsAndCents[1] === "00" ? dollarsAndCents[0] : dollared;
  }
  return dollared;
}