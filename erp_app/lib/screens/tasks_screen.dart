// /Users/erickmanrique/ErpConstruccion/erp_app/lib/screens/tasks_screen.dart

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class TasksScreen extends StatefulWidget {
  @override
  _TasksScreenState createState() => _TasksScreenState();
}

class _TasksScreenState extends State<TasksScreen> {
  List<dynamic> tasks = [];
  List<dynamic> projects = [];
  bool _isLoading = false;

  final List<String> areas = ["Admin", "Arqui", "Construccion"];
  final List<String> priorities = ["High", "Medium", "Low"];

  @override
  void initState() {
    super.initState();
    _loadInitialData();
  }

  Future<void> _loadInitialData() async {
    await _loadProjects();
    await _loadTasks();
  }

  Future<void> _loadTasks() async {
    setState(() {
      _isLoading = true;
    });
    var response = await http.get(Uri.parse('http://192.168.0.123:3000/tasks'));
    if (response.statusCode == 200) {
      setState(() {
        tasks = json.decode(response.body) as List;
      });
    } else {
      print('Failed to load tasks');
    }
    setState(() {
      _isLoading = false;
    });
  }

  Future<void> _loadProjects() async {
    var response = await http.get(Uri.parse('http://192.168.0.123:3000/projects'));
    if (response.statusCode == 200) {
      setState(() {
        projects = json.decode(response.body) as List;
      });
    }
  }

  String getProjectName(dynamic project) {
    final projectId = project is Map ? project['\$oid'] : project;
    final projectData = projects.firstWhere((proj) => proj['_id'] == projectId, orElse: () => null);
    return projectData != null ? projectData['name'] : 'Unknown Project';
  }

  Future<void> _showAddEditTaskDialog({Map<String, dynamic>? task}) async {
    final _nameController = TextEditingController(text: task?['name'] ?? '');
    String? selectedArea = task?['area'];
    String? selectedPriority = task?['priority'];
    String? selectedProject = task?['project'];
    final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(task == null ? 'Add Task' : 'Edit Task'),
        content: StatefulBuilder(
          builder: (BuildContext context, StateSetter setState) {
            return Form(
              key: _formKey,
              child: SingleChildScrollView(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    TextFormField(
                      controller: _nameController,
                      decoration: InputDecoration(labelText: 'Task Name'),
                      validator: (value) => value!.isEmpty ? 'This field cannot be empty' : null,
                    ),
                    DropdownButtonFormField(
                      value: selectedArea,
                      items: areas.map<DropdownMenuItem<String>>((String area) {
                        return DropdownMenuItem<String>(
                          value: area,
                          child: Text(area),
                        );
                      }).toList(),
                      onChanged: (String? newValue) {
                        setState(() {
                          selectedArea = newValue;
                        });
                      },
                      decoration: InputDecoration(labelText: 'Area'),
                    ),
                    DropdownButtonFormField(
                      value: selectedPriority,
                      items: priorities.map<DropdownMenuItem<String>>((String priority) {
                        return DropdownMenuItem<String>(
                          value: priority,
                          child: Text(priority),
                        );
                      }).toList(),
                      onChanged: (String? newValue) {
                        setState(() {
                          selectedPriority = newValue;
                        });
                      },
                      decoration: InputDecoration(labelText: 'Priority'),
                    ),
                    DropdownButtonFormField(
                      value: selectedProject,
                      items: projects.map<DropdownMenuItem<String>>((project) {
                        return DropdownMenuItem<String>(
                          value: project['_id'],
                          child: Text(project['name']),
                        );
                      }).toList(),
                      onChanged: (String? newValue) {
                        setState(() {
                          selectedProject = newValue;
                        });
                      },
                      decoration: InputDecoration(labelText: 'Project'),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
        actions: [
          TextButton(
            child: Text('Cancel'),
            onPressed: () => Navigator.of(context).pop(),
          ),
          TextButton(
            child: Text(task == null ? 'Add' : 'Update'),
            onPressed: () async {
              if (_formKey.currentState!.validate()) {
                var url = 'http://192.168.0.123:3000/tasks' + (task == null ? '' : '/${task['_id']}');
                var response = await http.post(
                  Uri.parse(url),
                  headers: {'Content-Type': 'application/json'},
                  body: json.encode({
                    'name': _nameController.text,
                    'area': selectedArea,
                    'priority': selectedPriority,
                    'project': selectedProject,
                  }),
                );
                if (response.statusCode == 200 || response.statusCode == 201) {
                  Navigator.of(context).pop();
                  _loadTasks();
                } else {
                  showDialog(
                    context: context,
                    builder: (ctx) => AlertDialog(
                      title: Text('Error'),
                      content: Text('Failed to ${task == null ? "add" : "update"} task. Status code: ${response.statusCode}.'),
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
        title: Text('Tasks'),
      ),
      body: _isLoading
          ? Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: tasks.length,
              itemBuilder: (context, index) {
                var task = tasks[index];
                return ListTile(
                  title: Text(task['name']),
                  subtitle: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Area: ${task['area']}'),
                      Text('Priority: ${task['priority']}'),
                      Text('Project: ${getProjectName(task['project'])}'),
                    ],
                  ),
                  onTap: () => _showAddEditTaskDialog(task: task),
                  trailing: IconButton(
                    icon: Icon(Icons.delete),
                    onPressed: () async {
                      var url = 'http://192.168.0.123:3000/tasks/${task['_id']}';
                      var response = await http.delete(Uri.parse(url));
                      if (response.statusCode == 200) {
                        _loadTasks();  // Reload to reflect changes
                      } else {
                        showDialog(
                          context: context,
                          builder: (ctx) => AlertDialog(
                            title: Text('Error'),
                            content: Text('Failed to delete task. Status code: ${response.statusCode}.'),
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
                );
              },
            ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _showAddEditTaskDialog(),
        child: Icon(Icons.add),
      ),
    );
  }
}
