(function (shawi, angular) {
    'use strict';

    angular.module('app.controllers')
        .controller('MessagesController', ['$scope', 'AccountService',
            function ($scope, accountService) {

                $scope.currentThread;
                $scope.threads = [];

                // pass credentials accross signalr
                var user = accountService.getUserInfo();
                $.connection.hub.qs = { "access_token": user.accessToken };

                var hub = $.connection.messageHub;

                hub.client.onGetAllThreads = function (threads) {
                    $scope.$apply(function () {
                        $scope.threads = threads;
                    });
                };

                hub.client.onGetMessagesForThread = function (messages) {
                    $scope.$apply(function () {
                        $scope.currentThread.Messages = messages;
                    });
                };

                hub.client.onSendMessage = function (msg) {
                    $scope.$apply(function () {
                        $scope.currentThread.Messages.push(msg);
                    });
                };

                $.connection.hub.start().done(function () {
                    hub.server.getAllThreads();
                });

                $scope.selectThread = function (thread) {

                    $scope.currentThread = thread;

                    hub.server.getMessagesForThread(thread.Id);

                };

                $scope.sendMessage = function (message) {

                    if (!message) return;

                    var threadId = $scope.currentThread.Id;

                    hub.server.sendMessage(threadId, message);

                    $scope.message = '';

                }

            }
        ]);

}(shawi, angular));