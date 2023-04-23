const Amortization = ({ payments, excel, inputClass, dollarify }) => {
  return (
    <>
      <div>
        <div>Excel Function</div>
        <input
          readOnly={true}
          style={{ userSelect: "all" }}
          type="text"
          value={excel}
          className={inputClass}
        />
      </div>

      {payments.length > 0 && (
        <table className="table w-100 table-hover tr collapse">
          <thead>
            <tr>
              <th className="w-10 tl">#</th>
              <th className="w-20">Payment</th>
              <th className="w-20">Principal</th>
              <th className="w-20">Interest</th>
              <th className="w-30">Remaining Debt</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(function ({
              id,
              index,
              amount,
              principal,
              interest,
              remainingAmount,
            }) {
              return (
                <tr key={id} className="striped--near-white">
                  <td className="tl bb b--black-50">{index}</td>
                  <td className="bb b--black-50">{dollarify(amount)}</td>
                  <td className="bb b--black-50">{dollarify(principal)}</td>
                  <td className="bb b--black-50">{dollarify(interest)}</td>
                  <td className="bb b--black-50">
                    {dollarify(remainingAmount)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Amortization;
