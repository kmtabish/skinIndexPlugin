(function (angular, buildfire) {
  'use strict';
  if (!buildfire) {
    throw ("buildfire not found");
  }
  angular
    .module('skinIndexModals', ['ui.bootstrap'])
    .factory('Modals', ['$modal', '$q', function ($modal, $q) {
      var showMoreOptionModal;
      return {
        showMoreOptionsModal: function (info, callback) {
          var moreOptionsPopupDeferred = $q.defer();
          showMoreOptionModal = $modal
            .open({
              templateUrl: 'templates/modals/more-options-modal.html',
              controller: 'MoreOptionsModalPopupCtrl',
              controllerAs: 'MoreOptionsPopup',
              size: 'sm',
              resolve: {
                Info: function () {
                  return info;
                }
              }
            });
          showMoreOptionModal.result.then(function () {
            moreOptionsPopupDeferred.resolve();
          }, function (err) {
            //do something on cancel
            moreOptionsPopupDeferred.reject(err);
          });
          return moreOptionsPopupDeferred.promise;
        },
        dismiss: function() {
          if(showMoreOptionModal) {
            showMoreOptionModal.dismiss();
          }
        },
        close: function(result) {
          if(showMoreOptionModal) {
            showMoreOptionModal.close(result);
          }
        }
      };
    }])
    .controller('MoreOptionsModalPopupCtrl', ['$scope', '$modalInstance', '$rootScope', 'Buildfire', function ($scope, $modalInstance, $rootScope, Buildfire) {
      console.log('MoreOptionsModalPopup Controller called-----');
      var MoreOptionsPopup = this;

      $scope.ok = function (option) {
        $modalInstance.close(option);
      };
      $scope.cancel = function () {
        $modalInstance.dismiss('no');
      };

    }])
})(window.angular, window.buildfire);
