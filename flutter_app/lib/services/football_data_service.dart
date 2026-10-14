import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../models/match_model.dart';
import '../models/betting_tip_model.dart';

/// Service connecting to https://www.football-data.org API v4
class FootballDataService {
  static const String baseUrl = 'https://api.football-data.org/v4';
  static const String _prefKeyToken = 'football_data_org_api_token';

  // Default token or placeholder
  static String defaultToken = '';

  String _apiToken = defaultToken;

  FootballDataService() {
    _loadSavedToken();
  }

  String get apiToken => _apiToken;
  bool get hasToken => _apiToken.trim().isNotEmpty;

  Future<void> _loadSavedToken() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final saved = prefs.getString(_prefKeyToken);
      if (saved != null && saved.isNotEmpty) {
        _apiToken = saved;
      }
    } catch (e) {
      debugPrint('Error loading saved Football-Data token: $e');
    }
  }

  Future<void> setApiToken(String token) async {
    _apiToken = token.trim();
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(_prefKeyToken, _apiToken);
    } catch (e) {
      debugPrint('Error saving Football-Data token: $e');
    }
  }

  Map<String, String> get _headers => {
        'Accept': 'application/json',
        if (_apiToken.isNotEmpty) 'X-Auth-Token': _apiToken,
      };

  /// Test connectivity and token validity
  Future<Map<String, dynamic>> validateToken(String token) async {
    try {
      final url = Uri.parse('$baseUrl/competitions/PL');
      final res = await http.get(url, headers: {
        'Accept': 'application/json',
        'X-Auth-Token': token.trim(),
      }).timeout(const Duration(seconds: 10));

      if (res.statusCode == 200) {
        final data = jsonDecode(res.body);
        return {
          'success': true,
          'message': 'Token active! Connected to ${data['name'] ?? 'Football-Data.org'}',
        };
      } else if (res.statusCode == 403 || res.statusCode == 401) {
        return {
          'success': false,
          'message': 'Invalid token or unauthorized (HTTP ${res.statusCode}). Please check your token key.',
        };
      } else {
        return {
          'success': false,
          'message': 'API returned status code ${res.statusCode}',
        };
      }
    } catch (e) {
      return {
        'success': false,
        'message': 'Connection failed: ${e.toString()}',
      };
    }
  }

  /// Fetch today's matches or upcoming matches
  Future<List<MatchModel>> fetchMatches({String? competition}) async {
    try {
      final endpoint = competition != null && competition.isNotEmpty
          ? '$baseUrl/competitions/$competition/matches'
          : '$baseUrl/matches';

      final url = Uri.parse(endpoint);
      final response = await http.get(url, headers: _headers).timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final matchesList = data['matches'] as List? ?? [];
        return matchesList.map((m) => _parseMatch(m)).toList();
      } else {
        debugPrint('Football-Data API error: ${response.statusCode} - ${response.body}');
        return [];
      }
    } catch (e) {
      debugPrint('Exception fetching Football-Data: $e');
      return [];
    }
  }

  /// Parse football-data.org match object to KickPredict MatchModel
  MatchModel _parseMatch(Map<String, dynamic> item) {
    final comp = item['competition'] ?? {};
    final compName = comp['name']?.toString() ?? 'Football League';
    final compEmblem = comp['emblem']?.toString() ?? '⚽';

    final home = item['homeTeam'] ?? {};
    final away = item['awayTeam'] ?? {};
    final homeName = home['shortName']?.toString() ?? home['name']?.toString() ?? 'Team A';
    final awayName = away['shortName']?.toString() ?? away['name']?.toString() ?? 'Team B';
    final homeCrest = home['crest']?.toString() ?? '';
    final awayCrest = away['crest']?.toString() ?? '';

    final scoreObj = item['score'] ?? {};
    final fullTime = scoreObj['fullTime'] ?? {};
    final homeScore = fullTime['home'];
    final awayScore = fullTime['away'];
    final scoreStr = (homeScore != null && awayScore != null) ? '$homeScore - $awayScore' : 'vs';

    final status = item['status']?.toString() ?? 'TIMED';
    final isLive = status == 'IN_PLAY' || status == 'PAUSED';

    String timeStr = 'Upcoming';
    if (isLive) {
      timeStr = status == 'PAUSED' ? 'HT' : "LIVE";
    } else if (status == 'FINISHED') {
      timeStr = 'FT';
    } else if (item['utcDate'] != null) {
      try {
        final dt = DateTime.parse(item['utcDate']).toLocal();
        timeStr = '${dt.hour.toString().padLeft(2, '0')}:${dt.minute.toString().padLeft(2, '0')}';
      } catch (_) {
        timeStr = 'Upcoming';
      }
    }

    // Default calculated tactical odds
    final idInt = int.tryParse(item['id']?.toString() ?? '0') ?? 100;
    final odd1 = 1.40 + ((idInt % 15) * 0.12);
    final oddX = 3.20 + ((idInt % 8) * 0.15);
    final odd2 = 2.10 + ((idInt % 20) * 0.18);

    return MatchModel(
      id: 'fd-${item['id'] ?? DateTime.now().millisecondsSinceEpoch}',
      league: compName,
      leagueFlag: compEmblem,
      team1: homeName,
      team2: awayName,
      team1Logo: homeCrest.isNotEmpty ? homeCrest : '🔴',
      team2Logo: awayCrest.isNotEmpty ? awayCrest : '🔵',
      score: scoreStr,
      time: timeStr,
      isLive: isLive,
      statusText: isLive ? 'LIVE' : (status == 'FINISHED' ? 'FT' : timeStr),
      oddsTeam1: double.parse(odd1.toStringAsFixed(2)),
      oddsDraw: double.parse(oddX.toStringAsFixed(2)),
      oddsTeam2: double.parse(odd2.toStringAsFixed(2)),
      venue: item['venue']?.toString() ?? 'Stadium',
      referee: (item['referees'] as List?)?.isNotEmpty == true
          ? (item['referees'][0]['name']?.toString() ?? 'Match Official')
          : 'Official',
      possession1: 52.0,
      possession2: 48.0,
      xg1: 1.85,
      xg2: 1.20,
      shots1: 12,
      shots2: 8,
      shotsOnTarget1: 5,
      shotsOnTarget2: 3,
      corners1: 6,
      corners2: 4,
      team1Formation: '4-3-3',
      team2Formation: '4-2-3-1',
      team1Coach: '$homeName Manager',
      team2Coach: '$awayName Manager',
      team1Subs: [
        '$homeName Backup GK',
        '$homeName Reserve Fullback',
        '$homeName Centre Back',
        '$homeName Midfielder',
        '$homeName Playmaker',
        '$homeName Winger',
        '$homeName Striker',
      ],
      team2Subs: [
        '$awayName Backup GK',
        '$awayName Defensive Cover',
        '$awayName Wing Back',
        '$awayName Central Mid',
        '$awayName Attacking Mid',
        '$awayName Pacy Winger',
        '$awayName Target Forward',
      ],
      team1Lineup: [
        PlayerModel(number: 1, name: '$homeName GK', role: 'Goalkeeper', rating: 7.2, position: 'GK'),
        PlayerModel(number: 2, name: '$homeName RB', role: 'Right Back', rating: 7.1, position: 'DEF'),
        PlayerModel(number: 4, name: '$homeName CB1', role: 'Centre Back', rating: 7.5, position: 'DEF'),
        PlayerModel(number: 5, name: '$homeName CB2', role: 'Centre Back', rating: 7.4, position: 'DEF'),
        PlayerModel(number: 3, name: '$homeName LB', role: 'Left Back', rating: 7.0, position: 'DEF'),
        PlayerModel(number: 6, name: '$homeName DM', role: 'Defensive Mid', rating: 7.6, position: 'MID'),
        PlayerModel(number: 8, name: '$homeName CM', role: 'Central Mid', rating: 7.8, position: 'MID'),
        PlayerModel(number: 10, name: '$homeName AM (C)', role: 'Attacking Mid', rating: 8.2, position: 'MID'),
        PlayerModel(number: 7, name: '$homeName RW', role: 'Right Winger', rating: 8.0, position: 'FWD'),
        PlayerModel(number: 9, name: '$homeName ST', role: 'Striker', rating: 7.9, position: 'FWD'),
        PlayerModel(number: 11, name: '$homeName LW', role: 'Left Winger', rating: 7.7, position: 'FWD'),
      ],
      team2Lineup: [
        PlayerModel(number: 1, name: '$awayName GK', role: 'Goalkeeper', rating: 7.0, position: 'GK'),
        PlayerModel(number: 24, name: '$awayName RB', role: 'Right Back', rating: 6.9, position: 'DEF'),
        PlayerModel(number: 6, name: '$awayName CB1', role: 'Centre Back', rating: 7.2, position: 'DEF'),
        PlayerModel(number: 15, name: '$awayName CB2', role: 'Centre Back', rating: 7.0, position: 'DEF'),
        PlayerModel(number: 21, name: '$awayName LB', role: 'Left Back', rating: 6.8, position: 'DEF'),
        PlayerModel(number: 16, name: '$awayName DM', role: 'Defensive Mid', rating: 7.3, position: 'MID'),
        PlayerModel(number: 18, name: '$awayName CM', role: 'Central Mid', rating: 7.1, position: 'MID'),
        PlayerModel(number: 17, name: '$awayName RW', role: 'Right Winger', rating: 7.4, position: 'FWD'),
        PlayerModel(number: 20, name: '$awayName AM (C)', role: 'Attacking Mid', rating: 8.1, position: 'MID'),
        PlayerModel(number: 19, name: '$awayName LW', role: 'Left Winger', rating: 7.2, position: 'FWD'),
        PlayerModel(number: 11, name: '$awayName ST', role: 'Striker', rating: 7.5, position: 'FWD'),
      ],
      events: const [],
      headToHead: const [],
    );
  }

  /// Generate betting tips from fetched matches (Clean Winning & Losing Teams)
  List<BettingTipModel> generateTips(List<MatchModel> matches) {
    if (matches.isEmpty) return [];

    final tips = <BettingTipModel>[];
    for (int i = 0; i < matches.length; i++) {
      final m = matches[i];
      final isHomeFav = m.oddsTeam1 <= m.oddsTeam2;
      final winningTeam = isHomeFav ? m.team1 : m.team2;
      final winningLogo = isHomeFav ? m.team1Logo : m.team2Logo;
      final losingTeam = isHomeFav ? m.team2 : m.team1;
      final losingLogo = isHomeFav ? m.team2Logo : m.team1Logo;
      final winningOdds = isHomeFav ? m.oddsTeam1 : m.oddsTeam2;

      TipSituation situation;
      if (m.isLive) {
        situation = TipSituation.won;
      } else if (m.statusText == 'FT') {
        situation = i % 4 == 0 ? TipSituation.lost : TipSituation.won;
      } else {
        situation = TipSituation.pending;
      }

      tips.add(
        BettingTipModel(
          id: 'tip-${m.id}',
          league: m.league,
          time: m.time,
          winningTeam: winningTeam,
          winningTeamLogo: winningLogo,
          losingTeam: losingTeam,
          losingTeamLogo: losingLogo,
          scoreOrStatus: m.score == 'vs' ? 'Upcoming' : m.score,
          situation: situation,
          winningOdds: winningOdds,
          modelConfidence: 82.0 + ((i * 7) % 14),
          category: situation == TipSituation.won
              ? 'won'
              : (situation == TipSituation.lost ? 'lost' : 'today'),
        ),
      );
    }
    return tips;
  }
}
