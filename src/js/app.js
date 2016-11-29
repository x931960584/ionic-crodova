var LingMall = angular.module('LingMall', ['ionic', 'controllers', 'ngCordova']);
debugger;
LingMall.run(function($ionicPlatform, $cordovaStatusbar) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        };
        // if (cordova.platformId == 'android') {
        //     $cordovaStatusbar.style(1);
        //     $cordovaStatusbar.styleLightContent();
        //     StatusBar.backgroundColorByHexString("#0099FF");
        // };
        // if (cordova.platformId == 'android') {
        //     StatusBar.backgroundColorByHexString('#387ef5');
        //     // $cordovaStatusbar.styleHex('#387ef5');
        //     // $cordovaStatusbar.overlaysWebView(false);
        //     // styles: Default : 0, LightContent: 1, BlackTranslucent: 2, BlackOpaque: 3
        //     // $cordovaStatusbar.style(1);
        //     // $cordovaStatusbar.styleLightContent();
        //     // $cordovaStatusbar.styleColor('blue');
        // } else {
        //     $cordovaStatusbar.overlaysWebView(false);
        //     // styles: Default : 0, LightContent: 1, BlackTranslucent: 2, BlackOpaque: 3
        //     $cordovaStatusbar.style(1);
        //     $cordovaStatusbar.styleLightContent();
        //     $cordovaStatusbar.styleColor('blue');
        // }
    });
});
LingMall.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');
    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .state('home', {
            url: '/home',
            abstract: true,
            templateUrl: 'views/home.html'
        })
        .state('home.main', {
            url: '/main',
            views: {
                'home-main': {
                    templateUrl: 'views/main.html',
                    controller: 'HomeMainCtrl'
                }
            }
        })
        .state('home.pintuan', {
            url: '/pintuan',
            views: {
                'home-pintuan': {
                    templateUrl: 'views/pintuan.html',
                    controller: 'HomePinTuanCtrl'
                }
            }
        })
        .state('home.category', {
            url: '/category',
            views: {
                'home-category': {
                    templateUrl: 'views/category.html',
                    controller: 'HomeCategoryCtrl'
                }
            }
        });
    $urlRouterProvider.otherwise('/home/main');
});