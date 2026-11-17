// Stories live in each franchise's existing scribeArticles archive.
const IDSN = 'Interdimensional Sports News';
let newsFranchise = '';

function isPublishedStory(story) {
  return story.status == null || story.status === 'published';
}

function newsStories(franchises) {
  return franchises.flatMap(franchise =>
    mediaStoryList(franchise).map(story => ({ franchise, story }))
  ).sort((a, b) => (Date.parse(b.story.addedAt) || 0) - (Date.parse(a.story.addedAt) || 0));
}

function storyPublication(franchise, story) {
  const id = story.publicationId || 'saturday-scribe';
  return franchise.publications?.find(publication => publication.id === id)?.name ||
    ({ 'saturday-scribe': 'Saturday Scribe', firebird: 'Firebird' })[id] || 'Publication';
}

function newsCards(entries, back) {
  if (!entries.length) return '<p class="muted">No stories published yet.</p>';
  return '<div class="news-grid">' + entries.map(({ franchise, story }) =>
    '<article class="card news-card">' + storyLeadPhoto(story) +
    '<div class="news-card-copy"><small class="muted">' +
    esc([franchise.name, storyPublication(franchise, story), story.date].filter(Boolean).join(' · ')) +
    '</small><h3><button class="profile-link" ' + storyClick(franchise.id, story.id, back) + '>' +
    esc(story.headline) + '</button></h3><p>' + esc(story.deck || '') +
    '</p><small class="muted">By ' + esc(mediaWriterName(franchise, story.writerId)) +
    '</small></div></article>'
  ).join('') + '</div>';
}

function newsHomePreview() {
  return '<section class="news-section"><div class="row"><h2 class="wide">' + IDSN +
    ' <small class="muted">IDSN</small></h2><button onclick="changeTab(\'IDSN\')">All stories →</button></div>' +
    newsCards(newsStories(data).slice(0, 2), 'Home') + '</section>';
}

function interdimensionalNews() {
  const selectedNewsFranchise = data.find(franchise => franchise.id === newsFranchise);
  return '<section class="news-section"><div class="row"><h2 class="wide">' + IDSN +
    ' <small class="muted">IDSN</small></h2><button onclick="goHome()">← Franchise HQ</button></div>' +
    '<label class="news-filter">Franchise<select onchange="filterIDSN(this.value)"><option value="">All franchises</option>' +
    data.map(franchise => '<option value="' + esc(franchise.id) + '"' +
      (franchise === selectedNewsFranchise ? ' selected' : '') + '>' + esc(franchise.name) + '</option>').join('') +
    '</select></label>' + newsCards(newsStories(selectedNewsFranchise ? [selectedNewsFranchise] : data), 'IDSN') + '</section>';
}

function filterIDSN(id) {
  newsFranchise = id;
  render();
}

function franchiseNewsPreview(franchise) {
  return '<section class="news-section"><div class="row"><h2 class="wide">Latest News</h2>' +
    '<button onclick="changeTab(\'Franchise News\')">Franchise news →</button></div>' +
    newsCards(newsStories([franchise]).slice(0, 2), 'Dashboard') + '</section>';
}

function franchiseNews(franchise) {
  const drafts = scribeArticles(franchise).filter(story => story.status === 'draft');
  return '<section class="news-section"><div class="row"><h2 class="wide">' + esc(franchise.name) +
    ' News</h2><button onclick="changeTab(\'Publications\')">Publications</button>' +
    '<button class="primary" onclick="scribeEditById(null)">+ Write a story</button></div>' +
    newsCards(newsStories([franchise]), 'Franchise News') +
    (drafts.length ? '<h3>Private drafts</h3><div class="row">' + drafts.map(story =>
      '<button onclick="scribeEditById(' + esc(JSON.stringify(story.id)) + ')">' +
      esc(story.headline || 'Untitled draft') + '</button>').join('') + '</div>' : '') + '</section>';
}

function storyPhotoUrl(value) {
  const url = String(value || '').trim();
  if (/^assets\/[a-z0-9/_-]+\.(webp|png|jpe?g|avif|gif)$/i.test(url)) return url;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && !parsed.username && !parsed.password ? parsed.href : '';
  } catch {
    return '';
  }
}

function storyPhotos(story) {
  const images = Array.isArray(story.images) ? story.images : [];
  return images.flatMap(image => {
    const src = storyPhotoUrl(image?.src);
    return src ? [{ src, alt: String(image.alt || ''), caption: String(image.caption || '') }] : [];
  });
}

function storyLeadPhoto(story) {
  const image = storyPhotos(story)[0];
  return image ? '<img class="news-lead-photo" src="' + esc(image.src) + '" alt="' + esc(image.alt) + '" loading="lazy">' : '';
}

function storyGallery(story) {
  const images = storyPhotos(story);
  if (!images.length) return '';
  return '<div class="news-gallery">' + images.map(image =>
    '<figure><img src="' + esc(image.src) + '" alt="' + esc(image.alt) + '" loading="lazy">' +
    (image.caption ? '<figcaption>' + esc(image.caption) + '</figcaption>' : '') + '</figure>'
  ).join('') + '</div>' +
  (story.imageCredit ? '<p class="muted news-credit">' + esc(story.imageCredit) + '</p>' : '');
}

function storySource(story) {
  const url = storyPhotoUrl(story.sourceUrl);
  return url && url.startsWith('https:') ? '<p><a href="' + esc(url) + '">' +
    esc(story.sourceLabel || 'Source') + '</a></p>' : '';
}

