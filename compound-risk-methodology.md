# Compound Protocol Wallet Risk Scoring Methodology

## Executive Summary
This document outlines a comprehensive risk scoring framework for evaluating wallet addresses based on their interactions with Compound V2/V3 protocols. The scoring system assigns each wallet a risk score from 0 (lowest risk) to 1000 (highest risk).

## Data Collection Method

### 1. Transaction Data Sources
- **Compound V2 Contract**: `0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B` (Comptroller)
- **Compound V3 Contract**: `0xc3d688B66703497DAA19211EEdff47f25384cdc3` (USDC Comet)
- **cToken Contracts**: All supported assets (cDAI, cUSDC, cETH, etc.)

### 2. Data Points Collected
For each wallet, we collect:
- Supply transactions (deposits)
- Borrow transactions
- Repayment history
- Liquidation events
- Interest accrual patterns
- Collateral management behavior
- Transaction timing and frequency

## Feature Selection Rationale

### 1. **Leverage Risk Features** (Weight: 35%)
- **Current Borrow Utilization**: Ratio of borrowed value to supplied collateral
- **Historical Max Utilization**: Highest utilization ratio reached
- **Proximity to Liquidation**: How close the wallet gets to liquidation threshold

**Rationale**: High leverage indicates aggressive risk-taking and vulnerability to market volatility.

### 2. **Behavioral Risk Features** (Weight: 25%)
- **Liquidation History**: Number and value of past liquidations
- **Repayment Patterns**: Consistency and timeliness of loan repayments
- **Position Duration**: Average time positions are held

**Rationale**: Past behavior is a strong predictor of future risk.

### 3. **Market Risk Features** (Weight: 20%)
- **Asset Concentration**: Diversity of supplied/borrowed assets
- **Volatile Asset Exposure**: Percentage in high-volatility assets
- **Correlation Risk**: Borrowed vs supplied asset correlations

**Rationale**: Concentrated positions and volatile assets increase risk exposure.

### 4. **Liquidity Risk Features** (Weight: 10%)
- **Transaction Frequency**: Activity level on the protocol
- **Position Size**: Total value locked relative to market averages
- **Network Effects**: Interactions with other risky wallets

**Rationale**: Large, illiquid positions pose systemic risks.

### 5. **Technical Risk Features** (Weight: 10%)
- **Smart Contract Interactions**: Complexity of transactions
- **Flash Loan Usage**: Frequency and size of flash loans
- **Protocol Version Migration**: Usage of older protocol versions

**Rationale**: Complex strategies and outdated protocols increase operational risk.

## Scoring Method

### Risk Score Calculation Formula

```
Risk Score = Σ(Feature_Weight × Normalized_Feature_Score × Risk_Multiplier)
```

### Normalization Process
1. **Min-Max Scaling**: Each feature is normalized to 0-1 range
2. **Percentile Ranking**: Position relative to other wallets
3. **Exponential Scaling**: For critical risk factors (e.g., liquidations)

### Risk Multipliers
- Recent activity (< 30 days): 1.2x
- Inactive accounts (> 180 days): 0.8x
- Crisis period behavior: 1.5x

### Score Ranges
- **0-200**: Low Risk - Conservative users with minimal leverage
- **201-400**: Moderate Risk - Active users with controlled exposure
- **401-600**: Elevated Risk - Aggressive strategies but managed
- **601-800**: High Risk - Significant exposure to liquidation
- **801-1000**: Critical Risk - History of liquidations or extreme leverage

## Risk Indicators Justification

### 1. **Borrow Utilization** (Most Critical)
- Directly correlates with liquidation probability
- Industry standard metric for lending risk
- Real-time indicator of wallet health

### 2. **Liquidation History** (Highly Predictive)
- Strong predictor of future liquidations
- Indicates risk management capabilities
- Permanent record on blockchain

### 3. **Asset Diversity** (Systemic Risk)
- Reduces correlation risk
- Indicates sophisticated risk management
- Buffers against single asset crashes

### 4. **Repayment Behavior** (Credit Risk)
- Similar to traditional credit scoring
- Indicates financial discipline
- Predictive of default probability

### 5. **Position Size** (Market Impact)
- Large positions harder to unwind
- Potential for cascading liquidations
- Systemic risk to protocol

## Implementation Considerations

### Data Quality
- Filter out dust transactions (< $10)
- Account for gas costs in profitability
- Adjust for protocol parameter changes

### Temporal Factors
- Weight recent activity more heavily
- Account for market conditions
- Consider protocol TVL changes

### Edge Cases
- New wallets with limited history
- Wallets migrating between protocols
- Smart contract wallets vs EOAs

## Validation Approach
- Backtest against historical liquidations
- Compare with on-chain health factors
- Validate against known risky addresses
- Cross-reference with other DeFi protocols