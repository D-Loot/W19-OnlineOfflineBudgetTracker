// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#using_an_experimental_version_of_indexeddb
const window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;


let db,
  tx,
  store;

const request = window.indexedDB.open("budgetDB", 1);


request.onupgradeneeded = function(e) {
  const db = request.result;
  db.createObjectStore("BudgetStore", { autoIncrement: true });
};

request.onerror = function(e) {
  console.log("There was an error");
};

request.onsuccess = function(e) {
  db = request.result;
  fetch(`/api/transaction/bulk`, {
    method: "POST",
    body: JSON.stringify(getAll.result),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function() {
    loadImages();
  }).catch(function(err) {
    console.log(err);
    dataArray.forEach((item) => {
      if(item._id === id) {
        item.rating = rating;
      }
    });
    createCards(dataArray);
  });
};
  tx = db.transaction(["BudgetStore"], "readwrite");
  store = tx.objectStore("BudgetStore");

  db.onerror = function(e) {
    console.log("error");
  };
  if (method === "put") {
    store.put(object);
  }
  if (method === "get") {
    const all = store.getAll();
    all.onsuccess = function() {
      resolve(all.result);
    };
  }
  tx.oncomplete = function() {
    db.close();
  };
};
function checkDB(){

}

// See Line 139 of ../index.js
function saveRecord(record){
  tx = db.transaction(["BudgetStore"],"readwrite");
  store = tx.objectStore("BudgetStore");
  store.add(record)
}

window.addEventListener("online",checkDB)