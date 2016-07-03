// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
})

  .controller('SampleController', function($scope, $cordovaLocalNotification, $ionicPlatform) {

    document.addEventListener('deviceready', function () {
      // window.plugin.notification.local is now available

      $scope.scheduleEveryMinuteNotification = function () {

        cordova.plugins.notification.local.schedule({
          id         : 1,
          title      : 'minute 1',
          text       : 'message',
          every      : 'minute',
          autoClear  : false,
          at         : new Date(new Date().getTime())
        });

      };

      $scope.scheduleEveryMinuteNotification2 = function () {
      $cordovaLocalNotification.add({
        id: 3,
        title: 'minute 2',
        message: 'message',
        at: new Date(new Date().getTime()),
        every: "minute"
      });
      }

      $scope.scheduleEveryHourNotification2 = function () {
        $cordovaLocalNotification.add({
          id: 4,
          title: 'hour 2',
          message: 'message',
          at: new Date(new Date().getTime()),
          every: "hour"
        });
      }

      $scope.scheduleEveryHourNotification = function () {

        cordova.plugins.notification.local.schedule({
          id         : 2,
          title      : 'hour 1',
          text       : 'message',
          every      : 'hour',
          autoClear  : false,
          at         : new Date(new Date().getTime())
        });

      };

      $scope.scheduleEveryWeekNotification = function () {

        cordova.plugins.notification.local.schedule({
          id         : 5,
          title      : 'week 1',
          text       : 'message',
          every      : 'week',
          autoClear  : false,
          at         : new Date(new Date().getTime())
        });

      };

      $scope.cancelAllNotifications = function () {
        // cancel all scheduled notifications
        cordova.plugins.notification.local.cancelAll(
          function () {
            alert('ok, all canceled');
          }
        )
      };

      $scope.displayNotifications = function () {
        cordova.plugins.notification.local.getScheduledIds(
          function (scheduledIds) {
            alert(scheduledIds.join(', '));
          }
        )
      };

    }, false);
  });
