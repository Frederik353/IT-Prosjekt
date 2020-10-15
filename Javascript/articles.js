// note: set hve res er tom displa allarticles



// Category filters language
// liste med alle aktive filtrer
let activelang = [];
// 2d array med klasse for kategori og boolean for om dette er først eller andre gang knappen klikkes
let lang = [
[".remove-filters", false], 
[".python", true],
[".javascript", true], 
[".webdev", true],
[".node", true],
[".java", true],
[".beginner", true], 
[".intermediate", true], 
[".expert", true], 
];
 
 
function sortlang(x){
    var allarticles = document.querySelectorAll(".item");
  // console.log(lang)
  // kategorier som skal vises
  
 
 
  for (var i=0; i < activelang.length; ++i){
    // ser om filteret allered er et aktivt og sletter de for å forsikre at listen kun inneholder et av hver elemnt
    if (lang[x][0] == activelang[i]){
      delete activelang[i];
    }
  }
  // hvis allered trykket på knappen fjerner den filteret
  if (lang[x][1]){
    activelang.push(lang[x][0]);
    lang[x][1] = false;
    for( var i = 0; i < allarticles.length; ++i){
      allarticles[i].style.display = "none";
    }
  }
  else{
    lang[x][1] = true;
    for( var i = 0; i < allarticles.length; ++i){
      allarticles[i].style.display = "block";
    }
  }
  // fjerner tomme plasser i activelang
  activelang = activelang.filter(el => {return el != null && el != '';});
  var display = [];
  


  // for (var i=0; i < activelang.length; ++i){
    var test = activelang.toString();
  // }
  console.log(test)
  var res = test.replace(/^[, ]+|[, ]+$|[, ]+/g, " ").replace(/^[. ]+|[. ]+$|[. ]+/g, " ");
  console.log(res)
  
  
  display.push(document.getElementsByClassName(res));
  console.log(display)
  for (var i = 0; i < display.length; ++i) {
    for (var j = 0; j < display[i].length; ++j) {
      display[i][j].style.display = "block";
    }
  }

  // fikser alt tilbake til standard hvis man trykker fjern filtre
  if (lang[x][0] === ".remove-filters"){
    for( var i = 0; i < allarticles.length; ++i){
      allarticles[i].style.display = "block";
    }
    allarticles[0] = false;
    for( var i = 1; i < lang.length; ++i){
      lang[x][i] = true;
    }
    for (var i = 0; i < activelang.length; ++i) {
      delete activelang[i];
    }
    activelang = activelang.filter(el => {return el != null && el != '';});
    
  }
 
  // console.log(lang[x][0]);
  // console.log(display);
  // console.log(allarticles);
  // console.log(lang[x][1]);
  // console.log(activelang);
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
      // var listItem = $("#list").children("li");
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



