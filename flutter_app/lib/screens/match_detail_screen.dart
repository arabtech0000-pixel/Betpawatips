import 'package:flutter/material.dart';
import '../models/match_model.dart';
import '../theme/app_theme.dart';
import '../widgets/tactical_pitch_widget.dart';

class MatchDetailScreen extends StatefulWidget {
  final MatchModel match;
  final VoidCallback onBack;

  const MatchDetailScreen({
    Key? key,
    required this.match,
    required this.onBack,
  }) : super(key: key);

  @override
  State<MatchDetailScreen> createState() => _MatchDetailScreenState();
}

class _MatchDetailScreenState extends State<MatchDetailScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final match = widget.match;

    return Scaffold(
      backgroundColor: AppTheme.backgroundDark,
      body: CustomScrollView(
        slivers: [
          // BIG STADIUM HERO BANNER AT THE UPPER SECTION
          SliverAppBar(
            expandedHeight: 260.0,
            pinned: true,
            leading: IconButton(
              icon: const Icon(Icons.arrow_back_ios_new, color: Colors.white, size: 20),
              onPressed: widget.onBack,
            ),
            actions: [
              IconButton(
                icon: const Icon(Icons.star_border, color: Colors.white),
                onPressed: () {},
              ),
              IconButton(
                icon: const Icon(Icons.share, color: Colors.white),
                onPressed: () {},
              ),
            ],
            flexibleSpace: FlexibleSpaceBar(
              background: Stack(
                fit: StackFit.expand,
                children: [
                  // Stadium Banner Image
                  Image.network(
                    'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80',
                    fit: BoxFit.cover,
                    errorBuilder: (ctx, err, stack) => Container(color: const Color(0xFF132010)),
                  ),
                  // Dark Gradients
                  Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [
                          Colors.black.withOpacity(0.6),
                          Colors.transparent,
                          AppTheme.backgroundDark.withOpacity(0.95),
                          AppTheme.backgroundDark,
                        ],
                        stops: const [0.0, 0.35, 0.85, 1.0],
                      ),
                    ),
                  ),
                  // Banner Header Overlay
                  Positioned(
                    top: 50,
                    left: 60,
                    right: 60,
                    child: Center(
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                        decoration: BoxDecoration(
                          color: Colors.black.withOpacity(0.7),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: Colors.white.withOpacity(0.15)),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(match.leagueFlag, style: const TextStyle(fontSize: 14)),
                            const SizedBox(width: 6),
                            Text(
                              match.league,
                              style: const TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  // Clash Teams & Score Banner
                  Positioned(
                    bottom: 16,
                    left: 16,
                    right: 16,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        // Team 1 (Arsenal)
                        Expanded(
                          child: Column(
                            children: [
                              Container(
                                width: 56,
                                height: 56,
                                decoration: BoxDecoration(
                                  color: Colors.white.withOpacity(0.1),
                                  shape: BoxShape.circle,
                                  border: Border.all(color: AppTheme.primaryNeon, width: 2),
                                ),
                                child: const Center(
                                  child: Text('🔴', style: TextStyle(fontSize: 26)),
                                ),
                              ),
                              const SizedBox(height: 6),
                              Text(
                                match.team1,
                                style: const TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                ),
                                overflow: TextOverflow.ellipsis,
                              ),
                            ],
                          ),
                        ),
                        // Score / Live Pill
                        Column(
                          children: [
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                              decoration: BoxDecoration(
                                color: Colors.red.withOpacity(0.9),
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Text(
                                match.statusText,
                                style: const TextStyle(
                                  fontSize: 11,
                                  fontWeight: FontWeight.w900,
                                  color: Colors.white,
                                ),
                              ),
                            ),
                            const SizedBox(height: 6),
                            Text(
                              match.score,
                              style: const TextStyle(
                                fontSize: 32,
                                fontWeight: FontWeight.w900,
                                letterSpacing: 2,
                                color: AppTheme.primaryNeon,
                              ),
                            ),
                          ],
                        ),
                        // Team 2 (Chelsea)
                        Expanded(
                          child: Column(
                            children: [
                              Container(
                                width: 56,
                                height: 56,
                                decoration: BoxDecoration(
                                  color: Colors.white.withOpacity(0.1),
                                  shape: BoxShape.circle,
                                  border: Border.all(color: Colors.blueAccent, width: 2),
                                ),
                                child: const Center(
                                  child: Text('🔵', style: TextStyle(fontSize: 26)),
                                ),
                              ),
                              const SizedBox(height: 6),
                              Text(
                                match.team2,
                                style: const TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                ),
                                overflow: TextOverflow.ellipsis,
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Venue & Referee Bar
          SliverToBoxAdapter(
            child: Container(
              margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
              decoration: BoxDecoration(
                color: AppTheme.surfaceCard,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: AppTheme.surfaceBorder),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.location_on_outlined, size: 14, color: AppTheme.primaryNeon),
                      const SizedBox(width: 4),
                      Text(match.venue, style: const TextStyle(fontSize: 11, color: AppTheme.textSecondary)),
                    ],
                  ),
                  Row(
                    children: [
                      const Icon(Icons.sports, size: 14, color: Colors.amber),
                      const SizedBox(width: 4),
                      Text('Ref: ${match.referee}', style: const TextStyle(fontSize: 11, color: AppTheme.textSecondary)),
                    ],
                  ),
                ],
              ),
            ),
          ),

          // Tabs: Lineup (Pitch), Stats, Events
          SliverToBoxAdapter(
            child: Container(
              margin: const EdgeInsets.symmetric(horizontal: 16),
              child: TabBar(
                controller: _tabController,
                indicatorColor: AppTheme.primaryNeon,
                indicatorWeight: 3,
                labelColor: AppTheme.primaryNeon,
                unselectedLabelColor: AppTheme.textMuted,
                labelStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
                tabs: const [
                  Tab(text: 'Pitch Lineup'),
                  Tab(text: 'Match Stats'),
                  Tab(text: 'Timeline'),
                ],
              ),
            ),
          ),

          // Tab Content
          SliverToBoxAdapter(
            child: Container(
              padding: const EdgeInsets.all(16),
              child: _buildSelectedTabContent(match),
            ),
          ),

          const SliverToBoxAdapter(child: SizedBox(height: 80)),
        ],
      ),
    );
  }

  Widget _buildSelectedTabContent(MatchModel match) {
    return AnimatedBuilder(
      animation: _tabController,
      builder: (context, _) {
        switch (_tabController.index) {
          case 0:
            // Tactical Pitch Formation, Coaches & Substitutes
            return Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Formations & Coaches Header
                Container(
                  margin: const EdgeInsets.only(bottom: 12),
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                  decoration: BoxDecoration(
                    color: AppTheme.surfaceCard,
                    borderRadius: BorderRadius.circular(14),
                    border: Border.all(color: AppTheme.surfaceBorder),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            match.team1,
                            style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white, fontSize: 12),
                          ),
                          Text(
                            '${match.team1Formation} • Coach: ${match.team1Coach}',
                            style: const TextStyle(color: AppTheme.primaryNeon, fontSize: 10, fontWeight: FontWeight.w600),
                          ),
                        ],
                      ),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          Text(
                            match.team2,
                            style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white, fontSize: 12),
                          ),
                          Text(
                            '${match.team2Formation} • Coach: ${match.team2Coach}',
                            style: const TextStyle(color: Colors.blueAccent, fontSize: 10, fontWeight: FontWeight.w600),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                TacticalPitchWidget(
                  lineup: match.team1Lineup,
                  teamName: match.team1,
                  formation: '${match.team1} ${match.team1Formation}',
                ),
                const SizedBox(height: 12),
                _buildPlayersRatingList(match.team1Lineup),
                _buildSubstitutesBench(match),
              ],
            );
          case 1:
            // Match Stats
            return Column(
              children: [
                _buildStatBar('Possession', '${match.possession1}%', '${match.possession2}%', match.possession1 / 100),
                _buildStatBar('Expected Goals (xG)', '${match.xg1}', '${match.xg2}', match.xg1 / (match.xg1 + match.xg2)),
                _buildStatBar('Total Shots', '${match.shots1}', '${match.shots2}', match.shots1 / (match.shots1 + match.shots2)),
                _buildStatBar('Shots on Target', '${match.shotsOnTarget1}', '${match.shotsOnTarget2}', match.shotsOnTarget1 / (match.shotsOnTarget1 + match.shotsOnTarget2)),
                _buildStatBar('Corner Kicks', '${match.corners1}', '${match.corners2}', match.corners1 / (match.corners1 + match.corners2)),
              ],
            );
          case 2:
            // Timeline
            return Column(
              children: match.events.map((e) => _buildTimelineTile(e)).toList(),
            );
          default:
            return const SizedBox.shrink();
        }
      },
    );
  }

  Widget _buildStatBar(String label, String val1, String val2, double ratio) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppTheme.surfaceCard,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppTheme.surfaceBorder),
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(val1, style: const TextStyle(fontWeight: FontWeight.bold, color: AppTheme.primaryNeon)),
              Text(label, style: const TextStyle(fontSize: 12, color: AppTheme.textSecondary)),
              Text(val2, style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.blueAccent)),
            ],
          ),
          const SizedBox(height: 8),
          ClipRRect(
            borderRadius: BorderRadius.circular(6),
            child: Row(
              children: [
                Expanded(
                  flex: (ratio * 100).toInt(),
                  child: Container(height: 6, color: AppTheme.primaryNeon),
                ),
                Expanded(
                  flex: ((1 - ratio) * 100).toInt(),
                  child: Container(height: 6, color: Colors.blueAccent),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTimelineTile(TimelineEventModel event) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppTheme.surfaceCard,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppTheme.surfaceBorder),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: AppTheme.primaryNeon.withOpacity(0.2),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              event.minute,
              style: const TextStyle(fontWeight: FontWeight.bold, color: AppTheme.primaryNeon, fontSize: 12),
            ),
          ),
          const SizedBox(width: 12),
          Text(event.eventType == 'goal' ? '⚽' : '🟨', style: const TextStyle(fontSize: 16)),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(event.player, style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white, fontSize: 13)),
                Text(event.description, style: const TextStyle(color: AppTheme.textSecondary, fontSize: 11)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPlayersRatingList(List<PlayerModel> players) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppTheme.surfaceCard,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.surfaceBorder),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Player Ratings & Form', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
          const SizedBox(height: 8),
          ...players.take(5).map((p) => Padding(
            padding: const EdgeInsets.symmetric(vertical: 4),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('#${p.number} ${p.name}', style: const TextStyle(fontSize: 12, color: AppTheme.textSecondary)),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(
                    color: p.rating >= 8.0 ? AppTheme.accentGreen : AppTheme.primaryNeon.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Text(
                    p.rating.toStringAsFixed(1),
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 11,
                      color: p.rating >= 8.0 ? Colors.white : AppTheme.primaryNeon,
                    ),
                  ),
                ),
              ],
            ),
          )),
        ],
      ),
    );
  }

  Widget _buildSubstitutesBench(MatchModel match) {
    if (match.team1Subs.isEmpty && match.team2Subs.isEmpty) {
      return const SizedBox.shrink();
    }
    return Container(
      margin: const EdgeInsets.only(top: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppTheme.surfaceCard,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.surfaceBorder),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: const [
              Icon(Icons.people_outline, color: AppTheme.primaryNeon, size: 16),
              SizedBox(width: 8),
              Text(
                'Substitutes Bench',
                style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white, fontSize: 13),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      '${match.team1} Subs',
                      style: const TextStyle(fontWeight: FontWeight.bold, color: AppTheme.primaryNeon, fontSize: 11),
                    ),
                    const SizedBox(height: 6),
                    ...match.team1Subs.map((s) => Padding(
                      padding: const EdgeInsets.only(bottom: 4),
                      child: Text('• $s', style: const TextStyle(fontSize: 11, color: Colors.white70)),
                    )),
                  ],
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      '${match.team2} Subs',
                      style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.blueAccent, fontSize: 11),
                    ),
                    const SizedBox(height: 6),
                    ...match.team2Subs.map((s) => Padding(
                      padding: const EdgeInsets.only(bottom: 4),
                      child: Text('• $s', style: const TextStyle(fontSize: 11, color: Colors.white70)),
                    )),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
