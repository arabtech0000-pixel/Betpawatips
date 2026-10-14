import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../theme/app_theme.dart';
import 'home_screen.dart';
import 'subscriptions_screen.dart';
import 'tips_screen.dart';
import 'aviator_screen.dart';
import 'profile_screen.dart';
import 'match_detail_screen.dart';

class MainNavigationScreen extends StatelessWidget {
  const MainNavigationScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<AppProvider>(context);

    // If a match is selected (e.g. Arsenal vs Chelsea), show full match detail screen
    if (provider.selectedMatch != null) {
      return MatchDetailScreen(
        match: provider.selectedMatch!,
        onBack: () => provider.selectMatch(null),
      );
    }

    final screens = const [
      HomeScreen(),
      SubscriptionsScreen(),
      TipsScreen(),
      AviatorScreen(),
      ProfileScreen(),
    ];

    return Scaffold(
      backgroundColor: AppTheme.backgroundDark,
      body: IndexedStack(
        index: provider.currentTabIndex,
        children: screens,
      ),
      bottomNavigationBar: Container(
        margin: const EdgeInsets.only(left: 16, right: 16, bottom: 16),
        decoration: BoxDecoration(
          color: const Color(0xFF10170E).withOpacity(0.96),
          borderRadius: BorderRadius.circular(32),
          border: Border.all(color: Colors.white.withOpacity(0.1)),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.4),
              blurRadius: 20,
              offset: const Offset(0, 10),
            ),
          ],
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(32),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildNavItem(context, Icons.home_filled, 'Home', 0, provider.currentTabIndex),
                _buildNavItem(context, Icons.workspace_premium, 'Premium', 1, provider.currentTabIndex),
                _buildNavItem(context, Icons.star, 'Tips', 2, provider.currentTabIndex),
                _buildNavItem(context, Icons.flight, 'Aviator', 3, provider.currentTabIndex),
                _buildNavItem(context, Icons.person, 'Profile', 4, provider.currentTabIndex),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem(BuildContext context, IconData icon, String label, int index, int currentIndex) {
    final isSelected = index == currentIndex;
    final provider = Provider.of<AppProvider>(context, listen: false);

    return GestureDetector(
      onTap: () => provider.setTabIndex(index),
      behavior: HitTestBehavior.opaque,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 38,
            height: 38,
            decoration: BoxDecoration(
              color: isSelected ? AppTheme.primaryNeon : Colors.transparent,
              shape: BoxShape.circle,
              boxShadow: isSelected
                  ? [
                      BoxShadow(
                        color: AppTheme.primaryNeon.withOpacity(0.35),
                        blurRadius: 10,
                        offset: const Offset(0, 3),
                      ),
                    ]
                  : null,
            ),
            child: Icon(
              icon,
              size: 20,
              color: isSelected ? Colors.black : Colors.white60,
            ),
          ),
          const SizedBox(height: 2),
          Text(
            label,
            style: TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.bold,
              color: isSelected ? AppTheme.primaryNeon : Colors.white54,
            ),
          ),
        ],
      ),
    );
  }
}
