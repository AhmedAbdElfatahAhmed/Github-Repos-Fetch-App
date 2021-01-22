// main varibles
let theInput = document.querySelector(".get-repos input");
let theButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

theButton.onclick = function () {
  getRepos();
};
theInput.onkeypress = function (e) {
  if (e.code == "Enter") {
    getRepos();
  }
};

// Get Repos Function
function getRepos() {
  if (theInput.value == "") {
    Swal.fire({
      title: "Warning",
      text: "you must write Github user name",
      icon: "warning",
      timer: 2000,
      showConfirmButton: false,
    });
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((response) => response.json())
      .then((repos) => {
        // Empty the container
        reposData.innerHTML = "";

        // create repositoriesNumber container div
        let repositoriesNumber_container = document.createElement("div");
        repositoriesNumber_container.className = "repositoriesNumber_container";
        // create repositoriesText span
        let repositoriesText = document.createElement("span");
        // Add text Content to the repositoriesText
        repositoriesText.textContent = "Repositories";
        // create repositoriesNumber span
        let repositoriesNumber = document.createElement("span");
        // Add text Content to the repositoriesText
        repositoriesNumber.textContent = repos.length;
        repositoriesNumber_container.appendChild(repositoriesText);
        repositoriesNumber_container.appendChild(repositoriesNumber);
        reposData.appendChild(repositoriesNumber_container);
        repositoriesNumber.className = "repositories_number";

        // loop on repositories
        repos.forEach((repo) => {
          //create the main Div Element
          let mainDiv = document.createElement("div");
          // create Repo name text
          let repoName = document.createTextNode(repo.name);
          //Append the text to the main Div
          mainDiv.appendChild(repoName);
          // create repo URL anchor
          let theUrl = document.createElement("a");
          // Add text Content to the Url
          theUrl.textContent = "Visit";
          // Add the href
          theUrl.href = repo.svn_url;
          // set Attrabute Blank
          theUrl.target = "_blank";
          //Append the theUrl Anchor to the main Div
          mainDiv.appendChild(theUrl);
          // create stars count span
          let starsSpan = document.createElement("span");
          // Add text Content to starsSpan
          starsSpan.textContent = `stars ${repo.stargazers_count} `;
          //Append the starsSpan to the main Div
          mainDiv.appendChild(starsSpan);
          // Add class on mainDiv
          mainDiv.className = "repo_box";
          //Append the main Div to container
          reposData.appendChild(mainDiv);
        });
      });
  }
}
