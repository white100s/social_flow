import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../i18n/dictionaries.dart';

/// Locale + theme choice, persisted locally — mirrors the `locale`/`theme`
/// cookies used by the web app, just backed by SharedPreferences instead.
class AppPreferences extends ChangeNotifier {
  static const _localeKey = 'locale';
  static const _themeKey = 'theme';

  AppLocale locale = AppLocale.ko;
  Brightness brightness = Brightness.dark;

  Future<void> load() async {
    final prefs = await SharedPreferences.getInstance();
    locale = prefs.getString(_localeKey) == 'en' ? AppLocale.en : AppLocale.ko;
    brightness =
        prefs.getString(_themeKey) == 'light' ? Brightness.light : Brightness.dark;
    notifyListeners();
  }

  Future<void> toggleLocale() async {
    locale = locale == AppLocale.ko ? AppLocale.en : AppLocale.ko;
    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_localeKey, locale == AppLocale.ko ? 'ko' : 'en');
  }

  Future<void> toggleTheme() async {
    brightness = brightness == Brightness.dark ? Brightness.light : Brightness.dark;
    notifyListeners();
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_themeKey, brightness == Brightness.dark ? 'dark' : 'light');
  }

  Dictionary get dict => getDictionary(locale);
}
