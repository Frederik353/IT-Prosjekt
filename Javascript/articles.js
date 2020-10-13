// Check active classes
var checkClass = function () {
  if ($(".item").hasClass("hide-lang")) {
    $(".item").removeClass("hide-lang");
  }
};



// Category filters language
$(".all").click(function () {
  checkClass();
});
$(".python").click(function () {
  checkClass();
  $(".item:not(.python)").toggleClass("hide-lang");
});
$(".javascript").click(function () {
  checkClass();
  $(".item:not(.javascript)").toggleClass("hide-lang");
});
$(".javascript").click(function () {
  checkClass();
  $(".item:not(.react)").toggleClass("hide-lang");
});
$(".node").click(function () {
  checkClass();
  $(".item:not(.node)").toggleClass("hide-lang");
});
$(".java").click(function () {
  checkClass();
  $(".item:not(.java)").toggleClass("hide-lang");
});
// filter experience
$(".beginner").click(function () {
  checkClass();
  $(".item:not(.beginner)").toggleClass("hide-exp");
});
$(".intermediate").click(function () {
  checkClass();
  $(".item:not(.intermediate)").toggleClass("hide-exp");
});
$(".expert").click(function () {
  checkClass();
  $(".item:not(.expert)").toggleClass("hide-exp");
});



// Active tag
$(".button").click(function () {
  $(".button").removeClass("active");
  $(this).addClass("active");
});

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



