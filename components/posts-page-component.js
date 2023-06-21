import { POSTS_PAGE, USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken } from "../index.js";
import { getPosts, psts, putDislike, putLike } from "../api.js";

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api +

  function rendering(psts) {
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
            <button data-post-id=${pst.id} data-isLiked=${pst.isLiked} class="like-button">
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
  }
  rendering(psts);

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

  for(let postLike of document.querySelectorAll(".like-button")) {
      postLike.addEventListener("click", () => {
        console.log(postLike.dataset.isliked);
        if(postLike.dataset.isliked) {
          console.log(`id поста ${postLike.dataset.postId}`);
          putLike({
            token: getToken(),
            id: postLike.dataset.postId,
          });
          getPosts({ getToken });
          rendering(psts);
          console.log(psts);
        } else if(!postLike.dataset.isliked) {
          console.log(`id поста ${postLike.dataset.postId}`);
          putDislike({
            token: getToken(),
            id: postLike.dataset.postId,
          });
          getPosts({ getToken });
          rendering(psts);
        }
      });
  }
}
