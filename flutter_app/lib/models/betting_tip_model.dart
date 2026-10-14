enum TipSituation { won, lost, pending }

class BettingTipModel {
  final String id;
  final String league;
  final String time;
  final String winningTeam;
  final String winningTeamLogo;
  final String losingTeam;
  final String losingTeamLogo;
  final String scoreOrStatus;
  final TipSituation situation;
  final double winningOdds;
  final double modelConfidence;
  final String category; // today, history, won, lost, pending

  const BettingTipModel({
    required this.id,
    required this.league,
    required this.time,
    required this.winningTeam,
    required this.winningTeamLogo,
    required this.losingTeam,
    required this.losingTeamLogo,
    required this.scoreOrStatus,
    required this.situation,
    required this.winningOdds,
    required this.modelConfidence,
    required this.category,
  });
}
