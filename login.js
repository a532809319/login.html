var app = angular.module("myApp", ['ionic']);

app.controller("firstCtr", ['$scope', '$http', '$ionicPopup', '$timeout', '$ionicLoading',
    function firstCtr($scope, $http, $ionicPopup, $timeout, $ionicLoading) {
        $scope.test = {
            phone: "",
            password: "",
            yzm: ""

        }
        var eyeion = true;
        $scope.eyePassword = function () {
            var eye = document.getElementById('eye');
            var inputType = document.getElementById('passwordInput');
            if (eyeion) {
                eye.src = 'img/denglu_eye_open.png';
                eyeion = false
                inputType.type = 'text';

            } else {
                eye.src = 'img/denglu_eye_close.png';
                eyeion = true;
                inputType.type = 'password';
            }
            var eyeBox = document.getElementById('eye-box');

            // eye.src='img/denglu_eye_open.png';
            if (eye.src == 'img/denglu_eye_open.png') {

            }
        }
        var check = true;
        $scope.check = check;
        var oBox = document.getElementById('red-check');
        $scope.img = function () {
            if (check) {
                oBox.src = 'img/denglu_disagree.png';
                check = false

            } else {
                oBox.src = 'img/denglu_agree.png';

                check = true;
                var confirmPopup = $ionicPopup.confirm({
                    title: '是否同意',
                    template: '借款服务。。。。。。。。。。。'
                });
            }
        }
        $scope.doTest = function ($event) {
            if (checkMobile($scope.test.phone)) {
                var a = checkPass($scope.test.password);
                if (a) {
                    checkYzm($scope.test.yzm)
                }
            }

            function checkMobile(str) {
                var
                    re = /^1\d{10}$/
                if (re.test(str)) {
                    return true

                } else {
                    $scope.phoneis = "不正确"
                    var confirmPopup = $ionicPopup.confirm({
                        title: '手机号输入情况',
                        template: '您输入的手机号码格式不正确'
                    });


                    return false;


                }
            }


            function checkPass(str) {
                var exp1 = /^[A-Za-z0-9]{6,40}$/;
                var exp2 = /^[0-9]{6,40}$/
                var exp3 = /^[a-zA-Z]{6,40}$/;

                if (exp2.test(str)) {
                    var confirmPopup = $ionicPopup.confirm({
                        title: '密码输入情况',
                        template: '您输入的密码格式不正确（不能只含有数字）'
                    });
                    return false;
                }
                if (exp3.test(str)) {
                    var confirmPopup = $ionicPopup.confirm({
                        title: '密码输入情况',
                        template: '您输入的密码格式不正确（不能只含有字母）'
                    });
                    return false;
                }
                if (!exp1.test(str)) {
                    var confirmPopup = $ionicPopup.confirm({
                        title: '密码输入情况',
                        template: '您输入的密码格式不正确（不能含有数字和字母以外的字符）'
                    });
                    return false;
                }

                return true;
            }


            function checkYzm(str) {
                var
                    re = /^\d{1,30}$/;
                if (re.test(str)) {

                    return true;


                } else {
                    $scope.yzmisis = "不正确"
                    var confirmPopup = $ionicPopup.confirm({
                        title: '验证码输入情况',
                        template: '您输入的验证码' + $scope.yzmisis
                    });
                    return false
                }
            }
        }
        $scope.popclose = function () {

        }


        $scope.doRequst
            = function () {

            $ionicLoading.show({
                template: 'Loading...',
                duration: 3000
            }).then(function () {
                console.log("The loading indicator is now displayed");
            });

            $timeout(function () {
                $http({
                    method: 'GET',
                    url: './a.json'
                }).then(function successCallback(response) {
                    console.log(response.data.a)
                    $scope.s = response.data.a;
                    var oInput = document.getElementById('a');
                    oInput.value = $scope.s;
                    $ionicLoading.hide().then(function () {
                        console.log("The loading indicator is now hidden");
                    });

                }, function errorCallback(response) {

                });
            }, 5000)
        }
    }
]);
