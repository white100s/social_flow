import 'package:flutter/material.dart';
import '../i18n/dictionaries.dart';
import '../models/post.dart';
import '../screens/profile_screen.dart';
import '../services/repository.dart';
import '../theme/app_colors.dart';
import 'like_button.dart';

class PostCard extends StatelessWidget {
  final Post post;
  final bool canLike;
  final AppLocale locale;

  const PostCard({
    super.key,
    required this.post,
    required this.canLike,
    required this.locale,
  });

  @override
  Widget build(BuildContext context) {
    final colors = context.colors;

    void openProfile() {
      Navigator.of(context).push(
        MaterialPageRoute(
          builder: (_) => ProfileScreen(username: post.author.username),
        ),
      );
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      decoration: BoxDecoration(
        border: Border(bottom: BorderSide(color: colors.border)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          GestureDetector(
            onTap: openProfile,
            child: CircleAvatar(
              radius: 20,
              backgroundColor: colors.surface,
              foregroundImage: post.author.avatarUrl != null
                  ? NetworkImage(post.author.avatarUrl!)
                  : null,
              child: post.author.avatarUrl == null
                  ? Text(
                      post.author.username.substring(0, 1).toUpperCase(),
                      style: TextStyle(color: colors.foreground, fontWeight: FontWeight.w600),
                    )
                  : null,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                GestureDetector(
                  onTap: openProfile,
                  child: RichText(
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    text: TextSpan(
                      children: [
                        TextSpan(
                          text: post.author.name,
                          style: TextStyle(
                            color: colors.foreground,
                            fontWeight: FontWeight.w600,
                            fontSize: 14,
                          ),
                        ),
                        TextSpan(
                          text:
                              '  @${post.author.username} · ${timeAgo(locale, post.createdAt)}',
                          style: TextStyle(color: colors.muted, fontSize: 13),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  post.content,
                  style: TextStyle(color: colors.foreground, fontSize: 15, height: 1.3),
                ),
                LikeButton(
                  liked: post.liked,
                  count: post.likeCount,
                  enabled: canLike,
                  onToggle: (next) => Repository.toggleLike(post.id, !next),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
