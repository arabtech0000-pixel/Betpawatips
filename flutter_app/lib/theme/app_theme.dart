import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  static const Color primaryNeon = Color(0xFFCCFF00); // Electric athletic lime
  static const Color backgroundDark = Color(0xFF0B1008); // Pitch black
  static const Color surfaceDark = Color(0xFF131A10); // Elevated dark card
  static const Color surfaceCard = Color(0xFF1A2317); // Card background
  static const Color surfaceBorder = Color(0xFF263321); // Card border
  static const Color textPrimary = Color(0xFFFFFFFF);
  static const Color textSecondary = Color(0xFF9CA3AF);
  static const Color textMuted = Color(0xFF6B7280);
  static const Color accentGreen = Color(0xFF22C55E);
  static const Color accentRed = Color(0xFFEF4444);
  static const Color accentAmber = Color(0xFFF59E0B);
  static const Color accentCyan = Color(0xFF06B6D4);

  static ThemeData get darkTheme {
    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: backgroundDark,
      primaryColor: primaryNeon,
      colorScheme: const ColorScheme.dark(
        primary: primaryNeon,
        secondary: accentGreen,
        surface: surfaceDark,
        error: accentRed,
      ),
      textTheme: GoogleFonts.outfitTextTheme(ThemeData.dark().textTheme).copyWith(
        displayLarge: GoogleFonts.outfit(
          fontSize: 28,
          fontWeight: FontWeight.w900,
          color: textPrimary,
          letterSpacing: -0.5,
        ),
        headlineMedium: GoogleFonts.outfit(
          fontSize: 20,
          fontWeight: FontWeight.bold,
          color: textPrimary,
        ),
        titleMedium: GoogleFonts.outfit(
          fontSize: 16,
          fontWeight: FontWeight.w600,
          color: textPrimary,
        ),
        bodyMedium: GoogleFonts.outfit(
          fontSize: 14,
          color: textSecondary,
        ),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: false,
      ),
    );
  }
}
