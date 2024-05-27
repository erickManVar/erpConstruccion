import 'package:flutter/material.dart';
import 'home_screen.dart';  // Assume you have separate screens for each module
import 'tasks_screen.dart';
import 'projects_screen.dart';  // Ensure this is created

class DashboardScreen extends StatefulWidget {
  @override
  _DashboardScreenState createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  int _selectedIndex = 0;

  // Updated widget options to include new screens
  final List<Widget> _widgetOptions = [
    HomeScreen(),  // Custom widget for home
    TasksScreen(),  // Custom widget for tasks
    ProjectsScreen(),  // Custom widget for projects
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Dashboard'),
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: <Widget>[
            DrawerHeader(
              child: Text('Menu'),
              decoration: BoxDecoration(
                color: Colors.blue,
              ),
            ),
            ListTile(
              title: Text('Home'),
              onTap: () {
                Navigator.of(context).pop();
                _onItemTapped(0);
              },
            ),
            ListTile(
              title: Text('Tasks'),
              onTap: () {
                Navigator.of(context).pop();
                _onItemTapped(1);
              },
            ),
            ListTile(
              title: Text('Projects'),
              onTap: () {
                Navigator.of(context).pop();
                _onItemTapped(2);
              },
            ),
          ],
        ),
      ),
      body: Center(
        child: _widgetOptions.elementAt(_selectedIndex),
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.business),
            label: 'Tasks',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.school),
            label: 'Projects',
          ),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: Colors.amber[800],
        onTap: _onItemTapped,
      ),
    );
  }
}
