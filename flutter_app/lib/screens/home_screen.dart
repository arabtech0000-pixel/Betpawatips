import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/match_model.dart';
import '../providers/app_provider.dart';
import '../theme/app_theme.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<AppProvider>(context);

    return Scaffold(
      backgroundColor: AppTheme.backgroundDark,
      body: SafeArea(
        child: CustomScrollView(
          slivers: [
            // Top App Bar with Extending Search (Left) and Calendar (Right)
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                child: Row(
                  children: [
                    // Brand Logo
                    Row(
                      children: [
                        Container(
                          width: 36,
                          height: 36,
                          decoration: BoxDecoration(
                            color: AppTheme.primaryNeon,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: const Center(
                            child: Icon(Icons.sports_soccer, color: Colors.black, size: 22),
                          ),
                        ),
                        const SizedBox(width: 8),
                        const Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'KICKPREDICT',
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w900,
                                letterSpacing: -0.5,
                                color: Colors.white,
                              ),
                            ),
                            Text(
                              'SPORTS & AVIATOR',
                              style: TextStyle(
                                fontSize: 9,
                                fontWeight: FontWeight.bold,
                                letterSpacing: 0.8,
                                color: AppTheme.primaryNeon,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                    const Spacer(),

                    // Extending Search Input (extends to left when active)
                    AnimatedContainer(
                      duration: const Duration(milliseconds: 250),
                      width: provider.isSearchExpanded ? 180 : 40,
                      height: 40,
                      decoration: BoxDecoration(
                        color: AppTheme.surfaceCard,
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(
                          color: provider.isSearchExpanded ? AppTheme.primaryNeon : AppTheme.surfaceBorder,
                        ),
                      ),
                      child: Row(
                        children: [
                          IconButton(
                            padding: EdgeInsets.zero,
                            icon: Icon(
                              provider.isSearchExpanded ? Icons.close : Icons.search,
                              size: 18,
                              color: provider.isSearchExpanded ? AppTheme.primaryNeon : Colors.white70,
                            ),
                            onPressed: () {
                              provider.toggleSearch(!provider.isSearchExpanded);
                            },
                          ),
                          if (provider.isSearchExpanded)
                            Expanded(
                              child: TextField(
                                style: const TextStyle(fontSize: 12, color: Colors.white),
                                decoration: const InputDecoration(
                                  hintText: 'Search club...',
                                  hintStyle: TextStyle(fontSize: 11, color: AppTheme.textMuted),
                                  border: InputBorder.none,
                                  isDense: true,
                                ),
                                onChanged: (val) => provider.setSearchQuery(val),
                              ),
                            ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 8),

                    // Calendar button (Rightmost)
                    Container(
                      width: 40,
                      height: 40,
                      decoration: BoxDecoration(
                        color: AppTheme.surfaceCard,
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: AppTheme.surfaceBorder),
                      ),
                      child: IconButton(
                        padding: EdgeInsets.zero,
                        icon: const Icon(Icons.calendar_today, size: 16, color: Colors.white70),
                        onPressed: () {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text('Viewing All Fixtures Calendar'),
                              duration: Duration(seconds: 1),
                            ),
                          );
                        },
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // HERO MATCH OF THE DAY (ARSENAL VS CHELSEA)
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Featured Match Clash',
                          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                        ),
                        Text(
                          'Tap for full tactical setup',
                          style: TextStyle(fontSize: 11, color: AppTheme.primaryNeon),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    GestureDetector(
                      onTap: () {
                        provider.selectMatch(AppProvider.arsenalVsChelsea);
                      },
                      child: Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          gradient: const LinearGradient(
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                            colors: [
                              Color(0xFF1B2616),
                              Color(0xFF121B0F),
                            ],
                          ),
                          borderRadius: BorderRadius.circular(24),
                          border: Border.all(color: AppTheme.primaryNeon.withOpacity(0.4), width: 1.5),
                          boxShadow: [
                            BoxShadow(
                              color: AppTheme.primaryNeon.withOpacity(0.08),
                              blurRadius: 20,
                              offset: const Offset(0, 6),
                            ),
                          ],
                        ),
                        child: Column(
                          children: [
                            // League and Live Pill
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                const Row(
                                  children: [
                                    Text('🏴󠁧󠁢󠁥󠁮󠁧󠁿', style: TextStyle(fontSize: 14)),
                                    SizedBox(width: 6),
                                    Text('Premier League • Matchday 28', style: TextStyle(fontSize: 12, color: Colors.white70)),
                                  ],
                                ),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                  decoration: BoxDecoration(
                                    color: Colors.redAccent.withOpacity(0.2),
                                    borderRadius: BorderRadius.circular(10),
                                    border: Border.all(color: Colors.redAccent),
                                  ),
                                  child: const Text(
                                    "LIVE 68'",
                                    style: TextStyle(fontSize: 10, fontWeight: FontWeight.w900, color: Colors.redAccent),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 16),
                            // Teams & Live Score
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceAround,
                              children: [
                                Column(
                                  children: [
                                    Container(
                                      width: 48,
                                      height: 48,
                                      decoration: BoxDecoration(
                                        color: Colors.white.withOpacity(0.1),
                                        shape: BoxShape.circle,
                                        border: Border.all(color: AppTheme.primaryNeon),
                                      ),
                                      child: const Center(child: Text('🔴', style: TextStyle(fontSize: 22))),
                                    ),
                                    const SizedBox(height: 6),
                                    const Text('Arsenal', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white, fontSize: 15)),
                                  ],
                                ),
                                Column(
                                  children: [
                                    const Text(
                                      '2 - 1',
                                      style: TextStyle(fontSize: 32, fontWeight: FontWeight.w900, color: AppTheme.primaryNeon),
                                    ),
                                    Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                      decoration: BoxDecoration(
                                        color: Colors.white.withOpacity(0.06),
                                        borderRadius: BorderRadius.circular(6),
                                      ),
                                      child: const Text('Emirates Stadium', style: TextStyle(fontSize: 9, color: AppTheme.textMuted)),
                                    ),
                                  ],
                                ),
                                Column(
                                  children: [
                                    Container(
                                      width: 48,
                                      height: 48,
                                      decoration: BoxDecoration(
                                        color: Colors.white.withOpacity(0.1),
                                        shape: BoxShape.circle,
                                        border: Border.all(color: Colors.blueAccent),
                                      ),
                                      child: const Center(child: Text('🔵', style: TextStyle(fontSize: 22))),
                                    ),
                                    const SizedBox(height: 6),
                                    const Text('Chelsea', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white, fontSize: 15)),
                                  ],
                                ),
                              ],
                            ),
                            const SizedBox(height: 16),
                            // Odds Buttons Row
                            Row(
                              children: [
                                _buildOddsButton('Arsenal 1', '1.82', true),
                                const SizedBox(width: 8),
                                _buildOddsButton('Draw X', '3.65', false),
                                const SizedBox(width: 8),
                                _buildOddsButton('Chelsea 2', '4.10', false),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // League Categories Chips
            SliverToBoxAdapter(
              child: SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                child: Row(
                  children: [
                    _buildSportChip('🌐 All Leagues', true),
                    _buildSportChip('🏆 Champions League', false),
                    _buildSportChip('🦁 Premier League', false),
                    _buildSportChip('🇪🇸 La Liga', false),
                    _buildSportChip('🇮🇹 Serie A', false),
                    _buildSportChip('🇩🇪 Bundesliga', false),
                  ],
                ),
              ),
            ),

            // Today Matches (Dynamic from API if loaded, otherwise featured fixtures)
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text('Today Matches', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white)),
                        if (provider.apiMatches.isNotEmpty)
                          Text(
                            '${provider.apiMatches.length} matches',
                            style: const TextStyle(fontSize: 11, color: AppTheme.primaryNeon),
                          ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    if (provider.apiMatches.isNotEmpty)
                      ...provider.apiMatches.map((m) => GestureDetector(
                            onTap: () => provider.selectMatch(m),
                            child: _buildFixtureTile(
                              m.league,
                              '${m.team1} vs ${m.team2}',
                              m.statusText,
                              m.oddsTeam1.toStringAsFixed(2),
                              m.oddsDraw.toStringAsFixed(2),
                              m.oddsTeam2.toStringAsFixed(2),
                            ),
                          ))
                    else ...[
                      _buildFixtureTile('La Liga', 'Barcelona vs Athletic Bilbao', 'Tonight 22:00', '1.62', '4.20', '5.10'),
                      _buildFixtureTile('Champions League', 'Real Madrid vs Dortmund', 'Tomorrow 21:00', '1.75', '3.90', '4.60'),
                      _buildFixtureTile('Serie A', 'Inter Milan vs AS Roma', 'Tomorrow 19:45', '1.58', '4.00', '5.80'),
                    ],
                  ],
                ),
              ),
            ),

            const SliverToBoxAdapter(child: SizedBox(height: 100)),
          ],
        ),
      ),
    );
  }

  void _showApiTokenDialog(BuildContext context, AppProvider provider) {
    final textController = TextEditingController(text: provider.footballApiToken);
    showDialog(
      context: context,
      builder: (ctx) {
        return AlertDialog(
          backgroundColor: AppTheme.surfaceCard,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20),
            side: const BorderSide(color: AppTheme.surfaceBorder),
          ),
          title: const Row(
            children: [
              Icon(Icons.vpn_key, color: AppTheme.primaryNeon, size: 20),
              SizedBox(width: 8),
              Text(
                'Football-Data.org API',
                style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
              ),
            ],
          ),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Paste your football-data.org API token (X-Auth-Token) to connect real match schedules, live scores, and odds:',
                style: TextStyle(color: AppTheme.textSecondary, fontSize: 12),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: textController,
                style: const TextStyle(color: Colors.white, fontSize: 13),
                decoration: InputDecoration(
                  hintText: 'e.g. 7c32bf14a29a4358a9e0...',
                  hintStyle: const TextStyle(color: AppTheme.textMuted, fontSize: 12),
                  filled: true,
                  fillColor: Colors.black26,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                    borderSide: const BorderSide(color: AppTheme.surfaceBorder),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                    borderSide: const BorderSide(color: AppTheme.primaryNeon),
                  ),
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
                final token = textController.text.trim();
                Navigator.pop(ctx);
                await provider.updateFootballApiToken(token);
                if (context.mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text(
                        token.isNotEmpty ? 'Football-Data token saved & fetching matches!' : 'Token cleared',
                      ),
                      backgroundColor: AppTheme.surfaceCard,
                    ),
                  );
                }
              },
              child: const Text('Save & Fetch', style: TextStyle(fontWeight: FontWeight.bold)),
            ),
          ],
        );
      },
    );
  }

  Widget _buildOddsButton(String label, String odd, bool isFavorite) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 8),
        decoration: BoxDecoration(
          color: isFavorite ? AppTheme.primaryNeon.withOpacity(0.2) : Colors.white.withOpacity(0.04),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isFavorite ? AppTheme.primaryNeon : AppTheme.surfaceBorder,
          ),
        ),
        child: Column(
          children: [
            Text(label, style: const TextStyle(fontSize: 10, color: AppTheme.textSecondary)),
            const SizedBox(height: 2),
            Text(
              odd,
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 13,
                color: isFavorite ? AppTheme.primaryNeon : Colors.white,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSportChip(String label, bool isSelected) {
    return Padding(
      padding: const EdgeInsets.only(right: 8),
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
    );
  }

  Widget _buildFixtureTile(String league, String match, String time, String o1, String ox, String o2) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppTheme.surfaceCard,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.surfaceBorder),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(league, style: const TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                const SizedBox(height: 2),
                Text(match, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white)),
                Text(time, style: const TextStyle(fontSize: 11, color: AppTheme.textSecondary)),
              ],
            ),
          ),
          Row(
            children: [
              _buildMiniOdd(o1),
              const SizedBox(width: 4),
              _buildMiniOdd(ox),
              const SizedBox(width: 4),
              _buildMiniOdd(o2),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildMiniOdd(String odd) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.04),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(odd, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white70)),
    );
  }
}
