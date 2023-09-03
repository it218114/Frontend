//This file is one -> it have all backend API calls
import axios from "axios";
const BACKEND_APP_URL = "http://localhost:8080/api";


export const loginUser = (username,password) => {
    return fetch(BACKEND_APP_URL+"/auth/signin", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              "email":username,
              "password":password
              })
          });
}

export const getAllUsers = () => {
  return fetch(BACKEND_APP_URL+"/users_with_status", {
          method: "GET",
          headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
        })
        .catch(error=>{
            console.log("Error while getAllMovies");
        })
}

export const logoutUser = (userId) => {
  console.log("logoutUser called"+userId);
  return fetch(BACKEND_APP_URL+"/auth/signout/"+userId, {
          method: "POST",
          headers: {'Content-Type': 'application/json'}
        });
}

export const registerUser = (fname, lname, email,password, phone, role) => {
  console.log("register user called"+JSON.stringify({
                  "firstName":fname,
                  "lastName":lname,
                  "password":password,
                  "email":email,
                  "role":role,
                  }));
    return fetch(BACKEND_APP_URL+"/auth/signup", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                  "firstName":fname,
                  "lastName":lname,
                  "password":password,
                  "phone":phone,
                  "email":email,
                  "role":role,
              })
          });
}
export const getUser = (email) => {
  return fetch(BACKEND_APP_URL+"/user/"+email, {
          method: "GET",
          headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
        });
}
export const editUsers = (fname, lname, email, password, role) => {
  console.log("register user called"+JSON.stringify({
                  "firstName":fname,
                  "lastName":lname,
                  "password":password,
                  "email":email,
                  "role":role,
                }));
  return fetch(BACKEND_APP_URL+"/user/"+localStorage.getItem("userId"), {
          method: "PUT",
          headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
          body: JSON.stringify({
            "firstName":fname,
            "lastName":lname,
            "password":password,
            "email":email,
            "role":role,
            })
        });
}

export const getAllPendingApplications = () => {
    return fetch(BACKEND_APP_URL+"/application/pending/"+localStorage.getItem('userId'), {
            method: "GET",
            headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
          })
          .catch(error=>{
              console.log("Error while getAllPendingApplications");
          })
}

export const getAllNonPendingApplications = () => {
  return fetch(BACKEND_APP_URL+"/application/non-pending/"+localStorage.getItem('userId'), {
          method: "GET",
          headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
        })
        .catch(error=>{
            console.log("Error while getAllNonPendingApplications");
        })
}

export const getApplicationsById = (appId) => {
  return fetch(BACKEND_APP_URL+"/application/"+appId, {
          method: "GET",
          headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
        })
        .catch(error=>{
            console.log("Error while getApplicationsById");
        })
}

export const getAllApplications = () => {
  return fetch(BACKEND_APP_URL+"/application", {
          method: "GET",
          headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
        })
        .catch(error=>{
            console.log("Error while getAllApplications");
        })
}

export const addApplication= (firstName, lastName, email, phone, street, doc, university) => {
  const formData = new FormData();
  if(doc){
    formData.append('grade',doc);
  }
  
      formData.append('data',JSON.stringify({
        "userId": localStorage.getItem('userId'),
        "firstName":firstName,
        "lastName":lastName,
        "email":email,
        "phone": phone,
        "street": street,
        "university": university
        }))
  console.log("addCategory called" + JSON.stringify({
    
  }));
  return axios({
    url: BACKEND_APP_URL + "/application",
    method: "POST",
    headers: { 'Content-Type': 'application/json', 'token': '' + localStorage.getItem('token') },
    data: formData
  });
}


export const approveApplication= (appId,doc) => {
  const formData = new FormData();
  if(doc){
    formData.append('grade',doc);
  }
  
      formData.append('data',JSON.stringify({
        "userId": localStorage.getItem('userId'),
        "appId":appId
        }))
  console.log("addCategory called" + JSON.stringify({
    
  }));
  return axios({
    url: BACKEND_APP_URL + "/application/approve",
    method: "POST",
    headers: { 'Content-Type': 'application/json', 'token': '' + localStorage.getItem('token') },
    data: formData
  });
}


export const declineApplication= (appId) => {
  return fetch( BACKEND_APP_URL + "/application/decline", {
          method: "POST",
          headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
          body: JSON.stringify({
            "appId":appId,
            "userId":localStorage.getItem("userId")
            })
        });
}


export const addMovie = (movieName, movieDesc, movieCast, movieGender,movieDuration,moviePoster) => {

   return fetch(BACKEND_APP_URL+"/movies", {
        method: "POST",
        headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
        body: JSON.stringify({
                          "title":movieName,
                          "desc":movieDesc,
                          "cast":movieCast,
                          "genre":movieGender,
                          "duration":movieDuration,
                          "poster":moviePoster,
                          "adminId":localStorage.getItem("userId")
                      })
        });
 }

 
export const deleteMovies = (id) => {
  return fetch(BACKEND_APP_URL+"/movies/"+id+"/"+localStorage.getItem("userId"), {
    method: "DELETE",
    headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
  });
}

