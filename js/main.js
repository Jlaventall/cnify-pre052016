
/**
 * Main AngularJS Web Application
 */
var app = angular.module('mysite', [
  'ngRoute','ui.bootstrap'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    // Pages
	.when("/CNify-process", {templateUrl: "partials/CNify-process.html", controller: "PageCtrl"})
    .when("/china", {templateUrl: "partials/china.html", controller: "PageCtrl"})
    .when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})
    .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
	.when("/china-market-entry", {templateUrl: "partials/china-market-entry.html", controller: "PageCtrl"})
    .when("/travel-and-destination", {templateUrl: "partials/travel-and-destination.html", controller: "PageCtrl"})
    .when("/sell-to-china", {templateUrl: "partials/sell-to-china.html", controller: "PageCtrl"})
    .when("/awesome-chinese-content", {templateUrl: "partials/awesome-chinese-content.html", controller: "PageCtrl"})
    .when("/impactful-promotion-in-china", {templateUrl: "partials/impactful-promotion-in-china.html", controller: "PageCtrl"})
	
    // else 404
    .otherwise({templateUrl: "partials/404.html", controller: "PageCtrl"});
	
	//remove # hash
	//$locationProvider.html5Mode(true);
}]);

app.service('anchorSmoothScroll', function() {
    this.scrollTo = function(eID) {

        // This scrolling function 
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
        
        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
        
        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }
        
        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }
    };
});

/**
 * Controls the Anchor links
 */

app.controller('ScrollController', ['$scope', '$location', 'anchorSmoothScroll',
  function ($scope, $location, anchorSmoothScroll) {
    $scope.gotoContent = function() {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('Content');

      // call $anchorScroll()
      //$anchorScroll();
      anchorSmoothScroll.scrollTo("Content");
    };
  }]);
  
 /**
 * Controls weixin popup in footer
 */ 
 
app.controller('CollapseCtrl', function ($scope) {
  $scope.isCollapsed = true;
});

/**
 * Controls Modal - login
 */
app.controller('LoginCtrl', function ($scope, $modalInstance) {
  console.log('$scope.username');
  $scope.username = 'asdasd';
  $scope.login = function () {
    console.log($scope.username);
    console.log($scope.password);
  };

  $scope.cancel = function () {
    console.log('message');
    $modalInstance.dismiss('cancel');
  };
});

