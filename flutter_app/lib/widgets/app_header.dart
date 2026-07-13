import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/profile.dart';
import '../screens/login_screen.dart';
import '../screens/new_post_screen.dart';
import '../screens/profile_screen.dart';
import '../services/repository.dart';
import '../state/preferences.dart';
import '../theme/app_colors.dart';

class AppHeader extends StatelessWidget implements PreferredSizeWidget {
  final Profile? currentProfile;
  final VoidCallback? onAuthChanged;

  const AppHeader({super.key, required this.currentProfile, this.onAuthChanged});

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);

  @override
  Widget build(BuildContext context) {
    final prefs = context.watch<AppPreferences>();
    final t = prefs.dict;
    final colors = context.colors;

    return AppBar(
      title: Text(t.brand, style: const TextStyle(fontWeight: FontWeight.bold)),
      actions: [
        if (currentProfile != null) ...[
          IconButton(
            tooltip: t.nav.newPost,
            icon: const Icon(Icons.add_circle_outline),
            onPressed: () => Navigator.of(context).push(
              MaterialPageRoute(builder: (_) => const NewPostScreen()),
            ),
          ),
          IconButton(
            tooltip: '@${currentProfile!.username}',
            icon: const Icon(Icons.person_outline),
            onPressed: () => Navigator.of(context).push(
              MaterialPageRoute(
                builder: (_) => ProfileScreen(username: currentProfile!.username),
              ),
            ),
          ),
          IconButton(
            tooltip: t.nav.logout,
            icon: const Icon(Icons.logout),
            onPressed: () async {
              await supabase.auth.signOut();
              onAuthChanged?.call();
            },
          ),
        ] else
          TextButton(
            onPressed: () => Navigator.of(context).push(
              MaterialPageRoute(builder: (_) => const LoginScreen()),
            ),
            child: Text(t.nav.login),
          ),
        IconButton(
          tooltip: 'Theme',
          icon: Icon(prefs.brightness == Brightness.dark
              ? Icons.light_mode_outlined
              : Icons.dark_mode_outlined),
          onPressed: prefs.toggleTheme,
        ),
        TextButton(
          onPressed: prefs.toggleLocale,
          child: Text(
            prefs.locale.name == 'ko' ? 'EN' : 'KO',
            style: TextStyle(color: colors.foreground, fontWeight: FontWeight.w600),
          ),
        ),
        const SizedBox(width: 8),
      ],
    );
  }
}
