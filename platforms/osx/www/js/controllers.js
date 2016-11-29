angular.module('controllers', ['ionic', 'ngCordova'])
    .controller('HomeMainCtrl', ['$scope', '$ionicPlatform', '$cordovaProgress', '$cordovaDevice', '$cordovaGeolocation', '$cordovaSplashscreen', '$cordovaDialogs', '$cordovaStatusbar', '$ionicSlideBoxDelegate', function($scope, $ionicPlatform, $cordovaProgress, $cordovaDevice, $cordovaGeolocation, $cordovaSplashscreen, $cordovaDialogs, $cordovaStatusbar, $ionicSlideBoxDelegate) {
        $scope.geoLocation = function() {
            var posOptions = { timeout: 10000, enableHighAccuracy: false };
            $cordovaProgress.showSimpleWithLabel(true, "定位中...");
            $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
                $cordovaProgress.hide();
                $scope.lat = position.coords.latitude;
                $scope.long = position.coords.longitude
            }, function(err) {
                $cordovaProgress.hide();
                $cordovaDialogs.alert('定位失败，请重新尝试', '提示信息', '确认').then(function() {

                });
            });
        };
        $ionicPlatform.ready(function() {
            $scope.geoLocation();
            // $cordovaProgress.showSimple(true); // requires .hide()

            // $cordovaProgress.showSimpleWithLabel(true, "Loading"); // .hide()

            // $cordovaProgress.showSimpleWithLabelDetail(true, "Loading", "detail");
            // // requires .hide()

            // $cordovaProgress.hide();

            // $cordovaProgress.showDeterminate(false, 100000);

            // $cordovaProgress.showDeterminateWithLabel(true, 50000, "Loading");

            // $cordovaProgress.showAnnular(true, 50000);

            // $cordovaProgress.showAnnularWithLabel(false, 100000, "Loading");

            // $cordovaProgress.showBar(true, 50000);

            // $cordovaProgress.showBarWithLabel(false, 100000, "Loading");

            // $cordovaProgress.showSuccess(false, "Success!"); // requires .hide()

            // $cordovaProgress.showText(false,100000,"Loading");// ios下有问题，暂未解决
            $scope.deviceInfo = {
                device: $cordovaDevice.getDevice(),
                cirdiva: $cordovaDevice.getCordova(),
                model: $cordovaDevice.getModel(),
                platform: $cordovaDevice.getPlatform(),
                uuid: $cordovaDevice.getUUID(),
                version: $cordovaDevice.getVersion()
            };
            $cordovaDialogs.alert($scope.deviceInfo, '本机信息', '确认').then(function() {
                // callback success
            });
            $scope.slides = [{ name: 'first' }, { name: 'second' }, { name: 'third' }];
            $ionicSlideBoxDelegate.$getByHandle('slides').update();
            $ionicSlideBoxDelegate.$getByHandle('slides').loop(true);
        });
    }])
    .controller('HomePinTuanCtrl', ['$scope', function($scope) {

    }])
    .controller('HomeCategoryCtrl', ['$scope', function($scope) {

    }]);
