function getKlasemenSPY(data) {
  let tableKlasemen = "";

  data.standings.forEach(function (standing) {
    let tableDataKlasemen = "";

    standing.table.forEach(function (tim) {
      tim = JSON.parse(
        JSON.stringify(tim).replace(/^http:\/\//i, "https://")
      );

      tableDataKlasemen += `<tr>
                <td>${tim.position}</td>
                    <td>
                        <a href="../page/detail-team.html?id=${tim.team.id}" class="link-to-team valign-wrapper">
                        <img src="${tim.team.crestUrl.replace(/^http:\/\//i, 'https://')}" class="responsive-img cres" alt=""> 
                            ${tim.team.name}
                        </a>
                    </td>
                    <td>
                        ${tim.playedGames}
                    </td>
                    <td>
                        ${tim.won}
                    </td>
                    <td>
                        ${tim.draw}
                    </td>
                    <td>
                        ${tim.lost}
                    </td>
                    <td>
                        ${tim.goalsFor}
                    </td>
                    <td>
                        ${tim.goalsAgainst}
                    </td>
                    <td>
                        ${tim.goalDifference}
                    </td>
                    <td>
                        ${tim.points}
                    </td>
                </tr>
            `;
        }
    );
    tableKlasemen +=`
                <thead>
                        <tr>
                            <th>Posisi</th>
                            <th>Klub</th>
                            <th>Main</th>
                            <th>Menang</th>
                            <th>Seri</th>
                            <th>Kalah</th>
                            <th>Gol</th>
                            <th>Kebobolan</th>
                            <th>Selisih Gol</th>
                            <th>Poin</th>
                        </tr>
                    </thead> ` + tableDataKlasemen + `
                    </tbody>

                    </table>
                `;
            }
        );
    document.getElementById("Klasemen").innerHTML = tableKlasemen;
}


function getKlasemenING(data) {
  let tableKlasemen = "";

  data.standings.forEach(function (standing) {
    let tableDataKlasemen = "";

    standing.table.forEach(function (tim) {
      tim = JSON.parse(
        JSON.stringify(tim).replace(/^http:\/\//i, "https://")
      );

      tableDataKlasemen += `<tr>
                <td>${tim.position}</td>
                    <td><a href="../page/detail-team.html?id=${tim.team.id}" class="link-to-team valign-wrapper">
                        <img src="${tim.team.crestUrl.replace(/^http:\/\//i, 'https://')}" class="responsive-img cres" alt=""> 
                            ${tim.team.name}
                        </a>
                    </td>
                    <td>
                        ${tim.playedGames}
                    </td>
                    <td>
                        ${tim.won}
                    </td>
                    <td>
                        ${tim.draw}
                    </td>
                    <td>
                        ${tim.lost}
                    </td>
                    <td>
                        ${tim.goalsFor}
                    </td>
                    <td>
                        ${tim.goalsAgainst}
                    </td>
                    <td>
                        ${tim.goalDifference}
                    </td>
                    <td>
                        ${tim.points}
                    </td>
                </tr>
            `;
        }
    );
    tableKlasemen +=`
                <thead>
                        <tr>
                            <th>Posisi</th>
                            <th>Klub</th>
                            <th>Main</th>
                            <th>Menang</th>
                            <th>Seri</th>
                            <th>Kalah</th>
                            <th>Gol</th>
                            <th>Kebobolan</th>
                            <th>Selisih Gol</th>
                            <th>Poin</th>
                        </tr>
                    </thead> ` + tableDataKlasemen + `
                    </tbody>

                    </table>
                `;
            }
        );
    document.getElementById("Klasemen").innerHTML = tableKlasemen;
}

function getTeamDetailInfo(data) {
data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, "https://"));

  let informasiTeam = "";
  let pemainTeam = "";
  let index = 1;

  informasiTeam += `
            <li class="collection-item">Alamat : ${data.address}</li>
            <li class="collection-item">Phone : ${data.phone}</li>
            <li class="collection-item">Website : <a href="${data.website}" target="_blank">${data.website}</a></li>
            <li class="collection-item">Email : ${data.email}</li>
            <li class="collection-item">founded : ${data.founded}</li>
            <li class="collection-item">Warna Klub : ${data.clubColors}</li>
            <li class="collection-item">venue : ${data.vanue}</li>
        `
    ;
 
  data.squad.forEach(squad => {
    pemainTeam += `
            <tr>
                <td class="center-align">${index}</td>
                <td class="center-align">${squad.name}</td>
                <td class="center-align">${squad.position}</td>
            </tr>
        `;
    index++;
  });


  let league = "";
  data.activeCompetitions.forEach(aktif => {
    league +=`
        <a href="">${aktif.name}</a>
    `
})
    const preload = document.querySelector('.preloader-background')
    crestImage = document.querySelector('.team-wraper-top img')
    crestImage.setAttribute('src', data.crestUrl.replace(/^http:\/\//i, 'https://'))
    crestImage.setAttribute('alt', data.name)
    document.querySelector('.team-name h1').innerHTML = data.name;
    document.getElementById("league").innerHTML =`Liga : ${league}`;
    document.getElementById("informasi").innerHTML = informasiTeam;
    document.getElementById("pemain").innerHTML = pemainTeam;
    preload.classList.add('fade-out')
}

function clubku(data){
    data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, "https://"));

    data.matchdata.matches.forEach(v => {
        match += `
        <li class="collection-item">
        <div class="row">
            <div class="col s12 m12 l12 justify-center">
                <p class=" text-darken-3">${new Date(v.utcDate).toLocaleDateString('en-ID',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
        </div>
        <div class="row mb-0">
            <div class="col s5 m5 l5">
                <h6>home</h6> 
                <a href="#team?id=${v.homeTeam.id}">${v.homeTeam.name}</a> 
            </div>
            <div class="col s2 m2 l2">
                <h5>VS</h5>
            </div>
            <div class="col s5 m5 l5">
                <h6>away</h6> 
                <a href="#team?id=${v.awayTeam.id}">${v.awayTeam.name}</a>   
            </div>
        </div>
    </li>
    `
    })

    document.querySelector('#upCommingTeamMatch').innerHTML = match;
}

