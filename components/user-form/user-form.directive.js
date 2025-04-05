angular
  .module("userApp")

  .directive("userPasswordValidator", function () {
    return {
      require: "ngModel",
      link: function (scope, elem, attrs, ctrl) {
        ctrl.$validators.pattern = function (value) {
          return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value || "");
        };
      },
    };
  })

  .directive("userForm", function () {
    return {
      restrict: "E",
      scope: false, // <-- important: allow access to parent scope
      controller: "UserFormController",
      controllerAs: "formCtrl",
      bindToController: true,
      templateUrl: "components/user-form/user-form.html",
    };
  })

  .controller("UserFormController", function (UserService, $location, $routeParams, $scope, $rootScope) {
    const vm = this;
    vm.user = {};
    vm.errors = {};

    const id = $routeParams.id;
    if (id && id !== "new") {
      vm.user = angular.copy(UserService.getById(id));
    }

    vm.submit = function () {
      vm.errors = {};
      const response = id && id !== "new" ? UserService.update(vm.user.id, vm.user) : UserService.create(vm.user);

      if (response.error) {
        vm.errors.username = response.error;
      } else {
        $scope.userForm.$setPristine();
        $location.path("/users");
      }
    };

    let pendingUrl = null;

    const confirmIfDirty = function (event, nextUrl) {
      if ($scope.userForm && $scope.userForm.$dirty) {
        event.preventDefault();
        pendingUrl = nextUrl;
        $rootScope.confirmGuard.show = true;

        $rootScope.confirmGuard.proceed = function () {
          $rootScope.confirmGuard.show = false;
          $scope.$applyAsync(() => {
            $scope.userForm.$setPristine();
            $location.path(pendingUrl.split("#!")[1]);
          });
        };

        $rootScope.confirmGuard.cancel = function () {
          $rootScope.confirmGuard.show = false;
          pendingUrl = null;
        };
      }
    };

    const unbind = $scope.$on("$locationChangeStart", confirmIfDirty);
    $scope.$on("$destroy", unbind);
  });
