document.addEventListener("DOMContentLoaded", () => {
   const showMoreList = document.querySelectorAll("[data-can-hide]");

   showMoreList.forEach(list => {
      if (list.dataset.canHide === "true") {
         let visibleItemsNumber = parseInt(list.dataset.visibleNumber);
         let loadItemsNumber = parseInt(list.dataset.loadNumber);

         if (list.children.length > visibleItemsNumber) {
            for (let index = visibleItemsNumber; index < list.children.length; index++) {
               list.children[index].style.display = "none";
            }

            const loadBtn = document.createElement("button");
            loadBtn.classList.add("showMoreBtn");
            loadBtn.innerText = "Показать еще";
            list.after(loadBtn);

            loadBtn.addEventListener("click", () => {
               for (let index = visibleItemsNumber; index < visibleItemsNumber + loadItemsNumber; index++) {
                  list.children[index].style.display = "block";
               }
               visibleItemsNumber += loadItemsNumber;
            });
         }
      }
   });
});
