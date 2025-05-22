import { useState } from 'react';
import axios from 'axios';

function App() {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState('');

  const fetchBalance = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/balance/${address}`);
      setBalance(res.data.balance);
      setError('');
    } catch (err) {
      setBalance(null);
      setError(err.response?.data?.error || 'Error fetching balance');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4" style={{width: "100vw", height: "100vh", display: "flex", flexDirection: "column" , alignItems:"center", justifyContent: "center"}}>
      <h1 className="text-2xl font-bold">ETH Balance Checker</h1>
      <div>
        <input
        type="text"
        placeholder="Enter ETH Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border p-6 rounded-md w-80"
        style={{padding: "10px"}}
      />
      <button onClick={fetchBalance} className="bg-blue-600 text-white px-4 py-2 rounded">
        Get Balance
      </button>
      {balance && <p>Balance: {balance} ETH</p>}
      {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}

export default App;
