class SubscriptionPlanModel {
  final String id;
  final String name;
  final String duration;
  final int priceUgx;
  final String formattedPrice;
  final List<String> perks;
  final bool isPopular;
  final bool isVip;

  const SubscriptionPlanModel({
    required this.id,
    required this.name,
    required this.duration,
    required this.priceUgx,
    required this.formattedPrice,
    required this.perks,
    this.isPopular = false,
    this.isVip = false,
  });

  static const List<SubscriptionPlanModel> plans = [
    SubscriptionPlanModel(
      id: 'plan_1_week',
      name: '1 Week Access',
      duration: '7 Days Access',
      priceUgx: 25000,
      formattedPrice: '25,000 UGX',
      perks: [
        'Full access to all Football Betting Tips',
        'Real-time Aviator Crash Predictor',
        'Daily winning team highlights',
        'Push notifications for high confidence tips',
        'Standard odds analysis',
      ],
    ),
    SubscriptionPlanModel(
      id: 'plan_1_month',
      name: '1 Month Pro',
      duration: '30 Days Access',
      priceUgx: 55000,
      formattedPrice: '55,000 UGX',
      isPopular: true,
      perks: [
        'All 1-Week tier features included',
        'Full month uninterrupted access',
        'High-odds accumulators (3+ matches)',
        'Priority Aviator next round target alerts',
        'Save 45,000 UGX vs weekly renewal',
      ],
    ),
    SubscriptionPlanModel(
      id: 'plan_vip_infinity',
      name: 'VIP Infinity',
      duration: 'Unlimited VIP Access',
      priceUgx: 90000,
      formattedPrice: '90,000 UGX',
      isVip: true,
      perks: [
        'VIP Tips with higher model accuracy',
        'Infinity tips daily (as many tips as you need)',
        'Aviator Hyper-Overflow target signals (5x-100x)',
        'Direct 1-on-1 Analyst insights',
        'Exclusive early-access weekend tickets',
      ],
    ),
  ];
}
