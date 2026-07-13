import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/post.dart';
import '../models/profile.dart';
import '../services/repository.dart';
import '../state/preferences.dart';
import '../theme/app_colors.dart';
import '../widgets/follow_button.dart';
import '../widgets/post_card.dart';

class ProfileScreen extends StatefulWidget {
  final String username;

  const ProfileScreen({super.key, required this.username});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  Profile? _profile;
  List<Post>? _posts;
  int _followers = 0;
  int _following = 0;
  bool _isFollowing = false;
  bool _notFound = false;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    final profile = await Repository.fetchProfileByUsername(widget.username);
    if (profile == null) {
      if (mounted) setState(() => _notFound = true);
      return;
    }

    final currentUserId = supabase.auth.currentUser?.id;
    final results = await Future.wait([
      Repository.fetchFollowCounts(profile.id),
      Repository.fetchPostsByAuthor(profile),
      if (currentUserId != null)
        Repository.isFollowing(currentUserId, profile.id)
      else
        Future.value(false),
    ]);

    if (!mounted) return;
    setState(() {
      _profile = profile;
      final counts = results[0] as ({int followers, int following});
      _followers = counts.followers;
      _following = counts.following;
      _posts = results[1] as List<Post>;
      _isFollowing = results[2] as bool;
    });
  }

  @override
  Widget build(BuildContext context) {
    final t = context.watch<AppPreferences>().dict;
    final locale = context.watch<AppPreferences>().locale;
    final colors = context.colors;
    final currentUserId = supabase.auth.currentUser?.id;

    if (_notFound) {
      return Scaffold(
        appBar: AppBar(),
        body: const Center(child: Text('404')),
      );
    }

    if (_profile == null) {
      return Scaffold(
        appBar: AppBar(),
        body: const Center(child: CircularProgressIndicator()),
      );
    }

    final profile = _profile!;
    final isOwnProfile = currentUserId == profile.id;

    return Scaffold(
      appBar: AppBar(title: Text('@${profile.username}')),
      body: RefreshIndicator(
        onRefresh: _load,
        child: ListView(
          children: [
            Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          profile.name,
                          style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                        ),
                        Text('@${profile.username}', style: TextStyle(color: colors.muted)),
                        if (profile.bio != null && profile.bio!.isNotEmpty) ...[
                          const SizedBox(height: 8),
                          Text(profile.bio!),
                        ],
                        const SizedBox(height: 12),
                        Row(
                          children: [
                            _CountLabel(count: _followers, label: t.profile.followers),
                            const SizedBox(width: 16),
                            _CountLabel(count: _following, label: t.profile.following),
                          ],
                        ),
                      ],
                    ),
                  ),
                  CircleAvatar(
                    radius: 32,
                    backgroundColor: colors.surface,
                    foregroundImage: profile.avatarUrl != null
                        ? NetworkImage(profile.avatarUrl!)
                        : null,
                    child: profile.avatarUrl == null
                        ? Text(
                            profile.username.substring(0, 1).toUpperCase(),
                            style: TextStyle(fontSize: 20, color: colors.foreground),
                          )
                        : null,
                  ),
                ],
              ),
            ),
            if (!isOwnProfile && currentUserId != null)
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Align(
                  alignment: Alignment.centerLeft,
                  child: FollowButton(
                    targetUserId: profile.id,
                    following: _isFollowing,
                    labels: t.follow,
                    onChanged: _load,
                  ),
                ),
              ),
            const SizedBox(height: 8),
            if (_posts == null)
              const Padding(
                padding: EdgeInsets.all(32),
                child: Center(child: CircularProgressIndicator()),
              )
            else if (_posts!.isEmpty)
              Padding(
                padding: const EdgeInsets.all(32),
                child: Center(child: Text(t.profile.empty, style: TextStyle(color: colors.muted))),
              )
            else
              ..._posts!.map(
                (post) => PostCard(post: post, canLike: currentUserId != null, locale: locale),
              ),
          ],
        ),
      ),
    );
  }
}

class _CountLabel extends StatelessWidget {
  final int count;
  final String label;

  const _CountLabel({required this.count, required this.label});

  @override
  Widget build(BuildContext context) {
    final colors = context.colors;
    return RichText(
      text: TextSpan(
        style: TextStyle(color: colors.muted, fontSize: 14),
        children: [
          TextSpan(
            text: '$count ',
            style: TextStyle(color: colors.foreground, fontWeight: FontWeight.bold),
          ),
          TextSpan(text: label),
        ],
      ),
    );
  }
}