app.controller('ModalRegisterCtrl', function ($scope, $modal, $log) {
console.log('ModalRegisterCtrl');
  $scope.items = ['item1', 'item2', 'item3'];
  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'templates/login.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});


/**
 * Controls Modal - signup
 */

app.controller('ModalSignupCtrl', function ($scope, $modal, $log) {
console.log('ModalSignupCtrl');
  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'templates/signup.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

/**
 * Controls Tabs
 */

app.service('AuthorizationService', ['$http', '$route', '$location', '$window',
    function ($http, $route, $location, $window) {
      this.login = function (username, password) {

        return $http.post('https://my.cnify.com/login_to_cnify/',
        $.param({username: username, password: password}),
        { headers: {'Content-Type': 'application/x-www-form-urlencoded'}, withCredentials: true})

      };

      this.register = function (username, password1, password2, email) {

      return $http.post('https://my.cnify.com/register_to_cnify/',
        $.param({grant_type: 'password', username: username, password1: password1, password2: password2, email: email}),
        { headers: {'Content-Type': 'application/x-www-form-urlencoded'}, withCredentials: true});
      };

      this.forgotten = function (email) {

      return $http.post('https://my.cnify.com/password_reset_to_cnify/',
        $.param({email: email}),
        { headers: {'Content-Type': 'application/x-www-form-urlencoded'}, withCredentials: true});
      };

    }]);

app.controller('TabsDemoCtrl', function ($scope, $window, AuthorizationService) {
  console.log('TabsDemoCtrl');

  var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
  $scope.regError = {};
  $scope.regSuccess = {};
  $scope.logError = {};
  $scope.forgotError = {};
  $scope.forgotSuccess = {};
    
  $scope.closeAlert = function (err) {
    err.message = null;
  };
    
  $scope.tabs = [
    { title:'Register', content:'RegisterForm' },
    { title:'Login', content:'LoginForm', disabled: true },
    { title:'Password', content:'PasswordForm', disabled: true }
  ];

  $scope.register = function (username, password1, password2, email) {
      $scope.regError = {};
    $scope.regSuccess = {};

    if (!username) {
      $scope.regError.userError = true;
      $scope.regError.message = 'Field Username is required.';
      return;
    } else if (!password1) {
      $scope.regError.passwordError = true;
      $scope.regError.message = 'Field Password is required.';
      return;
    } else if (!password2) {
      $scope.regError.passwordError = true;
      $scope.regError.message = 'Please repeat your password.';
      return;
    } else if (!email) {
      $scope.regError.emailError = true;
      $scope.regError.message = 'Field Email is required.';
      return;
    } else if (!emailRegex.test(email)) {
      $scope.regError.emailError = true;
      $scope.regError.message = 'Please enter valid email.';
      return;
    } else if (password1 != password2) {
      $scope.regError.passwordError = true;
      $scope.regError.message = 'Passwords are not identical.';
      return;
    }

    AuthorizationService.register(username, password1, password2, email).success(function(response) {
      $scope.regError = {};  
      $scope.regSuccess.message = 'You have successfully registered. Please activate your account by received email.';
      //$scope.login(username, password1)
    }).error(function (data, status){
      if (status == 403) {
        switch (data) {
          case 'A user with that email already exists.' :
            $scope.regError.emailError = true;
            break;
          case 'The two password fields didn\'t match.' :
            $scope.regError.passwordError = true;
            break;
          case 'A user with that username already exists.' :
            $scope.regError.userError = true;
            break;
        }
        $scope.regError.message = data.replace(/<[^>]+>/gm, '');
          
      } else {
        $scope.regError.message = data.replace(/<[^>]+>/gm, '') || 'Server error occurred';
      }
      
      console.log(data);
    });
  };

  $scope.login = function (username, password) {
    $scope.logError = {};

    if (!username) {
      $scope.logError.userError = true;
      $scope.logError.message = 'Field Username is required.';
      return;
    } else if (!password) {
      $scope.logError.passwordError = true;
      $scope.logError.message = 'Field Password is required.';
      return;
    }
    AuthorizationService.login(username, password).success(function() {
      $window.location.href = 'https://my.cnify.com/';
    }).error(function (data, status) {
      if (status == 403) {
        $scope.logError.message = 'Invalid username or password.';
        $scope.logError.credError = true;
      } else {
        $scope.logError.message = data.replace(/<[^>]+>/gm, '') || 'Server error occurred';
      }
        
      console.log(data);
    });
  };

  $scope.forgotten = function (email) {
    $scope.forgotError = {};
    $scope.forgotSuccess = {};

    if (!email) {
      $scope.forgotError.emailError = true;
      $scope.forgotError.message = 'Field Email is required.';
      return;
    } else if (!emailRegex.test(email)) {
      $scope.forgotError.emailError = true;
      $scope.forgotError.message = 'Please enter valid email.';
      return;
    }
    AuthorizationService.forgotten(email).success(function(response) {
       $scope.forgotSuccess.message = 'Success! Please check your e-mail';
    }).error(function (data){
      if (status == 403) {
        $scope.forgotError.emailError = true;
        $scope.forgotError.message = data;
      } else {
        $scope.forgotError.message = data.replace(/<[^>]+>/gm, '') || 'Server error occurred';
      }
        console.log(data);
      });
  };
  $scope.alertMe = function() {
    setTimeout(function() {
      $window.alert('You\'ve selected the alert tab!');
    });
  };
});

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function (/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");

  // Activates the Carousel
  $('.carousel').carousel({
    interval: 5000
  });

  // Activates Tooltips for Social Links
  $('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
  })
});


