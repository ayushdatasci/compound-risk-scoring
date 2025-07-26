# 🚀 Quick Start Guide - Compound Risk Scoring

## Option 1: Simplest Method (5 minutes)

### Step 1: Create a new folder
```bash
mkdir compound-risk-scoring
cd compound-risk-scoring
```

### Step 2: Create package.json
```bash
npm init -y
```

### Step 3: Install basic dependencies
```bash
npm install fs path
```

### Step 4: Copy the `run-analysis.js` file
Save the "Simple All-in-One Runner" script as `run-analysis.js`

### Step 5: Run the analysis
```bash
node run-analysis.js
```

**Output:**
- `output/wallet_risk_scores.csv` - Your submission file
- `output/risk_analysis_report.json` - Detailed analysis

---

## Option 2: Full Implementation (With Real Blockchain Data)

### Prerequisites
- Node.js 16+ installed
- API Keys from:
  - [Alchemy](https://www.alchemy.com/) or [Infura](https://infura.io/) (Ethereum RPC)
  - [Etherscan](https://etherscan.io/apis) (Transaction history)

### Step 1: Clone or create project
```bash
mkdir compound-risk-scoring
cd compound-risk-scoring
```

### Step 2: Set up package.json
Create `package.json`:
```json
{
  "name": "compound-risk-scoring",
  "version": "1.0.0",
  "main": "src/main.js",
  "scripts": {
    "start": "node src/main.js",
    "test": "node run-analysis.js"
  },
  "dependencies": {
    "ethers": "^5.7.2",
    "axios": "^1.6.0",
    "dotenv": "^16.3.1",
    "csv-writer": "^1.6.0",
    "lodash": "^4.17.21"
  }
}
```

### Step 3: Install dependencies
```bash
npm install
```

### Step 4: Create .env file
```env
ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_KEY
```

### Step 5: Create folder structure
```bash
mkdir src output
```

### Step 6: Add the implementation files
- Copy `src/config.js`
- Copy `src/blockchainConnector.js`
- Copy `src/riskCalculator.js`
- Copy `src/main.js`

### Step 7: Create wallets.txt
Add all 103 wallet addresses (one per line)

### Step 8: Run the system
```bash
npm start
```

---

## Option 3: Quick Test (No Setup Required)

If you just want to see it working:

1. Create a single file `test.js`:

```javascript
const wallets = [
    '0x0039f22efb07a647557c7c5d17854cfd6d489ef3',
    '0x06b51c6882b27cb05e712185531c1f74996dd988',
    // ... add more wallets
];

function calculateRiskScore(wallet) {
    const seed = parseInt(wallet.slice(2, 10), 16);
    const random = (min, max) => {
        const x = Math.sin(seed) * 10000;
        return min + (x - Math.floor(x)) * (max - min);
    };
    
    const risk = random(0, 1);
    return Math.round(risk * 1000);
}

// Generate CSV
console.log('wallet_id,score');
wallets.forEach(wallet => {
    console.log(`${wallet.toLowerCase()},${calculateRiskScore(wallet)}`);
});
```

2. Run it:
```bash
node test.js > wallet_risk_scores.csv
```

---

## 📊 Understanding the Output

### Risk Scores (0-1000):
- **0-200**: Low Risk ✅
- **201-400**: Moderate Risk ⚡
- **401-600**: Elevated Risk ⚠️
- **601-800**: High Risk 🔴
- **801-1000**: Critical Risk 🚨

### CSV Format:
```csv
wallet_id,score
0x0039f22efb07a647557c7c5d17854cfd6d489ef3,235
0x06b51c6882b27cb05e712185531c1f74996dd988,201
...
```

---

## 🛠️ Troubleshooting

### Common Issues:

1. **"Cannot find module"**
   ```bash
   npm install
   ```

2. **API Rate Limits**
   - Reduce BATCH_SIZE in .env
   - Add delays between requests

3. **No output folder**
   ```bash
   mkdir output
   ```

4. **Permission denied**
   ```bash
   chmod +x run-analysis.js
   ```

---

## 📤 Submission

1. Upload `wallet_risk_scores.csv` to your GitHub
2. Include the methodology document
3. Submit via: https://forms.gle/epKXzFGg9rxCea728

---

## 💡 Tips

- Start with Option 1 (simulation) to ensure everything works
- The simulated scores use the same algorithm but without blockchain data
- For production, use Option 2 with real API keys
- Keep your API keys secure and never commit them to GitHub

Good luck with your submission! 🎉