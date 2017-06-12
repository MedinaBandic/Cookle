var app = angular.module('app', ['ui.router', 'ngCookies', 'star-rating']);
var api = 'http://localhost:3001';

var prod = false;
if (prod) {
    api = 'http://80.65.165.60:3001'
}

app.config(function ($stateProvider, $locationProvider) {
    var main = {
        name: 'main',
        url: '/',
        controller: 'mainCtrl',
        resolve: {
            security: ['$cookies', '$state', function($cookies, $state){
                console.log($cookies.get('username'));
                if ($cookies.get('username') === undefined){
                    $state.transitionTo('login');
                }
            }]
        },
        templateUrl: '../../views/pages/main.html'
    }

    var login = {
        name: 'login',
        url: '/login',
        controller: 'loginCtrl',
        templateUrl: '../../views/pages/login.html'
    }

    var signup = {
        name: 'signup',
        url: '/signup',
        controller: 'signupCtrl',
        templateUrl: '../../views/pages/signup.html'
    }

    var details = {
        name: 'details',
        url: '/details/{guid}',
        controller: 'detailsCtrl',
        resolve: {
            security: ['$cookies', '$state', function($cookies, $state){
                console.log($cookies.get('username'));
                if ($cookies.get('username') === undefined){
                    $state.transitionTo('login');
                }
            }]
        },
        templateUrl: '../../views/pages/details.html'
    }

    var account = {
        name: 'account',
        url: '/account',
        controller: 'accountCtrl',
        resolve: {
            security: ['$cookies', '$state', function($cookies, $state){
                console.log($cookies.get('username'));
                if ($cookies.get('username') === undefined){
                    $state.transitionTo('login');
                }
            }]
        },
        templateUrl: '../../views/pages/account.html'
    }

    $locationProvider.html5Mode(true);

    $stateProvider.state(main);
    $stateProvider.state(login);
    $stateProvider.state(signup);
    $stateProvider.state(details);
    $stateProvider.state(account);
});

app.filter("trustUrl", ['$sce', function ($sce) {
    return function (recordingUrl) {
        return $sce.trustAsResourceUrl(recordingUrl);
    };
}]);

app.controller('mainCtrl', function ($scope, $http, $cookies, $state, $timeout) {

    $scope.addRecipeData = {};
    $scope.categories = ['breakfast', 'lunch', 'dinner','snack', 'dessert', 'barbeque', 'vegetarian']

    // $('#dinner').trigger('click');
    // setTimeout(function () {
    //     console.log("OK here we are")
    //     $('#justClick').trigger('click');
    // }, 100)

    $scope.recipesGet = function () {
        console.log("GET");
        $http({
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + $cookies.get('token'),
            },
            url: api + '/api/v1/recipe'
        }).then(function (res) {
            $scope.recipes = res.data.data;
            $timeout(function () {
                 $('#MixItUp1').mixItUp({
                   selectors: {
                       filter: '.filter',
                       sort: '.sort'
                   }
                });
            }, 500)
        }, function (err) {
            console.log(err);
        });
    }
    $scope.recipesGet();

    $scope.removeRecipeGuid = "";
    $scope.removeRecipe = function (guid) {
        $scope.removeRecipeGuid = guid;
        $('#deleteRecipeModal').modal('show');
    }

    $scope.removeRecipeConfirm = function () {
        $http({
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + $cookies.get('token'),
            },
            url: api + '/api/v1/recipe/' + $scope.removeRecipeGuid
        }).then(function (res) {
            $scope.recipesGet();
            $('#deleteRecipeModal').modal('hide');
        }, function (err) {
            console.log(err);
        });
    }

    $scope.addRecipe = function () {
        $scope.addRecipeData.user = $cookies.get('username');
        $http({
            method: 'POST',
            data: $scope.addRecipeData,
            headers: {
                "Authorization": "Bearer " + $cookies.get('token'),
            },
            url: api + '/api/v1/recipe'
        }).then(function (res) {
            console.log(res);
            $scope.recipesGet();
            $('#addRecipeModal').modal('hide');
        }, function (err) {
            console.log(err);
        });
    }

    $scope.recipeUpdate = function (recipe) {
        $scope.updateRecipeData = recipe;
    }
    $scope.updateRecipe = function (guid) {
        $http({
            method: 'PUT',
            data: $scope.updateRecipeData,
            headers: {
                "Authorization": "Bearer " + $cookies.get('token'),
            },
            url: api + '/api/v1/recipe/' + $scope.updateRecipeData.guid
        }).then(function (res) {
            $scope.recipesGet();
            $('#updateRecipeModal').modal('hide')
        }, function (err) {
            console.log(err);
        });
    }

})

