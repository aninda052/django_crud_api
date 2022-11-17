app = angular.module("demoapp", []);

app.controller("democtrl",  function ($scope, $http){

    $scope.login = function (){
        $http.post(
            "http://127.0.0.1:8000/api/login/", {
                "username":$scope.username,
                "password":$scope.password
            }
        ).then(function (data){
            localStorage.setItem('token', data.data.access)
            localStorage.setItem('refresh', data.data.refresh)
        }).catch(function (error){
            alert(error.data.detail)
        })
    };
    $scope.eventlist = function (){
        $http.get(
            "http://127.0.0.1:8000/api/events?number=1&size=2",{
                "headers":{
                    "Authorization": 'Bearer ' + localStorage.getItem('token'),
                }
            }

        ).then(function (data){
            console.log(data.data)
        }).catch(function (error){
            if (error.status==401){

            }
            alert(error.data.detail)
        })
    }
})