app = angular.module("demoapp", []);

app.controller("authtrl",  function ($scope, $http){

    $("#submitbtn").html("Login");
    $scope.showsignup = false;
    $scope.showlogin = true;
    $scope.showCpassword = false;

    $scope.loginpage = function (){
        $scope.showlogin =  $scope.showlogin ? false : true;
        $scope.showsignup = false;
        $("#submitbtn").html("Login");
        $scope.signupform.$setPristine();
        $scope.username = null;
        $scope.password = null;
        $scope.cpassword = null;
        $scope.showCpassword = false;
    };
    $scope.signuppage = function (){
        $scope.showsignup =  $scope.showsignup ? false : true;
        $scope.showlogin = false;
        $("#submitbtn").html("Sign Up");
        $scope.signupform.$setPristine();
        $scope.username = null;
        $scope.password = null;
        $scope.showCpassword = true;
    };

    $scope.login = function (){
        $http.post(
            "http://127.0.0.1:8000/api/login/", {
                "username":$scope.username,
                "password":$scope.password
            }
        ).then(function (data){
            localStorage.setItem('token', data.data.access)
            localStorage.setItem('refresh', data.data.refresh)
            location="event"
        }).catch(function (error){
            alert(error.data.detail)
        })
    };

    $scope.registration = function (){
        $http.post(
            "http://127.0.0.1:8000/api/registration/", {
                "username":$scope.username,
                "password":$scope.password
            }
        ).then(function (data){
            $scope.loginpage()
            alert(data.data.detail)
        }).catch(function (error){
            alert(error.data.detail)
        })
    };

    $scope.logout = function (){
        localStorage.removeItem('token')
        localStorage.removeItem('refresh')
    };


})


app.controller("eventctrl",  function ($scope, $http){


    $scope.showEventList = true;
    $scope.showEventCreateUpdate = false;

    $scope.eventCreatePage = function (){
        $scope.showEventCreateUpdate =  true;
        $scope.showEventList = false;
    };
    $scope.eventListPage = function (){
        $scope.showEventList =  true;
        $scope.showEventCreateUpdate = false;
    };



    $scope.createEvent = function (){
        $http.post(
            "http://127.0.0.1:8000/api/events/",{
                "headers":{
                    "Authorization": 'Bearer ' + localStorage.getItem('token'),
                },
                "name":$scope.eventName,
                "location":$scope.location,
                "date":$scope.date,
            }

        ).then(function (data){
            console.log(data.data)
        }).catch(function (error){
            if (error.status==401){
                return;
            }
            alert(error.data.detail)
        })
    };

    $scope.getEvent = function (){
        $http.get(
            "http://127.0.0.1:8000/api/events/2",{
                "headers":{
                    "Authorization": 'Bearer ' + localStorage.getItem('token'),
                }
            }

        ).then(function (data){
            console.log(data.data)
        }).catch(function (error){
            if (error.status==401){
                $scope.loginpage()
            }
            alert(error.data.detail)
        })
    };

    $scope.deleteEvent = function (){
        $http.delete(
            "http://127.0.0.1:8000/api/events/2",{
                "headers":{
                    "Authorization": 'Bearer ' + localStorage.getItem('token'),
                }
            }

        ).then(function (data){
            console.log(data.data)
        }).catch(function (error){
            if (error.status==401){
                $scope.loginpage()
            }
            alert(error.data.detail)
        })
    };

    $scope.updateEvent = function (){
        $http.put(
            "http://127.0.0.1:8000/api/events/3",{
                "headers":{
                    "Authorization": 'Bearer ' + localStorage.getItem('token'),
                },
                "name":$scope.name,
                "location":$scope.location,
                "date":$scope.date,
            }

        ).then(function (data){
            console.log(data.data)
        }).catch(function (error){
            if (error.status==401){
                $scope.loginpage()
            }
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
                $scope.loginpage()
            }
            alert(error.data.detail)
        })
    };
})