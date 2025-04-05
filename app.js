angular
  .module("userApp", ["ngRoute"])

  .config(function ($routeProvider) {
    $routeProvider
      .when("/", { redirectTo: "/users" })
      .when("/users", {
        templateUrl: "components/user-list/user-list.html",
        controller: "UserListController",
        controllerAs: "listCtrl",
      })
      .when("/users/:id", {
        templateUrl: "components/user-view/user-view.html",
        controller: "UserViewController",
      })
      .when("/403", { templateUrl: "pages/403.html" })
      .when("/404", { templateUrl: "pages/404.html" })
      .otherwise({ redirectTo: "/404" });
  })

  // Global modal control for unsaved changes guard
  .run(function ($rootScope, $location) {
    $rootScope.confirmGuard = {
      show: false,
      proceed: null,
      cancel: null,
    };
  });
