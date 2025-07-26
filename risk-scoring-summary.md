# Compound Protocol Risk Scoring - Executive Summary

## Data Collection Method
- **Protocol Focus**: Compound V2/V3 on Ethereum mainnet
- **Data Sources**: Transaction history from Compound Comptroller and cToken contracts
- **Time Frame**: All historical transactions for each wallet
- **Data Points**: Supply/borrow positions, liquidations, repayments, interest accrual

## Feature Selection Rationale
We selected 5 key risk categories based on DeFi lending best practices:

1. **Leverage Risk (35%)**: Most critical as it directly impacts liquidation probability
2. **Behavioral Risk (25%)**: Historical patterns predict future behavior
3. **Market Risk (20%)**: Asset diversity reduces systemic risk
4. **Liquidity Risk (10%)**: Large positions harder to unwind
5. **Technical Risk (10%)**: Complex strategies increase operational risk

## Scoring Method
- **Algorithm**: Weighted multi-factor risk model
- **Scale**: 0 (lowest risk) to 1000 (highest risk)
- **Normalization**: Min-max scaling with percentile ranking
- **Multipliers**: Recent activity (1.2x), crisis behavior (1.5x)

## Risk Indicators Justification

### Primary Indicators:
- **Borrow Utilization Ratio**: Industry-standard metric, directly correlates with liquidation risk
- **Liquidation History**: Strongest predictor of future liquidations
- **Asset Concentration**: Single-asset exposure amplifies market risk

### Secondary Indicators:
- **Repayment Patterns**: Similar to traditional credit scoring
- **Position Size**: Impacts protocol stability
- **Smart Contract Complexity**: Operational risk factor

## Results Summary
- **Total Wallets Analyzed**: 103
- **Average Risk Score**: 349
- **Risk Distribution**:
  - Low Risk (0-200): 25.2%
  - Moderate Risk (201-400): 41.7%
  - Elevated Risk (401-600): 22.3%
  - High Risk (601-800): 1.9%
  - Critical Risk (801-1000): 8.7%

## Key Findings
- Majority of wallets (67%) fall in low-to-moderate risk categories
- 8.7% of wallets show critical risk patterns requiring immediate attention
- High-risk wallets typically exhibit multiple red flags: high leverage, liquidation history, and concentrated positions

## Recommendations
1. Monitor critical-risk wallets for potential liquidation cascades
2. Implement dynamic risk limits based on score tiers
3. Consider risk-based interest rate adjustments
4. Regular re-scoring to capture behavioral changes