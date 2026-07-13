import 'package:flutter/material.dart';
import '../i18n/dictionaries.dart';
import '../services/repository.dart';
import '../theme/app_colors.dart';

class FollowButton extends StatefulWidget {
  final String targetUserId;
  final bool following;
  final FollowStrings labels;
  final VoidCallback? onChanged;

  const FollowButton({
    super.key,
    required this.targetUserId,
    required this.following,
    required this.labels,
    this.onChanged,
  });

  @override
  State<FollowButton> createState() => _FollowButtonState();
}

class _FollowButtonState extends State<FollowButton> {
  late bool _following = widget.following;
  bool _busy = false;

  Future<void> _handleTap() async {
    if (_busy) return;
    setState(() => _busy = true);
    final wasFollowing = _following;
    try {
      await Repository.toggleFollow(widget.targetUserId, wasFollowing);
      setState(() => _following = !wasFollowing);
      widget.onChanged?.call();
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final colors = context.colors;
    if (_following) {
      return OutlinedButton(
        onPressed: _busy ? null : _handleTap,
        child: Text(widget.labels.following),
      );
    }
    return ElevatedButton(
      onPressed: _busy ? null : _handleTap,
      style: ElevatedButton.styleFrom(
        backgroundColor: colors.foreground,
        foregroundColor: colors.background,
        minimumSize: const Size(0, 44),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(999)),
      ),
      child: Text(widget.labels.follow),
    );
  }
}
