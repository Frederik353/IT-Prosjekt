// note: få søke funksjon til å kjøre etter sortlang


// Category filters language
// liste med alle aktive filtrer
let activelang = [];
// 2d array med klasse for kategori og boolean for om dette er først eller andre gang knappen klikkes
let lang = [
[".remove-filters", false], 
[".python", true],
[".javascript", true], 
[".front-end", true],
[".back-end", true],
[".java", true],
[".beginner", true], 
[".intermediate", true], 
[".expert", true], 
];

let res = "";

function sortlang(x){
  var allarticles = document.querySelectorAll(".item");
  var buttons = document.getElementsByClassName("category-button");
  // legger til stil på knappene
  if(x > 0){
    if(buttons[x - 1].classList.contains("active")){
    buttons[x - 1].classList.remove("active");
    }else{
    buttons[x - 1].classList.add("active");
    }
  }
  
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
  }
  // fjerner tomme plasser i activelang
  activelang = activelang.filter(el => {return el != null && el != '';});
  
  var test = activelang.toString();
  
  res = test.replace(/^[, ]+|[, ]+$|[, ]+/g, " ").replace(/^[. ]+|[. ]+$|[. ]+/g, " ");
  console.log(searchlist)

  var display = [];
  // if(res.length > 0){
  //   for(var i = 0; i < searchlist.length; ++i){
  //   if(searchlist[i].matches(res)){
  //       display.push(searchlist[i]);
  //       console.log("daskjhjdakj")
  //     }
  //   }
  // }
  

  display.push(document.getElementsByClassName(res));
  
  // viser alt i display
  for (var i = 0; i < display.length; ++i) {
    for (var j = 0; j < display[i].length; ++j) {
      display[i][j].style.display = "block";
    }
  }

  // hvis ingen filter vis alle
  if(res.length == 0) {
    for( var i = 0; i < allarticles.length; ++i){
      allarticles[i].style.display = "block";
    }
  console.log("res empty")
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
    

    for(var i = 0; i < buttons.length; i++){
      if(buttons[i].classList.contains("active")){
        buttons[i].classList.remove("active");
      }
    }
  }



  // document.getElementById('search-bar').value = "search";
}





// $(".category-button").click(function() {
//   if($(this).hasClass("active")){
//     $(this).removeClass("active");
//   }
//   else{ 
//     $(this).addClass("active");
//   }
// });




// search bar
let all = [];
let searchlist = [];
window.addEventListener("load", function(){
  document.getElementById("search-bar").addEventListener("keyup", function(){
    var search = this.value.toLowerCase();

    if(res.length == 0) {
      all = document.querySelectorAll(".item");
    }else{
      all = document.getElementsByClassName(res);
    }

    // looper gjenom listen og viser bare elementer som matcher søkeordet
    searchlist = [];
    for (let i of all) {
      let item = i.innerHTML.toLowerCase();
      if (item.indexOf(search) == -1) {
        i.style.display = "none";
      } else {
        i.style.display = "block";
        searchlist.push(i);
      }
    }
    // console.log(searchlist);
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
});


function list() {
  var list = document.querySelectorAll(".card");
  // console.log(list);
  for (var i=0; i < list.length; ++i) {
    list[i].classList.add("list-style");
    list[i].classList.remove("card");
  }
}

function grid() {
  var list = document.querySelectorAll(".list-style"); 
  // console.log(list);
  for (var i=0; i < list.length; ++i) {
    list[i].classList.add("card");
    list[i].classList.remove("list-style");
  }
}



