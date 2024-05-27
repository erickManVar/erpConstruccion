import 'package:http/http.dart' as http;
import 'dart:convert';

class ProjectService {
  final String baseUrl = 'http://192.168.0.123:3000/projects'; // Update IP accordingly

  Future<List<dynamic>> fetchProjects() async {
    try {
      final response = await http.get(Uri.parse(baseUrl));
      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else {
        throw Exception('Failed to load projects');
      }
    } catch (e) {
      throw Exception('Failed to load projects: $e');
    }
  }

  Future<void> addProject(Map<String, dynamic> projectData) async {
    final response = await http.post(
      Uri.parse(baseUrl),
      headers: {'Content-Type': 'application/json'},
      body: json.encode(projectData),
    );
    if (response.statusCode != 201) {
      throw Exception('Failed to add project');
    }
  }

  Future<void> updateProject(String id, Map<String, dynamic> projectData) async {
    final response = await http.put(
      Uri.parse('$baseUrl/$id'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode(projectData),
    );
    if (response.statusCode != 200) {
      throw Exception('Failed to update project');
    }
  }

  Future<void> deleteProject(String id) async {
    final response = await http.delete(Uri.parse('$baseUrl/$id'));
    if (response.statusCode != 200) {
      throw Exception('Failed to delete project');
    }
  }
}
