import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { getPosts, psts, userPsts } from "../api.js";
import { initLikes } from "./posts-page-component.js";

export function renderUserPostsPageComponent({ appEl, userPsts }) {
  function rendering() {
    let pstsHtml = userPsts.map((pst, index) => {
      return   `
      <li class="post" data-post-index=${index}>
         <div class="post-header" data-user-id="${pst.user.id}">
             <img src="${pst.user.imageUrl}" class="post-header__user-image">
             <p class="post-header__user-name">${pst.user.name}</p>
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
           <span class="user-name">${pst.user.name}</span>
           ${pst.description}
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

    initLikes(userPsts, rendering);
    
  }
  rendering();
}