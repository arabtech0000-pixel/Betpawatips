import 'package:flutter/material.dart';
import '../models/match_model.dart';
import '../theme/app_theme.dart';

class TacticalPitchWidget extends StatelessWidget {
  final List<PlayerModel> lineup;
  final String teamName;
  final String formation;

  const TacticalPitchWidget({
    Key? key,
    required this.lineup,
    required this.teamName,
    this.formation = "4-3-3 Attacking",
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppTheme.surfaceCard,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppTheme.surfaceBorder),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                '$teamName Formation',
                style: const TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.bold,
                  color: AppTheme.textPrimary,
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.08),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  formation,
                  style: const TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.primaryNeon,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          // Pitch Grass Container
          Container(
            height: 320,
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  Color(0xFF143811),
                  Color(0xFF0F2C0D),
                ],
              ),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: Colors.white.withOpacity(0.25), width: 1.5),
            ),
            child: Stack(
              children: [
                // Half-way line
                Positioned(
                  top: 159,
                  left: 0,
                  right: 0,
                  child: Container(
                    height: 1.5,
                    color: Colors.white.withOpacity(0.25),
                  ),
                ),
                // Center Circle
                Center(
                  child: Container(
                    width: 70,
                    height: 70,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(color: Colors.white.withOpacity(0.25), width: 1.5),
                    ),
                  ),
                ),
                // Penalty Box Top
                Align(
                  alignment: Alignment.topCenter,
                  child: Container(
                    width: 120,
                    height: 50,
                    decoration: BoxDecoration(
                      border: Border(
                        bottom: BorderSide(color: Colors.white.withOpacity(0.25), width: 1.5),
                        left: BorderSide(color: Colors.white.withOpacity(0.25), width: 1.5),
                        right: BorderSide(color: Colors.white.withOpacity(0.25), width: 1.5),
                      ),
                    ),
                  ),
                ),
                // Penalty Box Bottom
                Align(
                  alignment: Alignment.bottomCenter,
                  child: Container(
                    width: 120,
                    height: 50,
                    decoration: BoxDecoration(
                      border: Border(
                        top: BorderSide(color: Colors.white.withOpacity(0.25), width: 1.5),
                        left: BorderSide(color: Colors.white.withOpacity(0.25), width: 1.5),
                        right: BorderSide(color: Colors.white.withOpacity(0.25), width: 1.5),
                      ),
                    ),
                  ),
                ),
                // Players plotted visually
                ...lineup.map((player) {
                  return _buildPlayerNode(player);
                }).toList(),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPlayerNode(PlayerModel player) {
    // Determine coordinate based on player role and index
    double top = 0;
    double left = 0;

    switch (player.position) {
      case 'GK':
        top = 265;
        left = 135;
        break;
      case 'DEF':
        if (player.number == 4) { top = 215; left = 245; } // RB
        else if (player.number == 2) { top = 225; left = 175; } // CB
        else if (player.number == 6) { top = 225; left = 95; } // CB
        else { top = 215; left = 25; } // LB
        break;
      case 'MID':
        if (player.number == 5) { top = 160; left = 135; } // DM
        else if (player.number == 41) { top = 130; left = 65; } // CM
        else { top = 120; left = 205; } // AM
        break;
      case 'FWD':
        if (player.number == 7) { top = 55; left = 245; } // RW
        else if (player.number == 29) { top = 45; left = 135; } // ST
        else { top = 55; left = 25; } // LW
        break;
      default:
        top = 150;
        left = 135;
    }

    return Positioned(
      top: top,
      left: left,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 28,
            height: 28,
            decoration: BoxDecoration(
              color: player.position == 'GK' ? const Color(0xFFF59E0B) : AppTheme.primaryNeon,
              shape: BoxShape.circle,
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.4),
                  blurRadius: 4,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            child: Center(
              child: Text(
                '${player.number}',
                style: const TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w900,
                  color: Colors.black,
                ),
              ),
            ),
          ),
          const SizedBox(height: 2),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 1),
            decoration: BoxDecoration(
              color: Colors.black.withOpacity(0.75),
              borderRadius: BorderRadius.circular(4),
            ),
            child: Text(
              player.name.split(' ').last,
              style: const TextStyle(
                fontSize: 9,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
