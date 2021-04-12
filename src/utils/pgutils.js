import { Actions } from "jumpstate";
import $ from "jquery";
import {BASE_URL} from "./baseURL";

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

export {
    login,
    register
};