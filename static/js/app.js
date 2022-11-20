app = angular.module("demoapp",  ['ui.bootstrap']);

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
            return
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
            return
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
    $scope.pageIndex = 1;
    $scope.numberOfEvenentPerPage = $scope.numberOfEvenentPerPage != undefined ? $scope.numberOfEvenentPerPage:5
    getEventList()

    $scope.eventCreatePage = function (){
        $scope.eventName = null;
        $scope.location = null;
        $scope.date = null;
        $scope.eventCreateOrUpdate = "Create";
        $scope.showCreateEventBtn = true;
        $scope.showUpdateEventBtn = false;
        $scope.showEventCreateUpdate =  true;
        $scope.showEventList = false;

    };

    $scope.eventListPage = function (){
        $scope.showEventList =  true;
        $scope.showEventCreateUpdate = false;
    };

    $scope.getEventlistByPageSize = function (){
        $scope.pageIndex = 1;
        getEventList()
    }

    $scope.createEvent = function (){
        $http.post(
            "http://127.0.0.1:8000/api/events/",
            {
                "name":$scope.eventName,
                "location":$scope.location,
                "date":$scope.date,
            },
            {
                "headers": {
                    "Authorization": 'Bearer ' + localStorage.getItem('token'),
                },
            }

        ).then(function (data){
            $scope.eventListPage()
            alert(data.data.massage)
        }).catch(function (error){
            // if (error.status==401){
            //
            // }
            alert(error.data.detail)
        })
    };

    $scope.getEvent = function (){
        $http.get(
            "http://127.0.0.1:8000/api/events/2",
            {
                "headers": {
                    "Authorization": 'Bearer ' + localStorage.getItem('token'),
                },
            }

        ).then(function (data){
            console.log(data.data)
        }).catch(function (error){
            // if (error.status==401){
            //
            // }
            alert(error.data.detail)
        })
    };

    $scope.deleteEvent = function (event){
        $http.delete(
            `http://127.0.0.1:8000/api/events/${event.target.id}`,
            {
                "headers": {
                    "Authorization": 'Bearer ' + localStorage.getItem('token'),
                },
            }

        ).then(function (data){
            location.reload();
        }).catch(function (error) {
            // if (error.status==401){
            //
            // }
            alert(error.data.detail)
        })
    };

    $scope.showUpdateEvent = function (index){
        $scope.eventCreatePage()
        $scope.eventName = $scope.events[index].name;
        $scope.location = $scope.events[index].location;
        $scope.date = new Date(Date.parse($scope.events[index].date));
        $scope.eventId = $scope.events[index].id;
        $scope.eventIndex = index;
        $scope.eventCreateOrUpdate = "Update";
        $scope.showCreateEventBtn = false;
        $scope.showUpdateEventBtn = true;
    }

    $scope.updateEvent =  function (){
            $http.put(
                `http://127.0.0.1:8000/api/events/${$scope.eventId}`,
                {
                    "name":$scope.eventName,
                    "location":$scope.location,
                    "date":$scope.date,
                },
                {
                    "headers": {
                        "Authorization": 'Bearer ' + localStorage.getItem('token'),
                    },
                }

            ).then(function (data){
                $scope.eventListPage()
                alert(data.data.massage)
            }).catch(function (error){
                // if (error.status==401){
                //
                // }
                alert(error.data.detail)
            })
        };

    $scope.getEventlistByPageIndex = function (){
        getEventList()
    }

    function getEventList(){

        $http.get(
            `http://127.0.0.1:8000/api/events?number=${$scope.pageIndex}&size=${$scope.numberOfEvenentPerPage}`,
            {
                "headers": {
                    "Authorization": 'Bearer ' + localStorage.getItem('token'),
                },
            }
        ).then(function (data){
            $scope.events = data.data.results
            $scope.totalEventCount = data.data.count;
            $scope.showingEventsFrom = ($scope.pageIndex-1) * $scope.numberOfEvenentPerPage;
            $scope.showingEventsTo = $scope.showingEventsFrom + data.data.results.length;


        }).catch(function (error){
            // if (error.status==401){
            //
            // }
            alert(error.data.detail)
        })
    };

  });



