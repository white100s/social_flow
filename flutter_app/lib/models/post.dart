import 'profile.dart';

class Post {
  final String id;
  final String content;
  final DateTime createdAt;
  final Profile author;
  final int likeCount;
  final bool liked;

  Post({
    required this.id,
    required this.content,
    required this.createdAt,
    required this.author,
    required this.likeCount,
    required this.liked,
  });

  factory Post.fromFeedRow(
    Map<String, dynamic> json, {
    required Set<String> likedPostIds,
  }) {
    final authorJson = json['author'] as Map<String, dynamic>;
    final likesJson = json['likes'] as List<dynamic>?;
    final count = likesJson != null && likesJson.isNotEmpty
        ? (likesJson.first['count'] as num).toInt()
        : 0;

    return Post(
      id: json['id'] as String,
      content: json['content'] as String,
      createdAt: DateTime.parse(json['created_at'] as String),
      author: Profile.fromJson(authorJson),
      likeCount: count,
      liked: likedPostIds.contains(json['id']),
    );
  }

  factory Post.fromProfilePostRow(
    Map<String, dynamic> json, {
    required Profile author,
    required Set<String> likedPostIds,
  }) {
    final likesJson = json['likes'] as List<dynamic>?;
    final count = likesJson != null && likesJson.isNotEmpty
        ? (likesJson.first['count'] as num).toInt()
        : 0;

    return Post(
      id: json['id'] as String,
      content: json['content'] as String,
      createdAt: DateTime.parse(json['created_at'] as String),
      author: author,
      likeCount: count,
      liked: likedPostIds.contains(json['id']),
    );
  }
}
