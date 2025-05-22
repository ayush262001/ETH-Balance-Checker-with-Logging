require('dotenv').config();
require('dd-trace').init(); // Datadog APM
const express = require('express');
const Web3 = require('web3');
const cors = require('cors');

const app = express();
app.use(cors());


const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_URL));

app.get('/balance/:address', async (req, res) => {
  try {
    const { address } = req.params;
    if (!web3.utils.isAddress(address)) {
      return res.status(400).json({ error: 'Invalid address' });
    }

    const balanceWei = await web3.eth.getBalance(address);
    const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
    res.json({ address, balance: balanceEth });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
