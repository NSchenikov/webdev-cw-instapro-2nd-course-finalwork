import { POSTS_PAGE, USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken, renderApp} from "../index.js";
import { getPosts, putDislike, putLike, userPsts } from "../api.js";
import { renderUserPostsPageComponent } from "./user-posts-page-component.js";

export function initLikes(arr, rendering) {
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
          arr[index].isLiked = false; 
          arr[index].likes.forEach((user, indx) => {
            // console.log(user.id);
            if(user.id === JSON.parse(window.localStorage.getItem("user"))._id) { //берем залогиненого пользователя, которого запомнил браузер после авторизации
              arr[index].likes.splice(indx, 1); //удаляем из локального объекта постов лайк текущего пользователя
            }
          });
          // console.log(psts);
        })
        .then(() => {
          return rendering();
        });
      } else if(postLike.dataset.isliked === 'false') {
        putLike({
          token: getToken(),
          id: postLike.dataset.postId,
        })
        .then(() => {
          getPosts({ getToken });
          arr[index].isLiked = true;
          arr[index].likes.push({id: JSON.parse(window.localStorage.getItem("user"))._id, name: JSON.parse(window.localStorage.getItem("user")).name}); //добавляем сохраненного браузером пользователя в локальный массив постов
        })
        .then(() => {
          return rendering();
        });
        // console.log(psts);
      }
    });
  }
}

export function renderPostsPageComponent({ appEl, psts }) {
  // TODO: реализовать рендер постов из api +

  function rendering() {
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

      initLikes(psts, rendering);

      for (let userEl of document.querySelectorAll(".post-header")) {
        userEl.addEventListener("click", () => {
          renderUserPostsPageComponent({appEl, userPsts});
          goToPage(USER_POSTS_PAGE, {
            userId: userEl.dataset.userId,
          });
        });
      }
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

