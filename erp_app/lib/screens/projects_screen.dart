// /Users/erickmanrique/ErpConstruccion/erp_app/lib/screens/projects_screen.dart

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class ProjectsScreen extends StatefulWidget {
  @override
  _ProjectsScreenState createState() => _ProjectsScreenState();
}

class _ProjectsScreenState extends State<ProjectsScreen> {
  List<dynamic> projects = [];
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _loadProjects();
  }

  Future<void> _loadProjects() async {
    setState(() {
      _isLoading = true;
    });
    var response = await http.get(Uri.parse('http://192.168.0.123:3000/projects'));
    if (response.statusCode == 200) {
      setState(() {
        projects = json.decode(response.body) as List;
      });
    } else {
      print('Failed to load projects');
    }
    setState(() {
      _isLoading = false;
    });
  }

  Future<void> _showAddEditProjectDialog({Map<String, dynamic>? project}) async {
    final _nameController = TextEditingController(text: project?['name'] ?? '');
    final _descriptionController = TextEditingController(text: project?['description'] ?? '');
    final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(project == null ? 'Add Project' : 'Edit Project'),
        content: SingleChildScrollView(
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextFormField(
                  controller: _nameController,
                  decoration: InputDecoration(labelText: 'Project Name'),
                  validator: (value) => value!.isEmpty ? 'This field cannot be empty' : null,
                ),
                TextFormField(
                  controller: _descriptionController,
                  decoration: InputDecoration(labelText: 'Description'),
                  validator: (value) => value!.isEmpty ? 'This field cannot be empty' : null,
                ),
              ],
            ),
          ),
        ),
        actions: [
          TextButton(
            child: Text('Cancel'),
            onPressed: () => Navigator.of(context).pop(),
          ),
          TextButton(
            child: Text(project == null ? 'Add' : 'Update'),
            onPressed: () async {
              if (_formKey.currentState!.validate()) {
                var url = 'http://192.168.0.123:3000/projects' + (project == null ? '' : '/${project['_id']}');
                var response = await http.post(
                  Uri.parse(url),
                  headers: {'Content-Type': 'application/json'},
                  body: json.encode({
                    'name': _nameController.text,
                    'description': _descriptionController.text,
                  }),
                );
                if (response.statusCode == 200 || response.statusCode == 201) {
                  Navigator.of(context).pop();
                  _loadProjects();
                } else {
                  showDialog(
                    context: context,
                    builder: (ctx) => AlertDialog(
                      title: Text('Error'),
                      content: Text('Failed to ${project == null ? "add" : "update"} project. Status code: ${response.statusCode}.'),
                      actions: <Widget>[
                        TextButton(
                          child: Text('Okay'),
                          onPressed: () {
                            Navigator.of(ctx).pop();
                          },
                        )
                      ],
                    ),
                  );
                }
              }
            },
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Projects'),
      ),
      body: _isLoading
          ? Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: projects.length,
              itemBuilder: (context, index) {
                var project = projects[index];
                return ListTile(
                  title: Text(project['name']),
                  subtitle: Text(project['description']),
                  onTap: () => _showAddEditProjectDialog(project: project),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        icon: Icon(Icons.edit),
                        onPressed: () => _showAddEditProjectDialog(project: project),
                      ),
                      IconButton(
                        icon: Icon(Icons.delete),
                        onPressed: () async {
                          var url = 'http://192.168.0.123:3000/projects/${project['_id']}';
                          var response = await http.delete(Uri.parse(url));
                          if (response.statusCode == 200) {
                            _loadProjects();  // Reload to reflect changes
                          } else {
                            showDialog(
                              context: context,
                              builder: (ctx) => AlertDialog(
                                title: Text('Error'),
                                content: Text('Failed to delete project. Status code: ${response.statusCode}.'),
                                actions: <Widget>[
                                  TextButton(
                                    child: Text('Okay'),
                                    onPressed: () {
                                      Navigator.of(ctx).pop();
                                    },
                                  )
                                ],
                              ),
                            );
                          }
                        },
                      ),
                    ],
                  ),
                );
              },
            ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _showAddEditProjectDialog(),
        child: Icon(Icons.add),
      ),
    );
  }
}
