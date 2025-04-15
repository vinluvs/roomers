const PaymentHistory = ({ tenantId }) => {
    // You can fetch payments from DB using tenantId
    const dummyHistory = [
      { date: "2025-03-01", amount: 8000 },
      { date: "2025-02-01", amount: 8000 },
    ];
  
    return (
      <div className="mt-6 p-4 bg-zinc-700 bg-opacity-10 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">📜 Past Payments</h2>
        {dummyHistory.map((payment, i) => (
          <div key={i} className="flex justify-between text-sm mb-1">
            <span>{payment.date}</span>
            <span>₹{payment.amount}</span>
          </div>
        ))}
      </div>
    );
  };
  export default PaymentHistory;
  