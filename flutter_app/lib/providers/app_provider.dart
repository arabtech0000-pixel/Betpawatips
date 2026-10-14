import 'package:flutter/foundation.dart';
import '../models/match_model.dart';
import '../models/betting_tip_model.dart';
import '../models/subscription_model.dart';
import '../models/aviator_round_model.dart';
import '../services/football_data_service.dart';

class AppProvider extends ChangeNotifier {
  final FootballDataService _footballService = FootballDataService();

  int _currentTabIndex = 0;
  String? _activeSubscriptionId;
  String _selectedTipsTab = 'today'; // today, history, won, lost, pending
  String _searchQuery = '';
  bool _isSearchExpanded = false;
  MatchModel? _selectedMatch;

  // Live Football API state
  List<MatchModel> _apiMatches = [];
  List<BettingTipModel> _apiTips = [];
  bool _isLoadingFootballData = false;
  String? _footballApiStatusMessage;

  // Aviator live simulation state
  double _currentAviatorMultiplier = 1.00;
  bool _isAviatorFlying = false;
  double _nextPredictedMultiplier = 3.85;
  double _safeCashoutTarget = 2.10;
  int _confidence = 88;

  int get currentTabIndex => _currentTabIndex;
  String? get activeSubscriptionId => _activeSubscriptionId;
  String get selectedTipsTab => _selectedTipsTab;
  String get searchQuery => _searchQuery;
  bool get isSearchExpanded => _isSearchExpanded;
  MatchModel? get selectedMatch => _selectedMatch;

  // Football Data API Getters
  FootballDataService get footballService => _footballService;
  List<MatchModel> get apiMatches => _apiMatches;
  List<BettingTipModel> get apiTips => _apiTips;
  bool get isLoadingFootballData => _isLoadingFootballData;
  String? get footballApiStatusMessage => _footballApiStatusMessage;
  String get footballApiToken => _footballService.apiToken;
  bool get hasFootballApiToken => _footballService.hasToken;

  /// Combined tips (API matches converted to tips + curated system tips)
  List<BettingTipModel> get allTips {
    if (_apiTips.isEmpty) return tipsData;
    return [..._apiTips, ...tipsData];
  }

  double get currentAviatorMultiplier => _currentAviatorMultiplier;
  bool get isAviatorFlying => _isAviatorFlying;
  double get nextPredictedMultiplier => _nextPredictedMultiplier;
  double get safeCashoutTarget => _safeCashoutTarget;
  int get confidence => _confidence;

  bool get isSubscribed => _activeSubscriptionId != null;
  bool get isVip => _activeSubscriptionId == 'plan_vip_infinity';

  Future<void> updateFootballApiToken(String token) async {
    await _footballService.setApiToken(token);
    notifyListeners();
    await fetchLiveMatches();
  }

  Future<void> fetchLiveMatches({String? competition}) async {
    _isLoadingFootballData = true;
    _footballApiStatusMessage = 'Connecting to Football-Data.org...';
    notifyListeners();

    try {
      final matches = await _footballService.fetchMatches(competition: competition);
      if (matches.isNotEmpty) {
        _apiMatches = matches;
        _apiTips = _footballService.generateTips(matches);
        _footballApiStatusMessage = 'Live data loaded (${matches.length} matches)';
      } else {
        _footballApiStatusMessage = _footballService.hasToken
            ? 'No matches scheduled right now'
            : 'Enter Football-Data API token to unlock live feeds';
      }
    } catch (e) {
      _footballApiStatusMessage = 'API connection error: $e';
    } finally {
      _isLoadingFootballData = false;
      notifyListeners();
    }
  }

  void setTabIndex(int index) {
    _currentTabIndex = index;
    notifyListeners();
  }

  void activateSubscription(String planId) {
    _activeSubscriptionId = planId;
    notifyListeners();
  }

  void cancelSubscription() {
    _activeSubscriptionId = null;
    notifyListeners();
  }

  void setTipsTab(String tab) {
    _selectedTipsTab = tab;
    notifyListeners();
  }

  void setSearchQuery(String query) {
    _searchQuery = query;
    notifyListeners();
  }

  void toggleSearch(bool expanded) {
    _isSearchExpanded = expanded;
    if (!expanded) _searchQuery = '';
    notifyListeners();
  }

  void selectMatch(MatchModel? match) {
    _selectedMatch = match;
    notifyListeners();
  }

  void regenerateAviatorPrediction() {
    final multipliers = [2.45, 3.85, 5.20, 1.95, 7.80, 12.40, 2.15, 4.60];
    multipliers.shuffle();
    _nextPredictedMultiplier = multipliers.first;
    _safeCashoutTarget = (_nextPredictedMultiplier * 0.65).clamp(1.20, 4.50);
    _confidence = 82 + (multipliers.first * 1.5).toInt().clamp(0, 15);
    notifyListeners();
  }

