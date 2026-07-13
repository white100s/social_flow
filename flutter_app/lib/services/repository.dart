import 'package:supabase_flutter/supabase_flutter.dart';
import '../models/post.dart';
import '../models/profile.dart';

SupabaseClient get supabase => Supabase.instance.client;

class Repository {
  static Future<List<Post>> fetchFeed() async {
    final userId = supabase.auth.currentUser?.id;

    final rows = await supabase
        .from('posts')
        .select(
          'id, content, created_at, author:profiles!posts_author_id_fkey(username, display_name, avatar_url), likes(count)',
        )
        .filter('reply_to_id', 'is', null)
        .order('created_at', ascending: false)
        .limit(50);

    final ids = rows.map((r) => r['id'] as String).toList();
    final liked = await _likedPostIds(userId, ids);

    return rows
        .map((row) => Post.fromFeedRow(row, likedPostIds: liked))
        .toList();
  }

  static Future<Set<String>> _likedPostIds(String? userId, List<String> postIds) async {
    if (userId == null || postIds.isEmpty) return {};
    final rows = await supabase
        .from('likes')
        .select('post_id')
        .eq('user_id', userId)
        .inFilter('post_id', postIds);
    return rows.map((r) => r['post_id'] as String).toSet();
  }

  static Future<void> createPost(String content) async {
    final userId = supabase.auth.currentUser!.id;
    await supabase.from('posts').insert({'author_id': userId, 'content': content});
  }

  static Future<void> toggleLike(String postId, bool currentlyLiked) async {
    final userId = supabase.auth.currentUser!.id;
    if (currentlyLiked) {
      await supabase.from('likes').delete().match({
        'post_id': postId,
        'user_id': userId,
      });
    } else {
      await supabase.from('likes').insert({'post_id': postId, 'user_id': userId});
    }
  }

  static Future<Profile?> fetchCurrentProfile() async {
    final userId = supabase.auth.currentUser?.id;
    if (userId == null) return null;
    final row = await supabase
        .from('profiles')
        .select('id, username, display_name, avatar_url, bio')
        .eq('id', userId)
        .maybeSingle();
    return row == null ? null : Profile.fromJson(row);
  }

  static Future<Profile?> fetchProfileByUsername(String username) async {
    final row = await supabase
        .from('profiles')
        .select('id, username, display_name, avatar_url, bio')
        .eq('username', username)
        .maybeSingle();
    return row == null ? null : Profile.fromJson(row);
  }

  static Future<({int followers, int following})> fetchFollowCounts(String userId) async {
    final followers = await supabase
        .from('follows')
        .select('follower_id')
        .eq('following_id', userId)
        .count(CountOption.exact);
    final following = await supabase
        .from('follows')
        .select('following_id')
        .eq('follower_id', userId)
        .count(CountOption.exact);
    return (followers: followers.count, following: following.count);
  }

  static Future<bool> isFollowing(String followerId, String followingId) async {
    if (followerId == followingId) return false;
    final row = await supabase
        .from('follows')
        .select('follower_id')
        .eq('follower_id', followerId)
        .eq('following_id', followingId)
        .maybeSingle();
    return row != null;
  }

  static Future<void> toggleFollow(
    String targetUserId,
    bool currentlyFollowing,
  ) async {
    final userId = supabase.auth.currentUser!.id;
    if (currentlyFollowing) {
      await supabase.from('follows').delete().match({
        'follower_id': userId,
        'following_id': targetUserId,
      });
    } else {
      await supabase
          .from('follows')
          .insert({'follower_id': userId, 'following_id': targetUserId});
    }
  }

  static Future<List<Post>> fetchPostsByAuthor(Profile author) async {
    final userId = supabase.auth.currentUser?.id;
    final rows = await supabase
        .from('posts')
        .select('id, content, created_at, likes(count)')
        .eq('author_id', author.id)
        .filter('reply_to_id', 'is', null)
        .order('created_at', ascending: false);

    final ids = rows.map((r) => r['id'] as String).toList();
    final liked = await _likedPostIds(userId, ids);

    return rows
        .map(
          (row) =>
              Post.fromProfilePostRow(row, author: author, likedPostIds: liked),
        )
        .toList();
  }
}
