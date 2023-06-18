import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";
import { uploadImage } from "../api.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    // TODO: Реализовать страницу добавления поста

    const appHtml = `
    <div class="head"></div>
    <div class="post-page-container">
      <div class="header-container" id="add-post-header"></div>
      Добавить пост
      <div class="choose-pic-button"></div>
      <div>
        <div>Опишите фотографию</div>
        <input type="text" class="post-description-input">
      </div>

      <button class="button" id="add-button">Добавить</button>
    </div>
  `;

    appEl.innerHTML = appHtml;

      renderHeaderComponent({
        element: document.querySelector(".head")
      });

      renderUploadImageComponent({
        element: document.querySelector(".choose-pic-button"),
        onImageUrlChange: (imageUrl) => {
          imageUrl = imageUrl;
        }
      });

      const postDescriptionInput = document.querySelector('.post-description-input');

    document.getElementById("add-button").addEventListener("click", () => {
      onAddPostClick({
        description: postDescriptionInput.value,
        imageUrl: uploadImage({
          file: "https://image.png",
        })
        .then((data) => {
            console.log(data.fileUrl);
            return data.fileUrl;
        })
      });
    });
  };

  render();
}
