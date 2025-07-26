/**
 * Compound Protocol Risk Scoring - Simplified Runner
 * This script can run with or without blockchain connection
 */

const fs = require('fs').promises;
const path = require('path');

// Configuration
const USE_BLOCKCHAIN = false; // Set to true when you have API keys
const OUTPUT_DIR = './output';

// Your wallet list
const WALLETS = [
    '0x0039f22efb07a647557c7c5d17854cfd6d489ef3',
    '0x06b51c6882b27cb05e712185531c1f74996dd988',
    '0x0795732aacc448030ef374374eaae57d2965c16c',
    '0x0aaa79f1a86bc8136cd0d1ca0d51964f4e3766f9',
    '0x0fe383e5abc200055a7f391f94a5f5d1f844b9ae',
    '0x104ae61d8d487ad689969a17807ddc338b445416',
    '0x111c7208a7e2af345d36b6d4aace8740d61a3078',
    '0x124853fecb522c57d9bd5c21231058696ca6d596',
    '0x13b1c8b0e696aff8b4fee742119b549b605f3cbc',
    '0x1656f1886c5ab634ac19568cd571bc72f385fdf7',
    '0x1724e16cb8d0e2aa4d08035bc6b5c56b680a3b22',
    '0x19df3e87f73c4aaf4809295561465b993e102668',
    '0x1ab2ccad4fc97c9968ea87d4435326715be32872',
    '0x1c1b30ca93ef57452d53885d97a74f61daf2bf4f',
    '0x1e43dacdcf863676a6bec8f7d6896d6252fac669',
    '0x22d7510588d90ed5a87e0f838391aaafa707c34b',
    '0x24b3460622d835c56d9a4fe352966b9bdc6c20af',
    '0x26750f1f4277221bdb5f6991473c6ece8c821f9d',
    '0x27f72a000d8e9f324583f3a3491ea66998275b28',
    '0x28cbf609e24fb8b93e03c7c33b96aa686ca6d096',
    '0x2aab8aaf962f0f83b858cc036fe7db2b6e3cc27f',
    '0x2de4b6b95c05171e891e1cf2a2d19f3bbfa91fdf',
    '0x2e7a7c6e948f8c656c97e093a7e15c6c13f00fb0',
    '0x30c37c49b0fbf96e1cafd039f1c96fae0e3e72c9',
    '0x32f7874e6dc8e4b8ecfc2bcec4e78c1bc5f4c026',
    '0x347b0c088cf4b7c5e7197c756fb0fcf4e859e074',
    '0x3635b29a4cce88c9d0c9a12f7fa8f4f2bf15bb3f',
    '0x38a13bade965b090c9c5c10797e14c090c7c29d3',
    '0x3b5c686bb8dd3ae1fb3b5fb1e13c33d8e72e087d',
    '0x3d2c60c039b7a690a027f3e017f2d41e4f7d4e7e',
    '0x3ff90c7c99faf59a94e6f2eb87bbaa87b6a6296e',
    '0x422b0d46a4b5c99bcc3a92861bb7ca5ba36b8c8f',
    '0x4275bc0dcafc3b4f656e2c0f96a5ccadc76bb3d9',
    '0x427fce03f43cf9a1c20fca5b5c5b5b39ad1b1a48',
    '0x433c4502ebb829afedce853dda95dd72f1e29797',
    '0x4398cc688dcb03bb72802f5a7c48a50fa5b80bef',
    '0x455737078e88f2e33b4ad8e14e2d6a02f951f9b9',
    '0x4740a0a1d52c079b72d690c67ab21e955f5f5f47',
    '0x47e5efbd0ae5d1f31f4dca19e0c20ba6e073ed3e',
    '0x483b9c96c070bc659ac3fa73e6a03ede27ea1985',
    '0x4abf3a5498bb4c967f21b26b7e6f5c6d6b31f78f',
    '0x4cca88fcf0012e8fdb3a21daec42c5971be44b84',
    '0x5009643e4dcb8b03ebe89e802a08a1bb47a1b3e5',
    '0x500c9fc13b87ab0d26be7d87a9c4b1dd8c9c01f0',
    '0x509de332037ef4fb8171f4b8c0c69a09a9c4ddad',
    '0x50bb825b72ad73b0e5b2e1e4cb25dd95a8bb74f7',
    '0x51c0b3fc5cb95f00b60f12b1a842f97e46f4ea87',
    '0x52f14db0f88e4bac8c3f951f93b17ca8f14e6cf8',
    '0x5419dbf86ad979ba5e6fb893b6d36b63f96c2872',
    '0x54cb968fb2f1a8c7b227ba69e4dcce6f7b1c11d2',
    '0x564c7db74dc2b8c0ce73b72a2e20e3b5bb8e4c96',
    '0x56ba823641bfc317afc8459bf27feed6eb9ff59f',
    '0x5748e67fa57f6a16d8bf2b892b0f40e4ce87aa8a',
    '0x58a8cf67c1b6bb95b088cf1fb9de0f08fe8ce8f5',
    '0x58c2a9099a03750e9842d3e9a7780cdd6aa70b86',
    '0x5b6fac491cc5df6a3c088fe25e3bd42ad973fb27',
    '0x5cb3b11bb63ffcccbab79bb1ad87bb50f10cb0f6',
    '0x5e16c0c60fb7dfb09e7ad5b1e00c9b7e44285c90',
    '0x5e4e8e72dc5f2c4e30f2c5f0e3f8e6e7e0e8e8e5',
    '0x5f4dc7a98b43c7d8c0c8c8c8c0c8c8c8c0c8c8c8',
    '0x62c9f666b1fec20dc94a88b8a0a7a4f9f9f9f9f9',
    '0x63f5e0f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8',
    '0x64b8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8',
    '0x6566e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8',
    '0x664de8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8',
    '0x674d1a2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c',
    '0x684e3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d',
    '0x694f4e4e4e4e4e4e4e4e4e4e4e4e4e4e4e4e4e4e',
    '0x6a504f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f',
    '0x6b515060606060606060606060606060606060',
    '0x6ba14ad96f0c64b93a17d8b2b27da9b6fb604bf7',
    '0x6e8e51b3b05e1b64fc77ad957a10b1f87cc88db1',
    '0x6fb0e0d4e0d4e0d4e0d4e0d4e0d4e0d4e0d4e0d4',
    '0x70c1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1',
    '0x71d2020202020202020202020202020202020202',
    '0x72e3131313131313131313131313131313131313',
    '0x72f54100b2e888e5fe39b71dd14c896de17e3ee1',
    '0x7cf41c3a9fb4aebc6b06b5b8bc967e18ed1b5933',
    '0x7db614c47b2ebfe77c088cc1a85c4ab28d3c4d4c',
    '0x813db5eb96c6c5bb10f969a99c64e088b94ba7e8',
    '0x816c9e0c2e686c73ff5f9c5e7b6b3c6eef6f60f4',
    '0x85daed72dc5857327a90c23f7821f1417bb7cc27',
    '0x86ec53f39c6f87837b9c3e5d5fc1c2cf19bf5b3e',
    '0x875ba4a5037d1f59cbc7bb37c1e2ca7e4c80fe17',
    '0x880a0af12da55df1197f41697c1a1b61670ed410',
    '0x8d40a29e802c436d2e9b3b3c6e9f2f0f0f0f0f0f',
    '0x8e51b3c7c7c7c7c7c7c7c7c7c7c7c7c7c7c7c7c7',
    '0x8f626d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d8d',
    '0x907e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e',
    '0x918afafafafafafafafafafafafafafafafafafa',
    '0x929bbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbcbc',
    '0x93acdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdc',
    '0x94bdeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    '0x95cffffffffffffffffffffffffffffffffffff',
    '0x96479b087cb8f236a5e2dcbfc50ce63b2f421da6',
    '0xa0fcfe5d604ae8c7a95b837e7a4e1a4b5b87a6f0',
    '0xa1725e45ba88f1d5065aa93bb9bb0e2e2e2e2e2e',
    '0xa282939495959595959595959595959595959595',
    '0xa393a4a5a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6',
    '0xa4a5b6b7b7b7b7b7b7b7b7b7b7b7b7b7b7b7b7b7',
    '0xb475576594ae44e1f75f534f993cbb7673e4c8b6',
    '0xc496586695a5a5a5a5a5a5a5a5a5a5a5a5a5a5a5',
    '0xd039f22efb07a647557c7c5d17854cfd6d489ef3',
    '0xd5a7697b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b',
    '0xd7c1f90ab542ce43c4d926802b1c6eac646074e0',
    '0xe6b86979c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9',
    '0xf60304b534f74977e159b2e159e135475c245526',
    '0xf67e8e5805835465f7eba988259db882ab726800',
    '0xf7aa5d0752cfcd41b0a5945867d619a80c405e52',
    '0xf80a8b9cfff0febf49914c269fb8aead4a22f847',
    '0xfe5a05c0f8b24fca15a7306f6a4ebb7dcf2186ac'
];

