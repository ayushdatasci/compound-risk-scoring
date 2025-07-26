# 🚀 Quick Start Guide - Compound Risk Scoring

# Simplest Method (5 minutes)

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
