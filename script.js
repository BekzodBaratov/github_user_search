"use Strict";

const users = document.querySelector(".users");
const inpUserName = document.getElementById("inpUserName");
const repos = document.querySelector(".repos");

function fetchAPI(user) {
  //
  fetch(
    `https://api.github.com/users/${user}?client_id=65b44d46d520be1f19c7&client_secret=7287ef205413001a79b30f0fbcc04416153ef797&client_secret=0185319c5a96e40e26a9dc99d311bba540e7bc16`
  )
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      renderHTML(res);
    });

  repos.innerHTML = "";
  fetch(`https://api.github.com/users/${user}/repos`)
    .then((response) => response.json())
    .then((res) => {
      res.forEach((el) => {
        renderHTML2(el);
      });
    });
}

function renderHTML(user) {
  users.innerHTML = "";
  let html = `
  <div class="user">
    <div class="user-img">
      <div class="img"><img src="${user.avatar_url}" alt="user" /></div>
      <a href="${user.html_url}">View Profile</a>
    </div>
    <div class="user-info">
    <div class="user-item">
    <span class="user-repo1">Public repos: ${user.public_repos}</span>
    <span class="user-repo2">Public Gists: ${user.public_gists}</span>
    <span class="user-repo3">Followers: ${user.followers}</span>
    <span class="user-repo4">Following: ${user.following}</span>
    </div>
    <div class="user-item2">
    <h3 class="user-shortInfo1">Company: ${
      user.company === null ? "Malumot Yuq" : user.company
    }</h3>
    <h3 class="user-shortInfo2">Website/Blog: </h3>
    <h3 class="user-shortInfo3">Location: ${user.location}</h3>
    <h3 class="user-shortInfo4">Member Since: ${user.updated_at}</h3>
    </div>
    </div>
    </div>
    `;
  users.insertAdjacentHTML("afterbegin", html);
}

function renderHTML2(userRepo) {
  let html = `<div class="user-repo">
  <a href="${userRepo.archive_url}">${userRepo.name}</a>
  <div class="user-infos">
    <span class="user-repo-item1">Start: ${userRepo.stargazers_count}</span>
    <span class="user-repo-item1">Watchers: ${userRepo.watchers_count}</span>
    <span class="user-repo-item1">Forks: ${userRepo.forks_count}</span>
  </div>
  </div>`;
  repos.insertAdjacentHTML("beforeend", html);
}

inpUserName.addEventListener("input", () => {
  fetchAPI(inpUserName.value);
});
