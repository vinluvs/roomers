const RentPayment = ({ property }) => (
    <div className="mt-6 p-4 bg-white bg-opacity-10 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">💳 Pay Rent</h2>
      <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
        Pay ₹{property.rent}
      </button>
    </div>
  );
  export default RentPayment;
  