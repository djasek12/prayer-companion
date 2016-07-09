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

  .state('app.reminders', {
      url: '/reminders',
      views: {
        'menuContent': {
          templateUrl: 'templates/reminders.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/welcome.html',
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

    function setDailyAlert(hour)
    {

      var now = new Date();
      var year = now.getFullYear();
      var month = ("0" + (now.getMonth()+1)).slice(-2) -1;
      var date = ("0" + now.getDate()).slice(-2);
      var hours = ("0" + now.getHours()).slice(-2);
      var minutes = ("0" + now.getMinutes()).slice(-2);
      var seconds = ("0" + now.getSeconds()).slice(-2);

      //var intHour = parseInt(hour);
      //var newHours = intHour.toString();

      var newDate = new Date(year, month, date, hour, 0, 0)
      return newDate
    }

    // add extra permissions needed for iOS

    $scope.testFunc = function () {

      console.log(setDailyAlert(23));
    };

    document.addEventListener('deviceready', function () {
      // window.plugin.notification.local is now available

      $scope.scheduleSpecificHourNotification = function () {

        cordova.plugins.notification.local.schedule({
          id         : 7,
          title      : 'specific',
          text       : 'message',
          every      : 'hour',
          autoClear  : false,
          at         : setDailyAlert(23)
        });

      };

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
      };

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

      $scope.scheduleEveryHourNotification2 = function () {
        $cordovaLocalNotification.add({
          id: 4,
          title: 'hour 2',
          message: 'message',
          at: new Date(new Date().getTime()),
          every: "hour"
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

      $scope.scheduleEveryWeekNotification2 = function () {
        $cordovaLocalNotification.add({
          id: 6,
          title: 'week 2',
          message: 'message',
          at: new Date(new Date().getTime()),
          every: "week"
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