function getTeamFavorites(data) {
  data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, "https://"));

  let teamFavoriteHtml = "";

  data.forEach(function (team) {
    teamFavoriteHtml += `
                <li class="collection-item left-align" id="unfav-id-${team.id}">
                    <div class="d-flex space-betwen align-item-center">
                        <a href="../page/detail-team.html?id=${team.id}" class="left-align link-team">${team.name}</a>
                        <a href="#unfav-me" class="waves-effect waves-light btn unfav" style="background-color: #ee6e73;" onclick="removeFavorites(${team.id}, 'favorite_team')">
                            <i class="large material-icons">delete_forever</i>
                        </a>
                    </div>
                </li>
            
        `;
  });

  document.getElementById("item-favorite").innerHTML = teamFavoriteHtml;
}

function FavoriteEmpty(type) {
  let Message = "";

  Message += `
    <div class="container">
         <div class="row">
            <div class="col s12">
              <div class="card">
                <div class="card-image">
                  <img src="./assets/images/favorite.jpeg">
                  <span class="card-title">Club Favorit</span>
                  <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">favorite_border</i></a>
                </div>
                <div class="card-content">
                  <p>
                    Tambahkan team favorit mu di menu liga spanyol maupun di liga inggris maka nantinya akan di tampilkan di halaman favorite ini yang bertujuan memudahkan pengguna
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
  `;

  document.getElementById("item-favorite").innerHTML = Message;
}

var convertDate = date => {
    const namaBulan = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return `${date.getDate()} ${namaBulan[date.getMonth()]} ${date.getFullYear()} ${formatAMPM(date)}`
}

function formatAMPM(date) {
    var jam = date.getHours();
    var menit = date.getMinutes();
    var ampm = jam >= 12 ? 'pm' : 'am';
    jam = jam % 12;
    jam = jam ? jam : 12;
    menit = menit < 10 ? '0' + menit : menit;
    var strTime = jam + ':' + menit + ' ' + ampm;
    return strTime;
}

function getPertandinganChampion(data) {
  let JadwalHTML = "";
  let kompeHTML = "";
    
    kompeHTML +=`
        <h5 class="a-font-bold">Jadwal</h5>
        <h6 class="a-font-bold">${data.competition.name}</h6>
        <h6 class="a-font-bold">${data.competition.area.name}</h6>
    `;

  data.matches.forEach(function (match) {
    JadwalHTML += `
    <div class="card">
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" src="./assets/images/champion.jpg">
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">${match.homeTeam.name} VS ${match.awayTeam.name}<i class="material-icons right">more_vert</i></span>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-2">Detail<i class="material-icons right">close</i></span>
      
          <div class="card-content">
            <div center-align>
              <h5 class="center-align">Matchday : ${match.matchday}</h5>
              <div class="center-align">Kick Off : ${convertDate(new Date(match.utcDate))}</div>
              <div class="row" style="margin:20px">
                <div class="col s5 truncate right-align">
                  <span class="blue-text">  ${match.homeTeam.name}</span>
                </div>
                <div class="col s2 ">
                  VS
                </div>
                <div class="col s5 truncate left-align">
                  <span class="blue-text">  ${match.awayTeam.name}</span>
                </div>
              </div>
            </div>
          </div>
      </div>
  </div>
        `
  });
  document.getElementById("kompetisi").innerHTML = kompeHTML;
  document.getElementById("jadwal-content").innerHTML = JadwalHTML;
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.slider');
    var instances = M.Slider.init(elems, options);
  });
}





