import { POSTS_PAGE, USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken } from "../index.js";
import { getPosts, psts, putDislike, putLike } from "../api.js";

export function renderPostsPageComponent({ appEl, psts }) {
  // TODO: реализовать рендер постов из api +

  function initLikes() {
    // rendering();
    for(let postLike of document.querySelectorAll(".like-button")) {
      let index = postLike.dataset.index;
      postLike.addEventListener("click", () => {
        console.log(`уже лайкнут? ${postLike.dataset.isliked}`);
        if(postLike.dataset.isliked === 'true') {
          putDislike({
            token: getToken(),
            id: postLike.dataset.postId,
          })
          .then(() => {
            getPosts({ getToken });
          })
          .then(() => {
            rendering();
          });
        } else if(postLike.dataset.isliked === 'false') {
          putLike({
            token: getToken(),
            id: postLike.dataset.postId,
          })
          .then(() => {
            getPosts({ getToken });
          })
          .then(() => {
            rendering();
          });
        }
        rendering();
      });
    }
  }

  const rendering = () => {
      let pstsHtml = psts.map((pst, index) => {
        return   `
        <li class="post" data-post-index=${index}>
          <div class="post-header" data-user-id="${pst.userId}">
              <img src="${pst.userImageUrl}" class="post-header__user-image">
              <p class="post-header__user-name">${pst.userName}</p>
          </div>
          <div class="post-image-container">
            <img class="post-image" src=${pst.imageUrl}>
          </div>
          <div class="post-likes">
            <button data-post-id=${pst.id} data-isLiked=${pst.isLiked} data-index=${index} class="like-button">
              <img src="./assets/images/${pst.isLiked ? "like-active" : "like-not-active"}.svg">
            </button>
            <p class="post-likes-text">
              Нравится: <strong>${pst.likes.length}</strong>
            </p>
          </div>
          <p class="post-text">
            <span class="user-name">${pst.userName}</span>
            ${pst.text}
          </p>
          <p class="post-date">
            ### минут назад
          </p>
        </li>
      `;
      }).join('');


      const appHtml = `
        <div class="page-container">
          <div class="header-container"></div>
          <ul class="posts">
              ${pstsHtml}
          </ul>
        </div>`;




      appEl.innerHTML = appHtml;

      renderHeaderComponent({
        element: document.querySelector(".header-container"),
      });
      initLikes();
  }


  rendering();
    // initLikes();


  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }


}

