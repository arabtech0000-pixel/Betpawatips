class AviatorRoundModel {
  final String roundId;
  final double crashMultiplier;
  final double predictedMultiplier;
  final double safeCashout;
  final double confidenceScore;
  final DateTime timestamp;
  final bool isOverflow; // True if multiplier overflowed high target (e.g. > 5.0x)

  const AviatorRoundModel({
    required this.roundId,
    required this.crashMultiplier,
    required this.predictedMultiplier,
    required this.safeCashout,
    required this.confidenceScore,
    required this.timestamp,
    required this.isOverflow,
  });
}
