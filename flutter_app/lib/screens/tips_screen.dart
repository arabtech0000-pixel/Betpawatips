import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/betting_tip_model.dart';
import '../providers/app_provider.dart';
import '../theme/app_theme.dart';

class TipsScreen extends StatelessWidget {
  const TipsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<AppProvider>(context);
    final activeTab = provider.selectedTipsTab;

    final filteredTips = provider.allTips.filterByTab(activeTab);

    return Scaffold(
      backgroundColor: AppTheme.backgroundDark,
      appBar: AppBar(
        title: const Row(
          children: [
            Icon(Icons.star, color: AppTheme.primaryNeon, size: 22),
            SizedBox(width: 8),
            Text(
              'Betting Tips',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
            ),
          ],
        ),
      ),
      body: Column(
        children: [
          // Subscriptions banner reminder if not subscribed
          if (!provider.isSubscribed)
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    AppTheme.primaryNeon.withOpacity(0.15),
                    AppTheme.surfaceCard,
                  ],
                ),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppTheme.primaryNeon.withOpacity(0.4)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.lock_open, color: AppTheme.primaryNeon, size: 20),
                  const SizedBox(width: 10),
                  const Expanded(
                    child: Text(
                      'Upgrade to VIP for unlimited daily tips & 89%+ high conviction picks.',
                      style: TextStyle(fontSize: 12, color: Colors.white),
                    ),
                  ),
                  TextButton(
                    onPressed: () => provider.setTabIndex(1), // Go to Premium
                    child: const Text('Upgrade', style: TextStyle(color: AppTheme.primaryNeon, fontWeight: FontWeight.bold)),
                  ),
                ],
              ),
            ),

          // Horizontal Filter Tabs: Today Tips, History, Won, Lost, Pending
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
            child: Row(
              children: [
                _buildTabChip(context, 'Today Tips', 'today', activeTab),
                _buildTabChip(context, 'History', 'history', activeTab),
                _buildTabChip(context, 'Won', 'won', activeTab),
                _buildTabChip(context, 'Lost', 'lost', activeTab),
                _buildTabChip(context, 'Pending', 'pending', activeTab),
              ],
            ),
          ),
          const SizedBox(height: 8),

          // Tips List: Simplified Winning Teams & Losing Teams
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              itemCount: filteredTips.length,
              itemBuilder: (context, index) {
                final tip = filteredTips[index];
                return _buildCleanTipCard(context, tip);
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTabChip(BuildContext context, String label, String tabKey, String activeTab) {
    final isSelected = activeTab == tabKey;
    final provider = Provider.of<AppProvider>(context, listen: false);

    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: GestureDetector(
        onTap: () => provider.setTipsTab(tabKey),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
          decoration: BoxDecoration(
            color: isSelected ? AppTheme.primaryNeon : AppTheme.surfaceCard,
            borderRadius: BorderRadius.circular(20),
            border: Border.all(
              color: isSelected ? AppTheme.primaryNeon : AppTheme.surfaceBorder,
            ),
          ),
          child: Text(
            label,
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.bold,
              color: isSelected ? Colors.black : Colors.white70,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildCleanTipCard(BuildContext context, BettingTipModel tip) {
    Color situationColor;
    String situationLabel;
    IconData situationIcon;

    switch (tip.situation) {
      case TipSituation.won:
        situationColor = AppTheme.accentGreen;
        situationLabel = 'WON';
        situationIcon = Icons.check_circle;
        break;
      case TipSituation.lost:
        situationColor = AppTheme.accentRed;
        situationLabel = 'LOST';
        situationIcon = Icons.cancel;
        break;
      case TipSituation.pending:
        situationColor = AppTheme.accentAmber;
        situationLabel = 'PENDING';
        situationIcon = Icons.access_time;
        break;
    }

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppTheme.surfaceCard,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: AppTheme.surfaceBorder),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // League & Situation Header
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Text(tip.league, style: const TextStyle(fontSize: 12, color: AppTheme.textSecondary)),
                  const SizedBox(width: 6),
                  Text('• ${tip.time}', style: const TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: situationColor.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: situationColor.withOpacity(0.4)),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(situationIcon, size: 12, color: situationColor),
                    const SizedBox(width: 4),
                    Text(
                      situationLabel,
                      style: TextStyle(
                        fontSize: 10,
                        fontWeight: FontWeight.bold,
                        color: situationColor,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),

          // WINNING TEAM HIGHLIGHT BOX
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: AppTheme.primaryNeon.withOpacity(0.08),
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: AppTheme.primaryNeon.withOpacity(0.35)),
            ),
            child: Row(
              children: [
                Container(
                  width: 38,
                  height: 38,
                  decoration: BoxDecoration(
                    color: AppTheme.primaryNeon,
                    shape: BoxShape.circle,
                  ),
                  child: Center(
                    child: Text(tip.winningTeamLogo, style: const TextStyle(fontSize: 18)),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                            decoration: BoxDecoration(
                              color: AppTheme.primaryNeon,
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: const Text(
                              'WILL WIN',
                              style: TextStyle(fontSize: 9, fontWeight: FontWeight.w900, color: Colors.black),
                            ),
                          ),
                          const SizedBox(width: 6),
                          Text(
                            tip.winningTeam,
                            style: const TextStyle(
                              fontSize: 15,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 2),
                      Text(
                        'Model confidence: ${tip.modelConfidence.toStringAsFixed(1)}%',
                        style: const TextStyle(fontSize: 11, color: AppTheme.primaryNeon),
                      ),
                    ],
                  ),
                ),
                Text(
                  'Odds: ${tip.winningOdds.toStringAsFixed(2)}',
                  style: const TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 8),

          // LOSING TEAM DISPLAY
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.03),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              children: [
                Text(tip.losingTeamLogo, style: const TextStyle(fontSize: 16)),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    'Will Lose: ${tip.losingTeam}',
                    style: const TextStyle(
                      fontSize: 12,
                      color: AppTheme.textSecondary,
                      decoration: TextDecoration.lineThrough,
                    ),
                  ),
                ),
                Text(
                  tip.scoreOrStatus,
                  style: const TextStyle(fontSize: 11, color: AppTheme.textMuted),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

extension TipsFilter on List<BettingTipModel> {
  List<BettingTipModel> filterByTab(String tab) {
    if (tab == 'today') return where((t) => t.category == 'today').toList();
    if (tab == 'history') return where((t) => t.category == 'history' || t.category == 'won' || t.category == 'lost').toList();
    if (tab == 'won') return where((t) => t.situation == TipSituation.won).toList();
    if (tab == 'lost') return where((t) => t.situation == TipSituation.lost).toList();
    if (tab == 'pending') return where((t) => t.situation == TipSituation.pending).toList();
    return this;
  }
}
