document.addEventListener("DOMContentLoaded", function () {
  let elems = document.querySelectorAll(".sidenav");
  const dropdown = document.querySelectorAll('.dropdown-trigger')
  const preload = document.querySelector('.preloader-background')
  M.Sidenav.init(elems);
  loadNav();
  M.Dropdown.init(dropdown, {
        over: true,
        belowOrigin: true,
        alignment: 'right'
  })
  preload.classList.add('fade-out')

function initCollapsable() {
  const collaps = document.querySelectorAll('.collapsible')
  M.Collapsible.init(collaps)
}

function loadNav() {
  let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        document.querySelector('.topnav').innerHTML = xhttp.responseText
            document.querySelector('.mobilenav').innerHTML = xhttp.responseText

        document.querySelectorAll(".sidenav a, .topnav a")
          .forEach(function (elm) {
            elm.addEventListener("click", function (event) {
              var sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();

              page = event.target.getAttribute("href").substr(1);
              loadPage(page);
            });
          });
      }
    };

    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

  let page = window.location.hash.substr(1);
  loadPage(getPage(page));

  let favoriteType = "";

  function getPage(page) {
    if (page == "" || page == "#") {
      page = "home";
    } else if (page === "liga-inggris") {
      page = "liga-inggris";
    } else if (page === "match") {
      page = "match";
    } else if (page === "fav-team") {
      page = "fav-team";
    }

    return page;
  }

  function loadPage(page) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      let content = document.querySelector("#main-display");

      if (this.readyState == 4) {
        switch (page) {
          case "home":
            getKlasemenSpanyol();
            slider_();
            break;
          case "liga-inggris":
            getKlasemenInggris();
            slider_();
            break;
          case "match":
            getCahmpion();
            slider_();
            break;
          case "fav-team":
            EmptyFavorites(storeNameTeam);
            break;
        }

        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    };

    xhttp.open("GET", "page/" + page + ".html", true);
    xhttp.send();
  }
});
