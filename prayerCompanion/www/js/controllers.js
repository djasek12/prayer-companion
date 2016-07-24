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

.controller('AlertCtrl', function($scope, $cordovaLocalNotification, $ionicPlatform, ionicTimePicker, ionicDatePicker) {

    var dateObj = {
        callback: function (val) {
            $scope.date = new Date(val);
            console.log('date: ' + $scope.date);
        },
        from: new Date(),
        inputDate: new Date(),
        disableWeekdays: [0],
        closeOnSelect: false,
        templateType: 'popup'
    };

    var timeObj = {
        callback: function (val) {      //Mandatory
            if (typeof (val) === 'undefined') {
                console.log('Time not selected');
            } else {
                $scope.time = new Date(val);;
                console.log("time: " + $scope.time);
            }
        },
        inputTime: 25200,   //Optional
        format: 12,         //Optional
        step: 5,           //Optional
        setLabel: 'Set'    //Optional
    };

    $scope.openDatePicker = function(){
        ionicDatePicker.openDatePicker(dateObj);
    };

    $scope.openTimePicker = function(){
        ionicTimePicker.openTimePicker(timeObj);
    };

    $scope.setReminderText = function() {
        var reminderText;
        switch($scope.reminderType)
        {
            case "prayer":
            $scope.reminderText = "Remember to pray ";
            switch($scope.prayerType)
            {
                case "ourFather":
                $scope.reminderText += "an Our Father";
                break;
                case "hailMary":
                $scope.reminderText += "a Hail Mary";
                break;
                case "gloryBe":
                $scope.reminderText += "a Glory Be";
                break;
            }
        }

        console.log("reminderText: " + reminderText);
    }

    $scope.scheduleReminder = function() {

        var selectedTime = new Date($scope.time * 1000);

        var now = new Date();
        var year = now.getFullYear();
        var month = ("0" + (now.getMonth()+1)).slice(-2) -1;
        var date = ("0" + now.getDate()).slice(-2);
        var hours = selectedTime.getUTCHours();
        var minutes = selectedTime.getUTCMinutes();
        var seconds = 0;

        var newDate = new Date(year, month, date, hours, minutes, seconds);

        console.log("reminderType: " + $scope.reminderType);
        console.log("reminderText: " + $scope.reminderText);
        console.log("frequency: " + $scope.frequency);
        console.log("new date: " + newDate);

        document.addEventListener('deviceready', function () {
            cordova.plugins.notification.local.schedule({
                id: 10,
                title: $scope.reminderType,
                text: $scope.reminderText,
                every: $scope.frequency,
                autoClear: false,
                at: newDate
            });
        });
    };

    // add extra permissions needed for iOS

    document.addEventListener('deviceready', function () {
        // window.plugin.notification.local is now available

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
