import 'package:flutter/material.dart';
import '../theme/app_colors.dart';

class LikeButton extends StatefulWidget {
  final bool liked;
  final int count;
  final bool enabled;
  final Future<void> Function(bool nextLiked) onToggle;

  const LikeButton({
    super.key,
    required this.liked,
    required this.count,
    required this.enabled,
    required this.onToggle,
  });

  @override
  State<LikeButton> createState() => _LikeButtonState();
}

class _LikeButtonState extends State<LikeButton> {
  late bool _liked = widget.liked;
  late int _count = widget.count;
  bool _busy = false;

  @override
  void didUpdateWidget(covariant LikeButton oldWidget) {
    super.didUpdateWidget(oldWidget);
    _liked = widget.liked;
    _count = widget.count;
  }

  Future<void> _handleTap() async {
    if (!widget.enabled || _busy) return;
    final next = !_liked;
    setState(() {
      _liked = next;
      _count += next ? 1 : -1;
      _busy = true;
    });
    try {
      await widget.onToggle(next);
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _liked = !next;
        _count += next ? -1 : 1;
      });
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final colors = context.colors;
    return InkWell(
      borderRadius: BorderRadius.circular(999),
      onTap: widget.enabled ? _handleTap : null,
      child: Opacity(
        opacity: widget.enabled ? 1 : 0.5,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                _liked ? Icons.favorite : Icons.favorite_border,
                size: 20,
                color: _liked ? Colors.red : colors.muted,
              ),
              const SizedBox(width: 6),
              Text(
                '$_count',
                style: TextStyle(
                  color: _liked ? Colors.red : colors.muted,
                  fontSize: 14,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
