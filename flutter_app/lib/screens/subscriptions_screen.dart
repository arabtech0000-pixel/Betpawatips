import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/subscription_model.dart';
import '../providers/app_provider.dart';
import '../theme/app_theme.dart';

class SubscriptionsScreen extends StatelessWidget {
  const SubscriptionsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<AppProvider>(context);

    return Scaffold(
      backgroundColor: AppTheme.backgroundDark,
      appBar: AppBar(
        title: const Row(
          children: [
            Icon(Icons.workspace_premium, color: AppTheme.primaryNeon, size: 22),
            SizedBox(width: 8),
            Text('Premium Plans', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
          ],
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header summary
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    AppTheme.primaryNeon.withOpacity(0.12),
                    AppTheme.surfaceCard,
                  ],
                ),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppTheme.primaryNeon.withOpacity(0.3)),
              ),
              child: const Row(
                children: [
                  Icon(Icons.shield, color: AppTheme.primaryNeon, size: 30),
                  SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Unlock Pro Betting & Aviator Insights',
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: Colors.white),
                        ),
                        SizedBox(height: 2),
                        Text(
                          'Choose the package tailored for you in Ugandan Shillings (UGX).',
                          style: TextStyle(fontSize: 11, color: AppTheme.textSecondary),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // The 3 exact plans:
            // 1) 1 Week - 25,000 UGX
            // 2) 1 Month - 55,000 UGX
            // 3) VIP - 90,000 UGX
            ...SubscriptionPlanModel.plans.map((plan) {
              final isCurrent = provider.activeSubscriptionId == plan.id;
              return _buildPlanCard(context, plan, isCurrent, provider);
            }).toList(),

            const SizedBox(height: 80),
          ],
        ),
      ),
    );
  }

  Widget _buildPlanCard(
    BuildContext context,
    SubscriptionPlanModel plan,
    bool isCurrent,
    AppProvider provider,
  ) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: AppTheme.surfaceCard,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(
          color: isCurrent
              ? AppTheme.primaryNeon
              : plan.isVip
                  ? Colors.amber.withOpacity(0.6)
                  : AppTheme.surfaceBorder,
          width: isCurrent || plan.isVip ? 1.5 : 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text(
                        plan.name,
                        style: const TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                      if (plan.isPopular) ...[
                        const SizedBox(width: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                          decoration: BoxDecoration(
                            color: AppTheme.primaryNeon,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: const Text(
                            'POPULAR',
                            style: TextStyle(fontSize: 9, fontWeight: FontWeight.w900, color: Colors.black),
                          ),
                        ),
                      ],
                      if (plan.isVip) ...[
                        const SizedBox(width: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                          decoration: BoxDecoration(
                            color: Colors.amber,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: const Text(
                            'VIP',
                            style: TextStyle(fontSize: 9, fontWeight: FontWeight.w900, color: Colors.black),
                          ),
                        ),
                      ],
                    ],
                  ),
                  const SizedBox(height: 2),
                  Text(
                    plan.duration,
                    style: const TextStyle(fontSize: 12, color: AppTheme.textSecondary),
                  ),
                ],
              ),
              Text(
                plan.formattedPrice,
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w900,
                  color: plan.isVip ? Colors.amber : AppTheme.primaryNeon,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          // Perks list
          ...plan.perks.map((perk) => Padding(
            padding: const EdgeInsets.only(bottom: 6),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Icon(Icons.check_circle, size: 16, color: AppTheme.primaryNeon),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    perk,
                    style: const TextStyle(fontSize: 12, color: Colors.white70),
                  ),
                ),
              ],
            ),
          )),
          const SizedBox(height: 16),
          // Action button
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: isCurrent ? AppTheme.surfaceBorder : AppTheme.primaryNeon,
                foregroundColor: isCurrent ? Colors.white70 : Colors.black,
                padding: const EdgeInsets.symmetric(vertical: 12),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
              ),
              onPressed: () {
                if (isCurrent) {
                  provider.cancelSubscription();
                } else {
                  provider.activateSubscription(plan.id);
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text('${plan.name} activated for ${plan.formattedPrice}!'),
                      backgroundColor: AppTheme.surfaceCard,
                    ),
                  );
                }
              },
              child: Text(
                isCurrent ? 'ACTIVE PLAN (TAP TO CANCEL)' : 'ACTIVATE FOR ${plan.formattedPrice}',
                style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 12),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
