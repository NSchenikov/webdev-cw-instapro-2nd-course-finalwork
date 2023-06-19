import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { getPosts, psts, userPsts } from "../api.js";

export function renderUserPostsPageComponent({ appEl }) {
    let pstsHtml = userPsts.map((pst, index) => {
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
            <button data-post-id=${pst.id} class="like-button">
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