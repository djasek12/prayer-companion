angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
})

.controller('WelcomeCtrl', function($scope) {
})

.controller('AlertCtrl', function($scope, $cordovaLocalNotification, $ionicPlatform, ionicTimePicker) {

  $scope.testValue = true;

  var ipObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {

        var selectedTime = new Date(val * 1000);

        var now = new Date();
        var year = now.getFullYear();
        var month = ("0" + (now.getMonth()+1)).slice(-2) -1;
        var date = ("0" + now.getDate()).slice(-2);
        var hours = selectedTime.getUTCHours();
        var minutes = selectedTime.getUTCMinutes();
        var seconds = 0;

        var newDate = new Date(year, month, date, hours, minutes, seconds);
        console.log("new date: " + newDate);

        cordova.plugins.notification.local.schedule({
          id         : 10,
          title      : 'reminder',
          text       : 'this is your message',
          every      : 'day',
          autoClear  : false,
          at         : newDate
        });

      }
    },
    inputTime: 25200,   //Optional
    format: 12,         //Optional
    step: 5,           //Optional
    setLabel: 'Set'    //Optional
  };

  $scope.selectTime = function () {
    ionicTimePicker.openTimePicker(ipObj1);
  };

  $scope.hours = [];
  for(var i=1; i<13; i++)
    $scope.hours.push(i);

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

//.controller('PlaylistCtrl', function($scope, $stateParams) {
//});
