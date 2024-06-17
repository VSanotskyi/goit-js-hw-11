const markupImages = (images) => {
  return images.map(({
    webformatURL, largeImageURL, tags, likes, views, comments, downloads,
  }) => `
    <div class="photo-card">
    <a href="${ largeImageURL }">
    <img width="300" height="300" src="${ webformatURL }" alt="${ tags }" loading="lazy" />
    </a>
    <div class="info">
    <p class="info-item">
      <b>Likes:</b>
      <b>${ likes }</b>
    </p>
    <p class="info-item">
      <b>Views:</b>
      <b>${ views }</b>
    </p>
    <p class="info-item">
      <b>Comments:</b>
      <b>${ comments }</b>
    </p>
    <p class="info-item">
      <b>Downloads:</b>
      <b>${ downloads }</b>
    </p>
  </div>
  </div>
      `).join('');
};

export {
  markupImages,
};