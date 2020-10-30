const API_URL = "http://localhost:3000/api/posts/";
const API_BASE_URL = "http://localhost:3000/";
const API_DELETE_URL = "http://localhost:3000/api/delete";

window.onload = () => {
  getPost();
};

const getPostIdParam = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("id");
};

const getPost = () => {
  const postId = getPostIdParam();
  const URL = `${API_URL}${postId}`;
  fetch(URL, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      buildPost(data);
    });
};

const buildPost = (data) => {
  const postDate = new Date(parseInt(data.added_date)).toDateString();
  const postImage = `${API_BASE_URL}${data.post_image}`;
  document.querySelector("header").style.backgroundImage = `url(${postImage})`;

  document.getElementById("individual-post-title").innerHTML = data.title;
  document.getElementById(
    "individual-post-date"
  ).innerHTML = `Published on ${postDate}`;
  document.getElementById("individual-post-content").innerHTML = data.content;
};

const deletepost = () => {
  let id = getPostIdParam();
  let newUrl = `${API_DELETE_URL}/${id}`;
  fetch(newUrl, {
    method: "DELETE",
  }).then(() => {
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  });
};
