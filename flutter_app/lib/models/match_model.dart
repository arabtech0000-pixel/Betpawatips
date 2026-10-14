class MatchModel {
  final String id;
  final String league;
  final String leagueFlag;
  final String team1;
  final String team2;
  final String team1Logo;
  final String team2Logo;
  final String score;
  final String time;
  final bool isLive;
  final String statusText;
  final double oddsTeam1;
  final double oddsDraw;
  final double oddsTeam2;
  final String venue;
  final String referee;
  final double possession1;
  final double possession2;
  final double xg1;
  final double xg2;
  final int shots1;
  final int shots2;
  final int shotsOnTarget1;
  final int shotsOnTarget2;
  final int corners1;
  final int corners2;
  final String team1Formation;
  final String team2Formation;
  final String team1Coach;
  final String team2Coach;
  final List<String> team1Subs;
  final List<String> team2Subs;
  final List<PlayerModel> team1Lineup;
  final List<PlayerModel> team2Lineup;
  final List<TimelineEventModel> events;
  final List<H2HMatchModel> headToHead;

  const MatchModel({
    required this.id,
    required this.league,
    required this.leagueFlag,
    required this.team1,
    required this.team2,
    required this.team1Logo,
    required this.team2Logo,
    required this.score,
    required this.time,
    this.isLive = false,
    required this.statusText,
    required this.oddsTeam1,
    required this.oddsDraw,
    required this.oddsTeam2,
    required this.venue,
    required this.referee,
    required this.possession1,
    required this.possession2,
    required this.xg1,
    required this.xg2,
    required this.shots1,
    required this.shots2,
    required this.shotsOnTarget1,
    required this.shotsOnTarget2,
    required this.corners1,
    required this.corners2,
    this.team1Formation = '4-3-3',
    this.team2Formation = '4-2-3-1',
    this.team1Coach = 'Head Coach',
    this.team2Coach = 'Head Coach',
    this.team1Subs = const [],
    this.team2Subs = const [],
    required this.team1Lineup,
    required this.team2Lineup,
    required this.events,
    required this.headToHead,
  });
}

class PlayerModel {
  final int number;
  final String name;
  final String role;
  final double rating;
  final String position; // GK, DEF, MID, FWD

  const PlayerModel({
    required this.number,
    required this.name,
    required this.role,
    required this.rating,
    required this.position,
  });
}

class TimelineEventModel {
  final String minute;
  final String eventType; // goal, yellow_card, red_card, sub
  final String player;
  final String team;
  final String description;

  const TimelineEventModel({
    required this.minute,
    required this.eventType,
    required this.player,
    required this.team,
    required this.description,
  });
}

class H2HMatchModel {
  final String date;
  final String team1;
  final String team2;
  final String score;
  final String competition;

  const H2HMatchModel({
    required this.date,
    required this.team1,
    required this.team2,
    required this.score,
    required this.competition,
  });
}
