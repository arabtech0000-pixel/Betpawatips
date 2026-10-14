// File generated for Firebase configuration matching betwin-afa78
import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      default:
        return android;
    }
  }

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyA1-ozPjo7numKr1tihz4g-4OX4PMqxHc0',
    appId: '1:49225504165:android:1d4429f1160cb96c68c44c',
    messagingSenderId: '49225504165',
    projectId: 'betwin-afa78',
    databaseURL: 'https://betwin-afa78-default-rtdb.firebaseio.com',
    storageBucket: 'betwin-afa78.firebasestorage.app',
  );

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyA1-ozPjo7numKr1tihz4g-4OX4PMqxHc0',
    appId: '1:49225504165:web:kickpredict',
    messagingSenderId: '49225504165',
    projectId: 'betwin-afa78',
    databaseURL: 'https://betwin-afa78-default-rtdb.firebaseio.com',
    storageBucket: 'betwin-afa78.firebasestorage.app',
  );
}
