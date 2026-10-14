import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../theme/app_theme.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({Key? key}) : super(key: key);

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  int _activeSegment = 0; // 0: Picks, 1: Premium, 2: Socials

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<AppProvider>(context);

    return Scaffold(
      backgroundColor: AppTheme.backgroundDark,
      appBar: AppBar(
        title: const Text('My Profile', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        child: Column(
          children: [
            // User Avatar Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppTheme.surfaceCard,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppTheme.surfaceBorder),
              ),
              child: Row(
                children: [
                  Container(
                    width: 54,
                    height: 54,
                    decoration: BoxDecoration(
                      color: AppTheme.primaryNeon,
                      shape: BoxShape.circle,
                      border: Border.all(color: AppTheme.primaryNeon, width: 2),
                    ),
                    child: const Center(
                      child: Text('⚽', style: TextStyle(fontSize: 26)),
                    ),
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Alex Hunter',
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.white),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          provider.isSubscribed
                              ? (provider.isVip ? 'VIP Infinity Member' : 'Active Subscriber')
                              : 'Free Tier Member',
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                            color: provider.isSubscribed ? AppTheme.primaryNeon : AppTheme.textSecondary,
                          ),
                        ),
                      ],
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.edit_outlined, color: AppTheme.primaryNeon, size: 20),
                    onPressed: () {},
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Segmented Switcher: Picks | Premium | Socials
            Container(
              padding: const EdgeInsets.all(4),
              decoration: BoxDecoration(
                color: AppTheme.surfaceCard,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppTheme.surfaceBorder),
              ),
              child: Row(
                children: [
                  _buildSegmentButton('Picks', 0),
                  _buildSegmentButton('Premium', 1),
                  _buildSegmentButton('Socials', 2),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Segment Content
            if (_activeSegment == 0) _buildPicksTab(),
            if (_activeSegment == 1) _buildPremiumTab(provider),
            if (_activeSegment == 2) _buildSocialsTab(),

            const SizedBox(height: 16),
            _buildFootballApiCard(context, provider),

            const SizedBox(height: 80),
          ],
        ),
      ),
    );
  }

  Widget _buildFootballApiCard(BuildContext context, AppProvider provider) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.surfaceCard,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(
          color: provider.hasFootballApiToken
              ? AppTheme.accentGreen.withOpacity(0.5)
              : AppTheme.surfaceBorder,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Row(
                children: [
                  Icon(Icons.sports_soccer, color: AppTheme.primaryNeon, size: 20),
                  SizedBox(width: 8),
                  Text('Football-Data.org API', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: provider.hasFootballApiToken
                      ? AppTheme.accentGreen.withOpacity(0.2)
                      : AppTheme.accentAmber.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  provider.hasFootballApiToken ? 'CONNECTED' : 'TOKEN PENDING',
                  style: TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.bold,
                    color: provider.hasFootballApiToken ? AppTheme.accentGreen : AppTheme.accentAmber,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            provider.hasFootballApiToken
                ? 'Active API Token: ••••••••••••${provider.footballApiToken.length > 4 ? provider.footballApiToken.substring(provider.footballApiToken.length - 4) : ""}\nReal live scores, upcoming fixtures, and dynamic winning odds are synchronized.'
                : 'Plug your Football-Data.org X-Auth-Token to sync Premier League, Champions League, La Liga, and Serie A live feeds.',
            style: const TextStyle(fontSize: 12, color: AppTheme.textSecondary),
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: OutlinedButton(
                  style: OutlinedButton.styleFrom(
                    foregroundColor: AppTheme.primaryNeon,
                    side: const BorderSide(color: AppTheme.primaryNeon),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                  ),
                  onPressed: () => _showTokenDialog(context, provider),
                  child: Text(
                    provider.hasFootballApiToken ? 'UPDATE TOKEN' : 'ENTER API TOKEN',
                    style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold),
                  ),
                ),
              ),
              if (provider.hasFootballApiToken) ...[
                const SizedBox(width: 8),
                IconButton(
                  icon: const Icon(Icons.sync, color: AppTheme.primaryNeon),
                  tooltip: 'Sync Live Matches',
                  onPressed: () async {
                    await provider.fetchLiveMatches();
                    if (context.mounted) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text(provider.footballApiStatusMessage ?? 'Matches refreshed'),
                          backgroundColor: AppTheme.surfaceCard,
                        ),
                      );
                    }
                  },
                ),
              ],
            ],
          ),
        ],
      ),
    );
  }

  void _showTokenDialog(BuildContext context, AppProvider provider) {
    final textController = TextEditingController(text: provider.footballApiToken);
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: AppTheme.surfaceCard,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: const BorderSide(color: AppTheme.surfaceBorder),
        ),
        title: const Text('Football-Data.org Token', style: TextStyle(color: Colors.white, fontSize: 16)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Enter your X-Auth-Token key from football-data.org:',
              style: TextStyle(color: AppTheme.textSecondary, fontSize: 12),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: textController,
              style: const TextStyle(color: Colors.white, fontSize: 13),
              decoration: InputDecoration(
                hintText: 'Paste token key here...',
                hintStyle: const TextStyle(color: AppTheme.textMuted, fontSize: 12),
                filled: true,
                fillColor: Colors.black38,
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Cancel', style: TextStyle(color: Colors.white70)),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.primaryNeon,
              foregroundColor: Colors.black,
            ),
            onPressed: () async {
              final val = textController.text.trim();
              Navigator.pop(ctx);
              await provider.updateFootballApiToken(val);
              if (context.mounted) {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text(val.isNotEmpty ? 'Token saved successfully!' : 'Token cleared'),
                    backgroundColor: AppTheme.surfaceCard,
                  ),
                );
              }
            },
            child: const Text('Save & Connect', style: TextStyle(fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }

  Widget _buildSegmentButton(String label, int index) {
    final isSelected = _activeSegment == index;
    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => _activeSegment = index),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 10),
          decoration: BoxDecoration(
            color: isSelected ? AppTheme.primaryNeon : Colors.transparent,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Center(
            child: Text(
              label,
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.bold,
                color: isSelected ? Colors.black : Colors.white70,
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildPicksTab() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.surfaceCard,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: AppTheme.surfaceBorder),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('My Saved Picks & History', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
              Text('24 Total', style: TextStyle(fontSize: 12, color: AppTheme.primaryNeon)),
            ],
          ),
          const SizedBox(height: 12),
          _buildPickItem('Arsenal vs Chelsea', 'Arsenal Win @ 1.82', 'WON', AppTheme.accentGreen),
          _buildPickItem('Barcelona vs Bilbao', 'Barcelona Win @ 1.62', 'PENDING', AppTheme.accentAmber),
          _buildPickItem('Man City vs Wolves', 'Man City Win @ 1.34', 'WON', AppTheme.accentGreen),
        ],
      ),
    );
  }

  Widget _buildPickItem(String match, String pick, String status, Color color) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(match, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white)),
              Text(pick, style: const TextStyle(fontSize: 11, color: AppTheme.textSecondary)),
            ],
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
            decoration: BoxDecoration(
              color: color.withOpacity(0.15),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(status, style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: color)),
          ),
        ],
      ),
    );
  }

  Widget _buildPremiumTab(AppProvider provider) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.surfaceCard,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: AppTheme.surfaceBorder),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Row(
            children: [
              Icon(Icons.workspace_premium, color: AppTheme.primaryNeon, size: 20),
              SizedBox(width: 8),
              Text('Premium Subscriptions', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
            ],
          ),
          const SizedBox(height: 10),
          Text(
            provider.isSubscribed
                ? 'Your subscription is active. You have full access to high-accuracy betting tips and the Aviator predictor.'
                : 'You are currently on the Free plan. Upgrade to unlock 1-week, 1-month, or VIP infinity tips.',
            style: const TextStyle(fontSize: 12, color: AppTheme.textSecondary),
          ),
          const SizedBox(height: 16),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: AppTheme.primaryNeon,
                foregroundColor: Colors.black,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
              onPressed: () => provider.setTabIndex(1), // Go to Premium Tab
              child: Text(
                provider.isSubscribed ? 'MANAGE SUBSCRIPTIONS' : 'VIEW PREMIUM PACKAGES (FROM 25,000 UGX)',
                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 11),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSocialsTab() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.surfaceCard,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: AppTheme.surfaceBorder),
      ),
      child: const Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Official Channels & Support', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
          SizedBox(height: 12),
          ListTile(
            contentPadding: EdgeInsets.zero,
            leading: Icon(Icons.telegram, color: Color(0xFF229ED9)),
            title: Text('Telegram VIP Channel', style: TextStyle(fontSize: 13, color: Colors.white)),
            subtitle: Text('Join 45,000+ members for live calls', style: TextStyle(fontSize: 11, color: AppTheme.textSecondary)),
            trailing: Icon(Icons.arrow_forward_ios, size: 14, color: AppTheme.textMuted),
          ),
          Divider(color: AppTheme.surfaceBorder),
          ListTile(
            contentPadding: EdgeInsets.zero,
            leading: Icon(Icons.support_agent, color: AppTheme.primaryNeon),
            title: Text('WhatsApp 24/7 Support', style: TextStyle(fontSize: 13, color: Colors.white)),
            subtitle: Text('+256 700 000 000', style: TextStyle(fontSize: 11, color: AppTheme.textSecondary)),
            trailing: Icon(Icons.arrow_forward_ios, size: 14, color: AppTheme.textMuted),
          ),
        ],
      ),
    );
  }
}