  // Arsenal vs Chelsea match data
  static final MatchModel arsenalVsChelsea = MatchModel(
    id: 'match-arsenal-chelsea',
    league: 'Premier League',
    leagueFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    team1: 'Arsenal',
    team2: 'Chelsea',
    team1Logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=160&q=80',
    team2Logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=160&q=80',
    score: '2 - 1',
    time: "68'",
    isLive: true,
    statusText: "LIVE 68'",
    oddsTeam1: 1.82,
    oddsDraw: 3.65,
    oddsTeam2: 4.10,
    venue: 'Emirates Stadium, London',
    referee: 'Anthony Taylor',
    possession1: 58.0,
    possession2: 42.0,
    xg1: 2.14,
    xg2: 0.95,
    shots1: 14,
    shots2: 7,
    shotsOnTarget1: 6,
    shotsOnTarget2: 3,
    corners1: 8,
    corners2: 3,
    team1Formation: '4-3-3',
    team2Formation: '4-2-3-1',
    team1Coach: 'Mikel Arteta',
    team2Coach: 'Enzo Maresca',
    team1Subs: const [
      'Jorginho (CM)',
      'Leandro Trossard (LW)',
      'Gabriel Jesus (ST)',
      'Raheem Sterling (RW)',
      'Riccardo Calafiori (LB)',
      'Jakub Kiwior (CB)',
      'Neto (GK)'
    ],
    team2Subs: const [
      'Christopher Nkunku (ST)',
      'Joao Felix (AM)',
      'Pedro Neto (RW)',
      'Romeo Lavia (DM)',
      'Tosin Adarabioyo (CB)',
      'Kiernan Dewsbury-Hall (CM)',
      'Filip Jorgensen (GK)'
    ],
    team1Lineup: const [
      PlayerModel(number: 1, name: 'David Raya', role: 'Goalkeeper', rating: 7.2, position: 'GK'),
      PlayerModel(number: 4, name: 'Ben White', role: 'Right Back', rating: 7.5, position: 'DEF'),
      PlayerModel(number: 2, name: 'William Saliba', role: 'Centre Back', rating: 8.1, position: 'DEF'),
      PlayerModel(number: 6, name: 'Gabriel Magalhães', role: 'Centre Back', rating: 7.9, position: 'DEF'),
      PlayerModel(number: 12, name: 'Jurriën Timber', role: 'Left Back', rating: 7.4, position: 'DEF'),
      PlayerModel(number: 5, name: 'Thomas Partey', role: 'Defensive Mid', rating: 7.6, position: 'MID'),
      PlayerModel(number: 41, name: 'Declan Rice', role: 'Central Mid', rating: 8.4, position: 'MID'),
      PlayerModel(number: 8, name: 'Martin Ødegaard (C)', role: 'Attacking Mid', rating: 8.8, position: 'MID'),
      PlayerModel(number: 7, name: 'Bukayo Saka', role: 'Right Winger', rating: 8.9, position: 'FWD'),
      PlayerModel(number: 29, name: 'Kai Havertz', role: 'Striker', rating: 8.0, position: 'FWD'),
      PlayerModel(number: 11, name: 'Gabriel Martinelli', role: 'Left Winger', rating: 7.7, position: 'FWD'),
    ],
    team2Lineup: const [
      PlayerModel(number: 1, name: 'Robert Sánchez', role: 'Goalkeeper', rating: 6.8, position: 'GK'),
      PlayerModel(number: 27, name: 'Malo Gusto', role: 'Right Back', rating: 6.9, position: 'DEF'),
      PlayerModel(number: 29, name: 'Wesley Fofana', role: 'Centre Back', rating: 7.0, position: 'DEF'),
      PlayerModel(number: 6, name: 'Levi Colwill', role: 'Centre Back', rating: 7.1, position: 'DEF'),
      PlayerModel(number: 3, name: 'Marc Cucurella', role: 'Left Back', rating: 7.2, position: 'DEF'),
      PlayerModel(number: 25, name: 'Moisés Caicedo', role: 'Defensive Mid', rating: 7.8, position: 'MID'),
      PlayerModel(number: 8, name: 'Enzo Fernández', role: 'Central Mid', rating: 7.5, position: 'MID'),
      PlayerModel(number: 20, name: 'Cole Palmer', role: 'Attacking Mid', rating: 8.3, position: 'MID'),
      PlayerModel(number: 11, name: 'Noni Madueke', role: 'Right Winger', rating: 7.3, position: 'FWD'),
      PlayerModel(number: 15, name: 'Nicolas Jackson', role: 'Striker', rating: 7.0, position: 'FWD'),
      PlayerModel(number: 7, name: 'Pedro Neto', role: 'Left Winger', rating: 7.1, position: 'FWD'),
    ],
    events: const [
      TimelineEventModel(minute: "22'", eventType: 'goal', player: 'Bukayo Saka', team: 'Arsenal', description: 'Curling finish inside far post from edge of box'),
      TimelineEventModel(minute: "38'", eventType: 'goal', player: 'Cole Palmer', team: 'Chelsea', description: 'Left foot strike into top corner'),
      TimelineEventModel(minute: "54'", eventType: 'yellow_card', player: 'Marc Cucurella', team: 'Chelsea', description: 'Tactical foul on Saka on counterattack'),
      TimelineEventModel(minute: "65'", eventType: 'goal', player: 'Kai Havertz', team: 'Arsenal', description: 'Header from Rice out-swinging corner'),
    ],
    headToHead: const [
      H2HMatchModel(date: 'Apr 2024', team1: 'Arsenal', team2: 'Chelsea', score: '5 - 0', competition: 'Premier League'),
      H2HMatchModel(date: 'Oct 2023', team1: 'Chelsea', team2: 'Arsenal', score: '2 - 2', competition: 'Premier League'),
      H2HMatchModel(date: 'May 2023', team1: 'Arsenal', team2: 'Chelsea', score: '3 - 1', competition: 'Premier League'),
      H2HMatchModel(date: 'Nov 2022', team1: 'Chelsea', team2: 'Arsenal', score: '0 - 1', competition: 'Premier League'),
    ],
  );