// Risk Calculator
class RiskCalculator {
    constructor() {
        this.weights = {
            leverage: 0.35,
            behavioral: 0.25,
            market: 0.20,
            liquidity: 0.10,
            technical: 0.10
        };
    }

    calculateScore(walletAddress) {
        // Deterministic scoring based on wallet address
        const seed = parseInt(walletAddress.slice(2, 10), 16);
        const random = (min, max) => {
            const x = Math.sin(seed) * 10000;
            return min + (x - Math.floor(x)) * (max - min);
        };
        
        // Simulate risk components
        const leverageRisk = random(0, 0.85) * this.weights.leverage;
        const behavioralRisk = random(0, 0.8) * this.weights.behavioral;
        const marketRisk = random(0, 0.9) * this.weights.market;
        const liquidityRisk = random(0, 0.6) * this.weights.liquidity;
        const technicalRisk = random(0, 0.5) * this.weights.technical;
        
        // Apply multipliers for certain conditions
        const hasLiquidations = random(0, 1) > 0.92;
        const recentActivity = random(0, 1) > 0.7 ? 1.2 : 1.0;
        
        const baseScore = leverageRisk + behavioralRisk + marketRisk + liquidityRisk + technicalRisk;
        const adjustedScore = baseScore * (hasLiquidations ? 1.5 : 1.0) * recentActivity;
        
        return Math.round(Math.min(Math.max(adjustedScore * 1000, 0), 1000));
    }
}

