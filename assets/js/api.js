const base_url = "https://api.football-data.org/v2";
const api_token = "5cd20dcd2dc94f8c8c6780825d33ed01";
const liga_inggris = 2021; 
const liga_spanyol = 2014;
const liga_champion = 2001;

const endpoint_klasemen_inggris = `${base_url}/competitions/${liga_inggris}/standings/?standingType=TOTAL`;
const endpoint_klasemen_spanyol = `${base_url}/competitions/${liga_spanyol}/standings/?standingType=TOTAL`;
const endpoint_detail_team = `${base_url}/teams/`;
const endpoint_liga_champion = `${base_url}/competitions/${liga_champion}/matches?status=SCHEDULED&limit=20`;
const typeTeam = "team"; 
const storeNameTeam = "favorite_team";

function fetchData(endpoint) {
    return fetch(endpoint, {
        headers: {
        "X-Auth-Token": api_token,
        },
    });
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error : " + error);
}

function getKlasemenSpanyol() {
    return new Promise(function (resolve, reject) {
        if ("caches" in window) {
            caches.match(endpoint_klasemen_spanyol)
                .then(function (response) {
                    if (response) {
                    response.json()
                        .then(function (data) {
                        getKlasemenSPY(data);
                    });
                }
            });
        }
        fetchData(endpoint_klasemen_spanyol)
            .then(status)
            .then(json)
            .then(function (data) {
                getKlasemenSPY(data);
                resolve(data);
        })
        .catch(error);
    });
}

function getKlasemenInggris() {
    return new Promise(function (resolve, reject) {
        if ("caches" in window) {
            caches.match(endpoint_klasemen_inggris)
                .then(function (response) {
                    if (response) {
                    response.json()
                        .then(function (data) {
                        getKlasemenING(data);
                    });
                }
            });
        }
        fetchData(endpoint_klasemen_inggris)
            .then(status)
            .then(json)
            .then(function (data) {
                getKlasemenING(data);
                resolve(data);
        })
        .catch(error);
    });
}

function getTeamDetail(teamID) {
    return new Promise(function (resolve, reject) {
        if ("caches" in window) {
            caches.match(endpoint_detail_team + teamID)
                .then(function (response) {
                    if (response) {
                    response.json()
                        .then(function (data) {
                        getTeamDetailInfo(data);
                        resolve(data);
                    });
                }
            });
        }
        fetchData(endpoint_detail_team + teamID)
            .then(status)
            .then(json)
            .then(function (data) {
                getTeamDetailInfo(data);
                resolve(data);
        })
        .catch(error);
    });
}   

function getCahmpion() {
    return new Promise(function (resolve, reject) {
        if ('caches' in window) {
            caches.match(endpoint_liga_champion)
                .then(function (response) {
                    if (response) {
                    response.json()
                    .then(function (data) {
                        getPertandinganChampion(data);
                        resolve(data);
                    });
                }
            });
        }
        fetchData(endpoint_liga_champion)
            .then(status)
            .then(json)
            .then(function (data) {
                getPertandinganChampion(data);
                resolve(data);
        })
        .catch(error);
    });
}

function EmptyFavorites(storeName) {
  let type;

    switch (storeName) {
        case storeNameTeam:
        type = "team";
        getAllFavorites(storeName).then((data) => {
            if (data == "") FavoriteEmpty(type);
            else getTeamFavorites(data);
        });
        break;
    }
}

function getFavoriteById(ID, type) {
    if (type == typeTeam) {
        getById(ID, storeNameTeam).then(function (data) {
            getTeamFavorites(data);
        });
    }
}
