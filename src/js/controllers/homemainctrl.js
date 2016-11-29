controllers.controller('HomeMainCtrl', ['$scope', '$ionicPlatform', '$cordovaProgress', '$cordovaDevice', '$cordovaGeolocation', '$cordovaSplashscreen', '$cordovaDialogs', '$cordovaStatusbar', '$ionicSlideBoxDelegate', function($scope, $ionicPlatform, $cordovaProgress, $cordovaDevice, $cordovaGeolocation, $cordovaSplashscreen, $cordovaDialogs, $cordovaStatusbar, $ionicSlideBoxDelegate) {
    $ionicPlatform.ready(function() {
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
        $scope.slides = [
            { name: 'first', imgSrc: 'http://img10.3lian.com/show2014/4/83/1.jpg' },
            { name: 'second', imgSrc: 'http://img10.3lian.com/show2014/4/83/3.jpg' },
            { name: 'third', imgSrc: 'http://img10.3lian.com/show2015/5/49/78.jpg' }
        ];
        $scope.model = {
            activeIndex: 0
        };
        $scope.pageClick = function(index) {
            $scope.model.activeIndex = index;
        };
        //当图片切换后，触发此事件，注意参数
        $scope.slideHasChanged = function($index) {
            console.log("slideHasChanged index = ", $index);
        };
        $ionicSlideBoxDelegate.update();
        // $ionicSlideBoxDelegate.$getByHandle('slides').loop(true);
    });
}]);
