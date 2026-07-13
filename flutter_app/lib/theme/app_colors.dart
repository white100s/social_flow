import 'package:flutter/material.dart';

/// Mirrors the semantic color tokens used in the Next.js web app
/// (src/app/globals.css) so both clients feel consistent.
@immutable
class AppColors extends ThemeExtension<AppColors> {
  final Color background;
  final Color foreground;
  final Color surface;
  final Color border;
  final Color muted;
  final Color dangerBg;
  final Color dangerFg;

  const AppColors({
    required this.background,
    required this.foreground,
    required this.surface,
    required this.border,
    required this.muted,
    required this.dangerBg,
    required this.dangerFg,
  });

  static const light = AppColors(
    background: Color(0xFFFFFFFF),
    foreground: Color(0xFF17181A),
    surface: Color(0xFFF5F5F6),
    border: Color(0xFFE4E4E6),
    muted: Color(0xFF6B6B70),
    dangerBg: Color(0xFFFDEAEA),
    dangerFg: Color(0xFFB3261E),
  );

  // Soft charcoal instead of pure black to keep dark mode comfortable.
  static const dark = AppColors(
    background: Color(0xFF17181A),
    foreground: Color(0xFFF2F2F0),
    surface: Color(0xFF202124),
    border: Color(0xFF313236),
    muted: Color(0xFF98999D),
    dangerBg: Color(0xFF3A2020),
    dangerFg: Color(0xFFF3A3A3),
  );

  @override
  AppColors copyWith({
    Color? background,
    Color? foreground,
    Color? surface,
    Color? border,
    Color? muted,
    Color? dangerBg,
    Color? dangerFg,
  }) {
    return AppColors(
      background: background ?? this.background,
      foreground: foreground ?? this.foreground,
      surface: surface ?? this.surface,
      border: border ?? this.border,
      muted: muted ?? this.muted,
      dangerBg: dangerBg ?? this.dangerBg,
      dangerFg: dangerFg ?? this.dangerFg,
    );
  }

  @override
  AppColors lerp(ThemeExtension<AppColors>? other, double t) {
    if (other is! AppColors) return this;
    return AppColors(
      background: Color.lerp(background, other.background, t)!,
      foreground: Color.lerp(foreground, other.foreground, t)!,
      surface: Color.lerp(surface, other.surface, t)!,
      border: Color.lerp(border, other.border, t)!,
      muted: Color.lerp(muted, other.muted, t)!,
      dangerBg: Color.lerp(dangerBg, other.dangerBg, t)!,
      dangerFg: Color.lerp(dangerFg, other.dangerFg, t)!,
    );
  }
}

extension AppColorsX on BuildContext {
  AppColors get colors => Theme.of(this).extension<AppColors>()!;
}
