import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../theme/app_theme.dart';

class AviatorScreen extends StatelessWidget {
  const AviatorScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<AppProvider>(context);

    return Scaffold(
      backgroundColor: AppTheme.backgroundDark,
      appBar: AppBar(
        title: const Row(
          children: [
            Icon(Icons.flight_takeoff, color: AppTheme.primaryNeon, size: 22),
            SizedBox(width: 8),
            Text('Aviator Predictor', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
          ],
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Flight Arena & Multiplier Card
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [
                    Color(0xFF1C130D),
                    Color(0xFF261214),
                    AppTheme.surfaceCard,
                  ],
                ),
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: Colors.redAccent.withOpacity(0.3)),
              ),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: Colors.red.withOpacity(0.2),
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: Colors.redAccent),
                        ),
                        child: const Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Icon(Icons.radio_button_checked, size: 10, color: Colors.redAccent),
                            SizedBox(width: 6),
                            Text('LIVE RADAR', style: TextStyle(fontSize: 10, fontWeight: FontWeight.w900, color: Colors.white)),
                          ],
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppTheme.primaryNeon.withOpacity(0.15),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          '${provider.confidence}% Accuracy',
                          style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.primaryNeon),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),
                  // Animated Rocket / Plane icon
                  Transform.rotate(
                    angle: -0.3,
                    child: const Icon(Icons.flight, size: 54, color: Colors.redAccent),
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    'NEXT ROUND PREDICTION',
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w900,
                      letterSpacing: 1.5,
                      color: AppTheme.textSecondary,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    '${provider.nextPredictedMultiplier.toStringAsFixed(2)}x',
                    style: const TextStyle(
                      fontSize: 48,
                      fontWeight: FontWeight.w900,
                      color: AppTheme.primaryNeon,
                      letterSpacing: -1,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                    decoration: BoxDecoration(
                      color: Colors.black.withOpacity(0.4),
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: Colors.white.withOpacity(0.1)),
                    ),
                    child: Text(
                      'Recommended Cashout: ${provider.safeCashoutTarget.toStringAsFixed(2)}x',
                      style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white70),
                    ),
                  ),
                  const SizedBox(height: 20),
                  // Predict Next Round Button
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppTheme.primaryNeon,
                        foregroundColor: Colors.black,
                        padding: const EdgeInsets.symmetric(vertical: 14),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      ),
                      icon: const Icon(Icons.auto_awesome, size: 18),
                      label: const Text(
                        'PREDICT NEXT ROUND',
                        style: TextStyle(fontWeight: FontWeight.w900, fontSize: 13, letterSpacing: 0.5),
                      ),
                      onPressed: () {
                        provider.regenerateAviatorPrediction();
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text('Next round calibrated: Target ${provider.nextPredictedMultiplier.toStringAsFixed(2)}x'),
                            backgroundColor: AppTheme.surfaceCard,
                            behavior: SnackBarBehavior.floating,
                            duration: const Duration(seconds: 2),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Recent Crash History Pills
            const Text(
              'Recent Round History',
              style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white),
            ),
            const SizedBox(height: 10),
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: [
                  _buildHistoryChip('88.40x', true),
                  _buildHistoryChip('2.30x', false),
                  _buildHistoryChip('14.50x', true),
                  _buildHistoryChip('1.82x', false),
                  _buildHistoryChip('8.92x', true),
                  _buildHistoryChip('3.40x', false),
                  _buildHistoryChip('1.15x', false),
                  _buildHistoryChip('4.85x', true),
                  _buildHistoryChip('2.10x', false),
                ],
              ),
            ),
            const SizedBox(height: 80),
          ],
        ),
      ),
    );
  }

  Widget _buildHistoryChip(String multiplier, bool isHigh) {
    return Container(
      margin: const EdgeInsets.only(right: 8),
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: isHigh ? AppTheme.primaryNeon.withOpacity(0.2) : Colors.white.withOpacity(0.06),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: isHigh ? AppTheme.primaryNeon : Colors.white.withOpacity(0.1),
        ),
      ),
      child: Text(
        multiplier,
        style: TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.bold,
          color: isHigh ? AppTheme.primaryNeon : Colors.white70,
        ),
      ),
    );
  }
}
