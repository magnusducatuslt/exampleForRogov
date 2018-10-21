document.getElementById("form-isbn").addEventListener("submit", async e => {
  e.preventDefault();
  const value = document.getElementById("input-isbn").value;
  clearTable();
  //9789000035526
  getBookByIsbn(9789000035526);
});
function addBookToListForReading(value) {
  return new Promise((resolve, rej) => {
    fetch("http://localhost:7777/addbooktolist", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(value)
    })
      .then(res => res.json())
      .then(res => {
        resolve(res);
      })
      .catch(e => rej(e));
  });
}
function showInTextarea(value) {
  console.log("Render", new Date());
  const tr = document.createElement("tr");
  const isbn = document.createElement("td");
  const name = document.createElement("td");
  const author = document.createElement("td");
  tr.appendChild(isbn);
  tr.appendChild(name);
  tr.appendChild(author);
  isbn.innerHTML = value.ISBN;
  name.innerHTML = value.Title;
  let authorParam = ``;
  for (let i in value.Authors) {
    authorParam += " " + value.Authors[i].Name;
  }
  author.innerHTML = authorParam;

  document.getElementById("viewport-table-body").appendChild(tr);
  document.getElementById("viewport-table").style = "display:block";
}
async function getBookByIsbn(isbn) {
  let result = "";
  let getter = await fetch(`https://www.booknomads.com/api/v0/isbn/${isbn}`);
  result = await getter.json();
  console.log(result);

  let fromServer = await addBookToListForReading(result);
  console.log(fromServer, new Date());
  showInTextarea(fromServer);
}
function clearTable() {
  document.getElementById("viewport-table-body").innerHTML = "";
}
