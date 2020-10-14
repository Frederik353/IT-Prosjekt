

// Category filters language
function sortlang(x){

  let lang = [ "remove-filters","python","javascript", "webdev","node", "java" ]
  console.log(lang[x]);
  var list = document.querySelectorAll(".item"); 
  var buttons = document.querySelectorAll(".button-lang" );
  console.log(buttons);
  
  for (var i=1; i < list.length; ++i) {
    

    if (lang[x] === "remove-filters"){
      for (var u=1; u < buttons.length; ++u) {
        buttons[u].classList.remove("active");
      }
      list[i].classList.remove("active");
      list[i].classList.remove("hide-lang");
    }

    else if(list[i].classList.contains(lang[x]) && !(list[i].classList.contains("active"))) {
      list[i].classList.remove("hide-lang");
      list[i].classList.add("active");
      console.log("kjdfbnskf");
    }
    
    else if(list[i].classList.contains(lang[x]) && (list[i].classList.contains("active"))){
      list[i].classList.add("hide-lang");
      list[i].classList.remove("active");
    }

  }
}



$(".button-lang").click(function() {
  if($(this).hasClass("active")){
    $(this).removeClass("active");
  }
  else{ 
    // $(".button-lang").removeClass("active");
    $(this).addClass("active");
  }
});


$(".button-exp").click(function() {
  
  
  if($(this).hasClass("active")){
    $(this).removeClass("active");
  }
  else{ 
    // $(".button-exp").removeClass("active");
    $(this).addClass("active");
  }
});



// search bar

$(document).ready(function (event) {
  $("#search-bar").keyup(function (event) {
    var searchTerm = $("#search-bar").val();
    sessionStorage.setItem("searchTerm", searchTerm);

    if (event.keyCode === 13) {
      // window.location.pathname = "../articles.html";
      var searchTerm = sessionStorage.getItem("searchTerm");
      var listItem = $("#list").children("li");
      var searchSplit = searchTerm.replace(/ /g, "'):containsi('");

      //extends :contains to be case insensitive
      $.extend($.expr[":"], {
        containsi: function (elem, i, match, array) {
          return (
            (elem.textContent || elem.innerText || "")
              .toLowerCase()
              .indexOf((match[3] || "").toLowerCase()) >= 0
          );
        },
      });

      $("#list li")
        .not(":containsi('" + searchSplit + "')")
        .each(function (e) {
          $(this).addClass("hiding out").removeClass("in");
          setTimeout(function () {
            $(".out").addClass("hide-search");
          }, 300);
        });

      $("#list li:containsi('" + searchSplit + "')").each(function (e) {
        $(this).removeClass("hide-search out").addClass("in");
        setTimeout(function () {
          $(".in").removeClass("hiding");
        }, 1);
      });
    }
  });
});

// sorter etter dato
(function ($) {
  $.sortByDate = function (elements, order) {
    var arr = [];
    elements.each(function () {
      var obj = {},
        $el = $(this),
        time = $el.find("time").text(),
        date = new Date($.trim(time)),
        timestamp = date.getTime();

      obj.html = $el[0].outerHTML;
      obj.time = timestamp;

      arr.push(obj);
    });

    var sorted = arr.sort(function (a, b) {
      if (order == "ASC") {
        return a.time > b.time;
      } else {
        return b.time > a.time;
      }
    });

    return sorted;
  };

  $(function () {
    var $newer = $("#newer"),
      $older = $("#older"),
      $content = $("#list"),
      $elements = $(".item");

    $newer.click(function () {
      var elements = $.sortByDate($elements, "DESC");
      var html = "";
      for (var i = 0; i < elements.length; ++i) {
        html += elements[i].html;
      }
      $content[0].innerHTML = html;
      $(this).addClass("selected").siblings().removeClass("selected");
      return false;
    });

    $older.click(function () {
      var elements = $.sortByDate($elements, "ASC");
      var html = "";
      for (var i = 0; i < elements.length; ++i) {
        html += elements[i].html;
      }
      $content[0].innerHTML = html;
      $(this).addClass("selected").siblings().removeClass("selected");
      return false;
    });
  });
})(jQuery);


function list() {
  var list = document.querySelectorAll(".card");
  console.log(list);
  for (var i=0; i < list.length; ++i) {
    list[i].classList.add("list-style");
    list[i].classList.remove("card");
  }
}

function grid() {
  var list = document.querySelectorAll(".list-style"); 
  console.log(list);
  for (var i=0; i < list.length; ++i) {
    list[i].classList.add("card");
    list[i].classList.remove("list-style");
  }
}



