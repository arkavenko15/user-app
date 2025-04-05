angular.module('userApp')
  .controller('UserListController', function(UserService) {
    const vm = this;
    vm.users = UserService.getAll();

    vm.userToDelete = null;
    vm.showConfirmModal = false;

    vm.askDelete = function(user) {
      vm.userToDelete = user;
      vm.showConfirmModal = true;
    };

    vm.confirmDelete = function() {
      if (vm.userToDelete) {
        UserService.delete(vm.userToDelete.id);
        vm.users = UserService.getAll();
        vm.userToDelete = null;
        vm.showConfirmModal = false;
      }
    };

    vm.cancelDelete = function() {
      vm.userToDelete = null;
      vm.showConfirmModal = false;
    };
  });