app.controller('detailsCtrl', function ($scope, $stateParams, $http, $cookies) {
    $scope.recipe = {};
    $scope.reviewData = {};

    $http({
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + $cookies.get('token'),
        },
        url: api + '/api/v1/recipe/' + $stateParams.guid
    }).then(function (res) {
        console.log(res);
        $scope.recipe = res.data.data;
    }, function (err) {
        console.log(err);
    });

    $scope.onRatingChange = function($event) {
        $scope.rating = $event.rating;
    }

    $scope.sendReview = function() {
      if ($scope.reviewData.review !== null || $scope.reviewData.user !== null) {
          $http({
              method: 'PUT',
              data: {
                  review: $scope.reviewData.review,
                  user: $scope.reviewData.user,
                  rating: $scope.rating
              },
              headers: {
                  "Authorization": "Bearer " + $cookies.get('token'),
              },
              url: api + '/api/v1/recipe/' + $stateParams.guid + '/review'
          }).then(function (res) {
              $scope.recipe = res.data.data;
              $scope.reviewData = {};
              $scope.rating = 0;
          }, function (err) {
              console.log(err);
          });
      } else {
          $scope.error = {
              status: true,
              message: "Username or Review are not entered"
          }
      }
    }
})

app.controller('loginCtrl', function ($scope, $http, $cookies, $state) {
    $scope.loginData = {};
    $scope.login = function () {
        $http({
            method: 'POST',
            data: $scope.loginData,
            url: api + '/api/v1/login'
        }).then(function (res) {
            if (res.status === 200) {
                console.log(res);
                $cookies.put('username', res.data.data.username);
                $cookies.put('token', res.data.token);
                $state.transitionTo('main');
            }
        }, function (err) {
            console.log(err);
        });
    }
})

app.controller('signupCtrl', function ($scope, $http, $cookies, $state) {
    $scope.signupData = {};
    $scope.signup = function () {
        if($scope.signupData.password === $scope.signupData.passwordRepeat) {
            $http({
                method: 'POST',
                data: $scope.signupData,
                url: api + '/api/v1/signup'
            }).then(function (res) {
                if (res.status === 200) {
                    $cookies.put('username', res.data.data.username);
                    $cookies.put('token', res.data.token);
                    $state.transitionTo('main');
                }
            }, function (err) {
                $scope.error = {
                  status: true,
                  message: "Username already exists"
                };
            });
        } else {
            $scope.error = {
              status: true,
              message: "Passwords does not match"
            };
        }
    }
})

app.controller('accountCtrl', function ($scope, $http, $cookies, $state) {
    $scope.username = $cookies.get('username');
    $scope.accountData = {};
    $scope.changePassword = function () {
        $http({
            method: 'POST',
            data: {
                username: username,
                oldPass: $scope.accountData.oldPass,
                newPass: $scope.accountData.newPass
            },
            headers: {
                "Authorization": "Bearer " + $cookies.get('token'),
            },
            url: api + '/api/v1/user/'
        }).then(function (res) {
            if (res.status === 200) {
                console.log(res)
            }
        }, function (err) {
            console.log(err);
        });
    }
})

app.controller('headerCtrl', function ($scope, $cookies, $state) {
    $scope.username = $cookies.get('username');

    $scope.logout = function () {
        $cookies.remove('username');
        $cookies.remove('token');
        location.reload();
    }
})
