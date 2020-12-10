'use strict';

(function () {

   var socket = io();
   socket.on('refresh', refresh)
   socket.on('reset', resetPw)
   
   function resetPw(){
      $("#pw").val("")
      $("#pwbutton").css("display", "inline")
   }

   function toPics(id, arr){
      var html = ""
      if (arr == undefined || arr.length == 0){$("#" + id).css("display", "none"); return}
      for (var i = 0; i < arr.length; i++){
         html += '<img src="/public/img/'+ arr[i] +'.PNG" width="40">'
      }
      $("#" + id).css("display", "inline")
      $("#" + id).html(html)
   }
   
   function setPw(){
      var pw = $("#pw").val()
      var href = $(location).attr("href");
      var last = href.substring(href.lastIndexOf('/') + 1)
      console.log(last, pw)
      $.get("/sethand/" + last + "/" + pw, function( data ) {
         console.log(data)
      });
      $("#pwbutton").css("display", "none")
   }
   
   function refresh(){
      var pw = $("#pw").val()
      $.get("/getcards/" + pw, function( data ) {
         console.log(data)
         toPics("owncards", data.owncards)
         toPics("flopspan", data.flop)
         toPics("turnspan", data.turn)
         toPics("riverspan", data.river)
      });
   }
   
   $("#pwbutton").click(setPw)

   $("#refresh").click(refresh)

})();
