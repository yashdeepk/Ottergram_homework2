var DETAIL_IMAGE_SELECTOR = "[data-image-role='target']";
var DETAIL_TITLE_SELECTOR = "[data-image-role='title']";
var THUMBNAIL_LINK_SELECTOR = "[data-image-role='trigger']";


function setDetails(imageUrl, titleText) {
  "use strict";
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute("src", imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-url");
}

function titleFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-title");
}

function setDetailsFromThumb(thumbnail) {
  "use strict";
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  "use strict";
  thumb.addEventListener("click", function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
  });
}

function getThumbnailsArray() {
  "use strict";
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function initializeEvents() {
  "use strict";
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  setPointers();
}

function setPointers() {
  "use strict";
  var next = document.getElementById("next");
  var prev = document.getElementById("prev");
  next.addEventListener("click", function(event) {
    event.preventDefault();
    var index = parseInt(next.getAttribute("data-i"));
    var thumbnail = document.querySelector("[data-index='" + index + "']");
    if (thumbnail != null) {
      setDetailsFromThumb(thumbnail);
      next.setAttribute("data-i", (index + 1));
      prev.setAttribute("data-i", (index - 1));
    }
  });

  prev.addEventListener("click", function(event) {
    event.preventDefault();
    var index = parseInt(prev.getAttribute("data-i"));
    var thumbnail = document.querySelector("[data-index='" + index + "']");
    if (thumbnail != null) {
      setDetailsFromThumb(thumbnail);
      next.setAttribute("data-i", (index + 1));
      prev.setAttribute("data-i", (index - 1));
    }
  });
}

initializeEvents();
