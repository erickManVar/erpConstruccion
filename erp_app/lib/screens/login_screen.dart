import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart'; // Import this
import 'dart:convert';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  bool _isLoading = false;
  final storage = FlutterSecureStorage(); // Initialize secure storage

  void _login() async {
  setState(() {
    _isLoading = true;
  });
  var url = 'http://192.168.0.123:3000/auth/login'; // Ensure this IP is accessible
  try {
    var response = await http.post(
      Uri.parse(url),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'email': _emailController.text,
        'password': _passwordController.text,
      }),
    );

    print('Response status: ${response.statusCode}');
    print('Response body: ${response.body}');

    if (response.statusCode == 200 || (response.statusCode == 201 && response.body.contains('access_token'))) {
      var data = json.decode(response.body);
      if (data['access_token'] != null) {
        await storage.write(key: 'token', value: data['access_token']); // Store the token
        Navigator.of(context).pushReplacementNamed('/dashboard');
      } else {
        _showErrorDialog('Login succeeded but no token received.');
      }
    } else {
      _showErrorDialog('Failed to login. Status code: ${response.statusCode}. Response: ${response.body}');
    }
  } catch (e) {
    print('Error occurred: $e');
    _showErrorDialog('Failed to login. Error: $e');
  } finally {
    if (mounted) {
      setState(() {
        _isLoading = false;
      });
    }
  }
}


  void _showErrorDialog(String message) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text('Error'),
        content: Text(message),
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Login'),
      ),
      body: Center(
        child: _isLoading
            ? CircularProgressIndicator()
            : Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    TextField(
                      controller: _emailController,
                      decoration: InputDecoration(hintText: 'Email'),
                    ),
                    TextField(
                      controller: _passwordController,
                      obscureText: true,
                      decoration: InputDecoration(hintText: 'Password'),
                    ),
                    ElevatedButton(
                      onPressed: _login,
                      child: Text('Login'),
                    ),
                  ],
                ),
              ),
      ),
    );
  }
}
