import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/repository.dart';
import '../state/preferences.dart';
import '../theme/app_colors.dart';

class NewPostScreen extends StatefulWidget {
  const NewPostScreen({super.key});

  @override
  State<NewPostScreen> createState() => _NewPostScreenState();
}

class _NewPostScreenState extends State<NewPostScreen> {
  final _content = TextEditingController();
  bool _busy = false;
  String? _error;

  @override
  void dispose() {
    _content.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    final t = context.read<AppPreferences>().dict.newPost;
    final text = _content.text.trim();
    if (text.isEmpty || text.length > 500) {
      setState(() => _error = t.lengthError);
      return;
    }
    setState(() {
      _busy = true;
      _error = null;
    });
    try {
      await Repository.createPost(text);
      if (mounted) Navigator.of(context).pop(true);
    } catch (e) {
      setState(() => _error = e.toString());
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = context.watch<AppPreferences>().dict.newPost;
    final colors = context.colors;

    return Scaffold(
      appBar: AppBar(
        title: Text(t.title),
        actions: [
          TextButton(
            onPressed: _busy ? null : _submit,
            child: Text(t.submit),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            if (_error != null) ...[
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: colors.dangerBg,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Text(_error!, style: TextStyle(color: colors.dangerFg)),
              ),
              const SizedBox(height: 12),
            ],
            TextField(
              controller: _content,
              maxLength: 500,
              maxLines: 8,
              decoration: InputDecoration(hintText: t.placeholder),
            ),
          ],
        ),
      ),
    );
  }
}
