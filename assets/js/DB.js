const dbPromised = idb.open("FOOTBALLNESIA", 1, (upgradeDB) => {
  const teamsObjectStore = upgradeDB.createObjectStore(storeNameTeam, {
    keyPath: "id",
  });
  teamsObjectStore.createIndex("team_name", "name", { unique: false });
});

function addToFavorite(data, storeName) {
  let valueData;
    switch (storeName) {
        case storeNameTeam:
        valueData = data;
        break;
    }
    dbPromised
        .then((db) => {
            let tx = db.transaction(storeName, "readwrite");
            let store = tx.objectStore(storeName);
        store.put(valueData);
        return tx.complete;
    })
    .then(function () {
        const el = document.getElementById("fabFavorite");
        el.onclick = () => {
            M.toast({
            html: `Kamu telah menambahkan ${data.name} ke favorites`,
        });
        el.setAttribute("disabled", true);
      };
    });
}

function removeFavorites(ID, storeName) {
    dbPromised
        .then((db) => {
            let tx = db.transaction(storeName, "readwrite");
            let store = tx.objectStore(storeName);
        store.delete(ID);
        return tx.complete;
    })
    .then(function () {
        M.toast({
            html: "Kamu menghapus Clubs ini dari favorites",
        });
    });
  location.reload();
}

function getAllFavorites(storeName) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then((db) => {
                let tx = db.transaction(storeName, "readonly");
                let store = tx.objectStore(storeName);
        return store.getAll();
        })
        .then((data) => {
            resolve(data);
        });
    });
}

function getById(ID, storeName) {
    return new Promise(function (resolve, reject) {
        dbPromised
        .then((db) => {
            let tx = db.transaction(storeName, "readonly");
            let store = tx.objectStore(storeName);
        return store.get(ID);
        })
        .then((data) => {
            resolve(data);
        });
    });
}

async function isEmpty(ID, storeName) {
    return (await getById(ID, storeName)) === undefined ? false : true;
}
