import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../i18n/dictionaries.dart';
import '../models/post.dart';
import '../models/profile.dart';
import '../services/repository.dart';
import '../state/preferences.dart';
import '../theme/app_colors.dart';
import '../widgets/app_header.dart';
import '../widgets/post_card.dart';
import 'new_post_screen.dart';

class FeedScreen extends StatefulWidget {
  const FeedScreen({super.key});

  @override
  State<FeedScreen> createState() => _FeedScreenState();
}

class _FeedScreenState extends State<FeedScreen> {
  Profile? _currentProfile;
  List<Post>? _posts;
  String? _error;

  @override
  void initState() {
    super.initState();
    supabase.auth.onAuthStateChange.listen((_) => _refreshAll());
    _refreshAll();
  }

  Future<void> _refreshAll() async {
    await Future.wait([_loadProfile(), _loadFeed()]);
  }

  Future<void> _loadProfile() async {
    final profile = await Repository.fetchCurrentProfile();
    if (mounted) setState(() => _currentProfile = profile);
  }

  Future<void> _loadFeed() async {
    try {
      final posts = await Repository.fetchFeed();
      if (mounted) {
        setState(() {
          _posts = posts;
          _error = null;
        });
      }
    } catch (e) {
      if (mounted) setState(() => _error = e.toString());
    }
  }

  Future<void> _openComposer() async {
    final created = await Navigator.of(context).push<bool>(
      MaterialPageRoute(builder: (_) => const NewPostScreen()),
    );
    if (created == true) _loadFeed();
  }

  @override
  Widget build(BuildContext context) {
    final t = context.watch<AppPreferences>().dict;
    final locale = context.watch<AppPreferences>().locale;
    final colors = context.colors;
    final canLike = _currentProfile != null;

    return Scaffold(
      appBar: AppHeader(currentProfile: _currentProfile, onAuthChanged: _refreshAll),
      body: RefreshIndicator(
        onRefresh: _refreshAll,
        child: _buildBody(t, locale, colors, canLike),
      ),
      floatingActionButton: _currentProfile != null
          ? FloatingActionButton(onPressed: _openComposer, child: const Icon(Icons.add))
          : null,
    );
  }

  Widget _buildBody(Dictionary t, AppLocale locale, AppColors colors, bool canLike) {
    if (_error != null) {
      return Center(
        child: Text('${t.feed.loadError}: $_error', style: TextStyle(color: colors.dangerFg)),
      );
    }
    if (_posts == null) {
      return const Center(child: CircularProgressIndicator());
    }
    if (_posts!.isEmpty) {
      return ListView(
        children: [
          const SizedBox(height: 80),
          Center(child: Text(t.feed.empty, style: TextStyle(color: colors.muted))),
        ],
      );
    }
    return ListView.builder(
      itemCount: _posts!.length,
      itemBuilder: (context, index) => PostCard(
        post: _posts![index],
        canLike: canLike,
        locale: locale,
      ),
    );
  }
}
