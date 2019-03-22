const DOLLARIFY = /\B(?=(\d{3})+(?!\d))/g;

export function dollarify(num) {
  return typeof num.toFixed === "function"
    ? `$${num
        .toFixed(2)
        .toString()
        .replace(DOLLARIFY, ",")}`
    : `$${num.toString().replace(DOLLARIFY, ",")}`;
}

function Calculator(props) {
  const { amount, duration, interestRate } = props;
  const payments = [];
  if (amount > 0 && duration > 0 && interestRate > 0) {
    const payments = Array.from({ length: duration + 1 });
    const r = interestRate / 100 / 12;

    const monthlyRate = (r / (1 - Math.pow(1 + r, -duration))) * amount;

    const total = monthlyRate * duration;

    var remainingPrincipal = amount;

    payments[0] = {
      index: 0,
      amount: 0,
      principal: 0,
      interest: 0,
      remainingAmount: total
    };

    for (var i = 1; i <= duration; i++) {
      var interest = remainingPrincipal * r;

      payments[i] = {
        index: i,
        amount: monthlyRate,
        principal: monthlyRate - interest,
        interest: interest,
        remainingAmount: total - monthlyRate * i
      };
      remainingPrincipal -= monthlyRate - interest;
    }

    return {
      payments,
      total: total,
      monthlyRate: monthlyRate,
      interest: total - amount,
      excel: `=PMT(${(interestRate / 100).toFixed(
        4
      )}/12,${duration},-${amount},0,0)`
    };
  } else {
    return { payments: [], total: 0, monthlyRate: 0, interest: 0, excel: "" };
  }
}

export default Calculator;
