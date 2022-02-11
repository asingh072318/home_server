import { Actions } from "jumpstate";
import $ from "jquery";
import {BASE_URL} from "./baseURL";
import { func } from "prop-types";

function login(payload){
    var settings = {
        url: BASE_URL + "Login_API/login",
        type: "POST",
        headers: {
          "content-type": "application/json",
          "accept": "application/json, text/javascript, */*; q=0.01",
        },
        data: JSON.stringify(payload),
        success: function(response) {
          response['username'] = payload['username'];
          console.log(response);
          Actions.TodoStateV1.setcurrentUserToken(response);
        },
        error: function(response){
          console.log("error response is ", response);
        }
    };
    $.ajax(settings);
}

function getfiles(token){
  var settings = {
      url: BASE_URL + "Uploads_API/upload_file",
      type: "GET",
      headers: {
        "content-type": "application/json",
        "accept": "application/json, text/javascript, */*; q=0.01",
        "jwt-token": token,
      },
      success: function(response) {
        console.log('response is ', response)
        if(response.length !== 0){
          console.log("Got files",response);
          Actions.TodoStateV1.setcurrentUserFiles(response);
        }
        else{
          Actions.TodoStateV1.setcurrentUserFiles([]);
        }
      },
      error: function(response){
        console.log("error response is ", response);
      }
  };
  $.ajax(settings);
}

function register(payload){
  var settings = {
      url: BASE_URL + "Admin_API/user",
      type: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json, text/javascript, */*; q=0.01",
      },
      data: JSON.stringify(payload),
      success: function(response) {
        console.log(response);
        Actions.TodoStateV1.setcurrentUserResponse(response);
      },
      error: function(response){
        console.log("error response is ", response);
      }
  };
  $.ajax(settings);
}

function saveFiles(token,payload){
  var form = new FormData();
  form.append("file", payload[0]);
  var settings = {
    url: BASE_URL + "Uploads_API/upload_file",
    type: "POST",
    contentType: false, processData: false,
    headers: {
      "enctype": "multipart/form-data",
      "accept": "application/json, text/javascript, */*; q=0.01",
      "jwt-token": token,
    },
    data:form,
    success: function(response) {
      console.log(response);
      Actions.TodoStateV1.setcurrentUserResponse(response);
    },
    error: function(response){
      console.log("error response is ", response);
    }
};
console.log(settings)
$.ajax(settings);
}

export {
    login,
    register,
    getfiles,
    saveFiles
};