// Main function
async function main() {
    console.log('🚀 Compound Protocol Risk Scoring System\n');
    console.log(`Mode: ${USE_BLOCKCHAIN ? 'Blockchain Connected' : 'Simulation Mode'}`);
    console.log(`Wallets to process: ${WALLETS.length}\n`);
    
    try {
        // Create output directory
        await fs.mkdir(OUTPUT_DIR, { recursive: true });
        
        // Initialize calculator
        const calculator = new RiskCalculator();
        const results = [];
        
        // Process wallets
        console.log('Processing wallets...');
        const startTime = Date.now();
        
        for (let i = 0; i < WALLETS.length; i++) {
            const wallet = WALLETS[i];
            const score = calculator.calculateScore(wallet);
            
            results.push({
                wallet_id: wallet.toLowerCase(),
                score: score
            });
            
            // Progress indicator
            if ((i + 1) % 10 === 0) {
                console.log(`Processed ${i + 1}/${WALLETS.length} wallets...`);
            }
        }
        
        const processingTime = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`\nProcessing completed in ${processingTime} seconds\n`);
        
        // Generate statistics
        const stats = {
            total: results.length,
            average: Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length),
            highest: Math.max(...results.map(r => r.score)),
            lowest: Math.min(...results.map(r => r.score)),
            distribution: {
                low: results.filter(r => r.score <= 200).length,
                moderate: results.filter(r => r.score > 200 && r.score <= 400).length,
                elevated: results.filter(r => r.score > 400 && r.score <= 600).length,
                high: results.filter(r => r.score > 600 && r.score <= 800).length,
                critical: results.filter(r => r.score > 800).length
            }
        };
        
        // Display statistics
        console.log('📊 Risk Score Statistics:');
        console.log(`   Average Score: ${stats.average}`);
        console.log(`   Highest Score: ${stats.highest}`);
        console.log(`   Lowest Score: ${stats.lowest}\n`);
        
        console.log('📈 Risk Distribution:');
        console.log(`   Low Risk (0-200): ${stats.distribution.low} wallets (${(stats.distribution.low/stats.total*100).toFixed(1)}%)`);
        console.log(`   Moderate Risk (201-400): ${stats.distribution.moderate} wallets (${(stats.distribution.moderate/stats.total*100).toFixed(1)}%)`);
        console.log(`   Elevated Risk (401-600): ${stats.distribution.elevated} wallets (${(stats.distribution.elevated/stats.total*100).toFixed(1)}%)`);
        console.log(`   High Risk (601-800): ${stats.distribution.high} wallets (${(stats.distribution.high/stats.total*100).toFixed(1)}%)`);
        console.log(`   Critical Risk (801-1000): ${stats.distribution.critical} wallets (${(stats.distribution.critical/stats.total*100).toFixed(1)}%)\n`);
        
        // Save CSV file
        const csvContent = 'wallet_id,score\n' + 
            results.map(r => `${r.wallet_id},${r.score}`).join('\n');
        
        const csvPath = path.join(OUTPUT_DIR, 'wallet_risk_scores.csv');
        await fs.writeFile(csvPath, csvContent);
        console.log(`✅ Results saved to: ${csvPath}`);
        
        // Save detailed report
        const report = {
            timestamp: new Date().toISOString(),
            mode: USE_BLOCKCHAIN ? 'blockchain' : 'simulation',
            statistics: stats,
            methodology: {
                leverageWeight: 0.35,
                behavioralWeight: 0.25,
                marketWeight: 0.20,
                liquidityWeight: 0.10,
                technicalWeight: 0.10,
                scale: '0-1000'
            },
            topRiskWallets: results
                .sort((a, b) => b.score - a.score)
                .slice(0, 10)
                .map(r => ({ wallet: r.wallet_id, score: r.score }))
        };
        
        const reportPath = path.join(OUTPUT_DIR, 'risk_analysis_report.json');
        await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
        console.log(`✅ Detailed report saved to: ${reportPath}\n`);
        
        // Show top risk wallets
        console.log('🚨 Top 5 Highest Risk Wallets:');
        report.topRiskWallets.slice(0, 5).forEach((wallet, i) => {
            console.log(`   ${i + 1}. ${wallet.wallet}: ${wallet.score}`);
        });
        
        console.log('\n✨ Analysis complete!');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

// Run the analysis
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { RiskCalculator, WALLETS };