  // List of betting tips with clean winning and losing teams
  static const List<BettingTipModel> tipsData = [
    BettingTipModel(
      id: 'tip-1',
      league: 'Premier League',
      time: "68' LIVE",
      winningTeam: 'Arsenal',
      winningTeamLogo: '⚽',
      losingTeam: 'Chelsea',
      losingTeamLogo: '🔵',
      scoreOrStatus: '2 - 1',
      situation: TipSituation.won,
      winningOdds: 1.82,
      modelConfidence: 86.5,
      category: 'today',
    ),
    BettingTipModel(
      id: 'tip-2',
      league: 'La Liga',
      time: "Tonight 22:00",
      winningTeam: 'Barcelona',
      winningTeamLogo: '🔴',
      losingTeam: 'Athletic Bilbao',
      losingTeamLogo: '⚪',
      scoreOrStatus: 'Upcoming',
      situation: TipSituation.pending,
      winningOdds: 1.62,
      modelConfidence: 89.2,
      category: 'today',
    ),
    BettingTipModel(
      id: 'tip-3',
      league: 'UEFA Champions League',
      time: 'Tomorrow 21:00',
      winningTeam: 'Real Madrid',
      winningTeamLogo: '👑',
      losingTeam: 'Borussia Dortmund',
      losingTeamLogo: '🟡',
      scoreOrStatus: 'Upcoming',
      situation: TipSituation.pending,
      winningOdds: 1.75,
      modelConfidence: 91.0,
      category: 'today',
    ),
    BettingTipModel(
      id: 'tip-4',
      league: 'Premier League',
      time: 'Yesterday FT',
      winningTeam: 'Manchester City',
      winningTeamLogo: '🩵',
      losingTeam: 'Wolves',
      losingTeamLogo: '🐺',
      scoreOrStatus: '3 - 0',
      situation: TipSituation.won,
      winningOdds: 1.34,
      modelConfidence: 84.8,
      category: 'history',
    ),
    BettingTipModel(
      id: 'tip-5',
      league: 'Bundesliga',
      time: 'Yesterday FT',
      winningTeam: 'Bayern Munich',
      winningTeamLogo: '🔴',
      losingTeam: 'Stuttgart',
      losingTeamLogo: '⚪',
      scoreOrStatus: '4 - 0',
      situation: TipSituation.won,
      winningOdds: 1.48,
      modelConfidence: 88.0,
      category: 'won',
    ),
    BettingTipModel(
      id: 'tip-6',
      league: 'Serie A',
      time: 'Last Weekend',
      winningTeam: 'Juventus',
      winningTeamLogo: '🦓',
      losingTeam: 'Lazio',
      losingTeamLogo: '🦅',
      scoreOrStatus: '0 - 1',
      situation: TipSituation.lost,
      winningOdds: 2.10,
      modelConfidence: 68.0,
      category: 'lost',
    ),
  ];
}