export const editMovie = (movieId, movieName, movieDesc, movieCast, movieGender,movieDuration,moviePoster) => {
  console.log("editHospitals called"+JSON.stringify({
    "title":movieName,
    "desc":movieDesc,
    "cast":movieCast,
    "genre":movieGender,
    "duration":movieDuration,
    "poster":moviePoster,
    "adminId":localStorage.getItem("userId")
}));
    return fetch(BACKEND_APP_URL+"/movies/"+movieId, {
            method: "PUT",
            headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
            body: JSON.stringify({
              "title":movieName,
              "desc":movieDesc,
              "cast":movieCast,
              "genre":movieGender,
              "duration":movieDuration,
              "poster":moviePoster,
              "adminId":localStorage.getItem("userId")
          })
          });
}


 export const getMovieById = (movieId) => {
  return fetch(BACKEND_APP_URL+"/movies/"+movieId, {
          method: "GET",
          headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
        })
        .catch(error=>{
            console.log("Error while getAllUsers");
        })
}

export const bookMovie = (selectedSeat, theaterId, showId, movieId) => {
  return fetch(BACKEND_APP_URL+"/bookings", {
          method: "POST",
          headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
          body: JSON.stringify({
            "theaterId":theaterId,
            "movieId":movieId,
            "showId":showId,
            "userId":localStorage.getItem("userId"),
            "seats":selectedSeat
        })
        })
        .catch(error=>{
            console.log("Error while getAllUsers");
        })
}

export const getViewMovies = (movieId) => {
  return fetch(BACKEND_APP_URL+"/moviesbook/"+movieId, {
          method: "GET",
          headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
        })
        .catch(error=>{
            console.log("Error while getAllUsers");
        })
}

export const getBookingByUser= () => {
  return fetch(BACKEND_APP_URL+"/bookings/"+localStorage.getItem("userId"), {
          method: "GET",
          headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
        })
        .catch(error=>{
            console.log("Error while getBookingByUser");
        })
}


export const getAllTheaters = (name) => {
  return fetch(BACKEND_APP_URL+"/theaters?search="+name, {
          method: "GET",
          headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
        })
        .catch(error=>{
            console.log("Error while getAllTheaters");
        })
}

export const addTheater = (theaterName, noOfRows, noOfSeats, street,city,state) => {

 return fetch(BACKEND_APP_URL+"/theaters", {
      method: "POST",
      headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
      body: JSON.stringify({
                        "name":theaterName,
                        "noOfRows":noOfRows,
                        "noOfSeats":noOfSeats,
                        "street":street,
                        "city":city,
                        "state":state,
                        "adminId":localStorage.getItem("userId")
                    })
      });
}

export const addShowsToTheater = (selectDate, theaterId, movieId) => {

  return fetch(BACKEND_APP_URL+"/shows", {
       method: "POST",
       headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
       body: JSON.stringify({
                         "date":selectDate,
                         "theaterId":theaterId,
                         "movieId":movieId,
                         "adminId":localStorage.getItem("userId")
                     })
       });
 }

 export const saveModerators = (name, email, password) => {

  return fetch(BACKEND_APP_URL+"/moderator", {
       method: "POST",
       headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
       body: JSON.stringify({
                         "username":name,
                         "email":email,
                         "password":password,
                         "adminId":localStorage.getItem("userId")
                     })
       });
 }


 export const deleteTheaters = (id) => {
  return fetch(BACKEND_APP_URL+"/theaters/"+id+"/"+localStorage.getItem("userId"), {
    method: "DELETE",
    headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
  });
  }

export const deleteshows = (id, theaterId) => {
return fetch(BACKEND_APP_URL+"/shows/"+localStorage.getItem("userId")+"/"+theaterId+"/"+id, {
  method: "DELETE",
  headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
});
}

export const deleteModerators = (id) => {
  return fetch(BACKEND_APP_URL+"/moderator/"+localStorage.getItem("userId")+"/"+id, {
    method: "DELETE",
    headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
  });
  }

export const editTheater = (theaterId, theaterName, noOfRows, noOfSeats, street,city,state) => {
console.log("editHospitals called"+JSON.stringify({
                       "name":theaterName,
                        "noOfRows":noOfRows,
                        "noOfSeats":noOfSeats,
                        "street":street,
                        "city":city,
                        "state":state,
                        "adminId":localStorage.getItem("userId")
}));
  return fetch(BACKEND_APP_URL+"/theaters/"+theaterId, {
          method: "PUT",
          headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
          body: JSON.stringify({
            "name":theaterName,
            "noOfRows":noOfRows,
            "noOfSeats":noOfSeats,
            "street":street,
            "city":city,
            "state":state,
            "adminId":localStorage.getItem("userId")
        })
        });
}


export const getTheaterById = (theaterId) => {
return fetch(BACKEND_APP_URL+"/theaters/"+theaterId, {
        method: "GET",
        headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
      })
      .catch(error=>{
          console.log("Error while getAllUsers");
      })
}

export const getAllModerators = () => {
  return fetch(BACKEND_APP_URL+"/moderators", {
          method: "GET",
          headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
        })
        .catch(error=>{
            console.log("Error while getAllUsers");
        })
  }