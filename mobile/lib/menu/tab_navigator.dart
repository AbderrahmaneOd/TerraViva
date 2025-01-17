import 'package:TerraViva/screens/favorite/Favorite.dart';
import 'package:TerraViva/screens/quizzes/QuizScreen.dart';
import 'package:TerraViva/screens/search/searchScreen.dart';
import 'package:flutter/material.dart';
import '../screens/home/Home.dart';
import '../screens/saved/savedScreen.dart';
import 'tab_item.dart';

class TabNavigator extends StatelessWidget {
  const TabNavigator({super.key, required this.navigatorKey, required this.tabItem});
  final GlobalKey<NavigatorState>? navigatorKey;
  final TabItem tabItem;

  @override
  Widget build(BuildContext context) {
    late Widget child;
    if (tabItem == TabItem.home) {
      child = const Home();
    } else if (tabItem == TabItem.notes){
      child = const SavedNotesScreen();
    } 
    else if (tabItem == TabItem.favorites){
      child = const Favorite();
    } 
    else if(tabItem == TabItem.quizzes) {
      child = const QuizScreen();
    }
    else if(tabItem == TabItem.search){
      child = const SearchScreen();
    }
    return Navigator(
      key: navigatorKey,
      onGenerateRoute: (routeSettings) {
        return MaterialPageRoute(builder: (context) => child);
      },
    );
  }
}
