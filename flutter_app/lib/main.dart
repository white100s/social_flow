import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'constants.dart';
import 'screens/feed_screen.dart';
import 'state/preferences.dart';
import 'theme/app_theme.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Supabase.initialize(
    url: SupabaseConfig.url,
    publishableKey: SupabaseConfig.anonKey,
  );

  final prefs = AppPreferences();
  await prefs.load();

  runApp(
    ChangeNotifierProvider.value(
      value: prefs,
      child: const SocialFlowApp(),
    ),
  );
}

class SocialFlowApp extends StatelessWidget {
  const SocialFlowApp({super.key});

  @override
  Widget build(BuildContext context) {
    final prefs = context.watch<AppPreferences>();

    return MaterialApp(
      title: prefs.dict.brand,
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light,
      darkTheme: AppTheme.dark,
      themeMode: prefs.brightness == Brightness.dark ? ThemeMode.dark : ThemeMode.light,
      home: const FeedScreen(),
    );
  }
}