function storyPhotoFields(image = {}) {
  return '<div class="news-photo-fields"><label>Image URL or asset path<input name="imageSrc" value="' +
    esc(image.src || '') + '"></label><label>Alt text<input name="imageAlt" value="' +
    esc(image.alt || '') + '"></label><label>Caption<input name="imageCaption" value="' +
    esc(image.caption || '') + '"></label></div>';
}

function seedNevadaNews() {
  let franchise = data.find(item => item.id === 'npbl-nevada-jacks' || item.name.trim().toLowerCase() === 'nevada jacks');
  if (!franchise) {
    franchise = {
      id: 'npbl-nevada-jacks', name: 'Nevada Jacks', sport: 'NPBL Baseball', season: '2108',
      colors: { primary: '#941e2b', accent: '#e2b34d' },
      description: 'Nevada Jacks coverage from Venetian Field.',
      players: [], recruits: [], notes: [], publications: [], mediaPersonalities: [], scribeArticles: []
    };
    data.push(franchise);
  }

  const publicationId = 'nevada-jacks-newspaper';
  const writerId = 'nevada-sports-desk';
  const publications = franchise.publications ||= [];
  const writers = franchise.mediaPersonalities ||= [];
  const articles = franchise.scribeArticles ||= [];
  if (!publications.some(item => item.id === publicationId)) {
    publications.push({ id: publicationId, name: 'Nevada Jacks Newspaper', description: 'Game stories and features from Venetian Field.' });
  }
  if (!writers.some(item => item.id === writerId)) {
    writers.push({ id: writerId, name: 'Nevada Sports Desk', publicationId });
  }
  if (!articles.some(item => item.id === 'nevada-adams-walk-off-2108')) {
    articles.push({
      id: 'nevada-adams-walk-off-2108', publicationId, writerId,
      status: 'published', date: '2108-06-06', addedAt: '2026-11-17', category: 'Game Recap',
      headline: 'Adams walks it off with a grand slam',
      deck: 'Down three in the ninth, Nevada beats Georgia 6–5 at Venetian Field.',
      body: 'Georgia entered the ninth three outs from a sweep. The Jacks trailed 5–2, but loaded the bases for Cedric Adams, who had gone hitless in his first four trips to the plate. His walk-off grand slam turned a three-run deficit into a 6–5 Nevada win.\n\nAllen McBride had three hits and a walk, and Thomas Gentry kept the deficit within reach with two scoreless innings in relief. Nevada carried the win into Florida and swept the series there, closing the sim with four straight victories.',
      images: [
        { src: 'assets/nevada/adams-swing.webp', alt: 'Cedric Adams swings under the lights at Venetian Field', caption: 'The swing. Adams, No. 9, erases a 5–2 deficit in the bottom of the ninth.' },
        { src: 'assets/nevada/adams-point.webp', alt: 'Adams points one finger skyward', caption: 'The point. Adams celebrates the walk-off against Georgia.' },
        { src: 'assets/nevada/adams-celebration.webp', alt: 'Teammates splash Adams with a cooler of water', caption: 'The splash. An imagined postgame water dump at Venetian Field.' }
      ],
      imageCredit: 'AI recreations of the walk-off and celebration.',
      sourceUrl: 'https://statsplus.net/npbl/reports/news/html/box_scores/game_box_434.html',
      sourceLabel: 'NPBL box score'
    });
  }
}

function nevadaDashboard(franchise) {
  return '<div class="afbl-dashboard"><div class="afbl-hero"><small>NPBL BASEBALL</small><h2>' +
    esc(franchise.name) + '</h2><p>Venetian Field · ' + esc(franchise.season) +
    '</p><div class="row"><button onclick="changeTab(\'Publications\')">Publications</button>' +
    '<a href="https://nevada-jacks-gm-headquarters.zachlarson.chatgpt.site">GM Headquarters ↗</a></div></div></div>';
}

// Compose the news pages with the existing owner navigation and save model.
function installNewsNavigation() {
  const renderFranchiseHQ = render;
  render = function renderWithNews() {
    const route = tab;
    if (route === 'IDSN' || route === 'Franchise News') {
      tab = route === 'IDSN' ? 'Home' : 'Dashboard';
      try {
        renderFranchiseHQ();
      } finally {
        tab = route;
      }
      document.getElementById('home-button').disabled = false;
      document.getElementById('view').innerHTML = route === 'IDSN' ? interdimensionalNews() : franchiseNews(f());
      return;
    }

    renderFranchiseHQ();
    const view = document.getElementById('view');
    if (tab === 'Home') {
      const cards = view.querySelector('.franchise-card-grid');
      cards?.insertAdjacentHTML('beforebegin', newsHomePreview());
      return;
    }
    const franchise = f();
    if (franchise.id === 'npbl-nevada-jacks') {
      document.getElementById('tabs').innerHTML = ['Dashboard', 'Publications', 'Media Personalities', 'Settings'].map(name =>
        '<button class="' + (tab === name ? 'active' : '') + '" onclick="' +
        esc('changeTab(' + JSON.stringify(name) + ')') + '">' + name + '</button>'
      ).join('');
      if (tab === 'Dashboard') view.innerHTML = nevadaDashboard(franchise);
    }
    if (tab === 'Dashboard') view.insertAdjacentHTML('beforeend', franchiseNewsPreview(franchise));
  };
}
