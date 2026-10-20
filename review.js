const reviewLink = document.querySelector('.review-button');
const intro = document.querySelector('#review-intro');
const thanks = document.querySelector('#thank-you');
const back = document.querySelector('#back-button');
const card = document.querySelector('.review-card');

reviewLink.addEventListener('click', () => {
  // Preserve the native Google link for every visitor, with no rating gate.
  intro.hidden = true;
  thanks.hidden = false;
  back.hidden = false;
  card.setAttribute('aria-labelledby', 'thank-you-title');
  document.querySelector('#thank-you-title').focus({ preventScroll: true });
});

back.addEventListener('click', () => {
  intro.hidden = false;
  thanks.hidden = true;
  back.hidden = true;
  card.setAttribute('aria-labelledby', 'page-title');
  reviewLink.focus({ preventScroll: true });
});

// Native page scrolling stays available on touch screens and with the keyboard.
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const cards = document.querySelectorAll('.testimonial-card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  cards.forEach(card => {
    card.classList.add('will-reveal');
    observer.observe(card);
  });
}

const homeView = document.querySelector('[data-view="home"]');
const suggestionsView = document.querySelector('#suggestions-view');
const suggestionsTitle = document.querySelector('#suggestions-title');
let savedScroll = 0;
function syncView(focus = true) {
  const showSuggestions = location.hash === '#sugestoes';
  if (showSuggestions && !homeView.hidden) savedScroll = window.scrollY;
  homeView.hidden = showSuggestions;
  suggestionsView.hidden = !showSuggestions;
  document.body.classList.toggle('showing-suggestions', showSuggestions);
  if (showSuggestions) {
    window.scrollTo({top: 0, behavior: 'instant'});
    if (focus) suggestionsTitle.focus({preventScroll:true});
  } else if (focus) {
    window.scrollTo({top: savedScroll, behavior: 'instant'});
    document.querySelector('#open-suggestions').focus({preventScroll:true});
  }
}
document.querySelector('#open-suggestions').addEventListener('click', event => {
  event.preventDefault();
  history.pushState(null, '', '#sugestoes');
  syncView();
});
document.querySelector('#close-suggestions').addEventListener('click', event => {
  event.preventDefault();
  history.pushState(null, '', '#inicio');
  syncView();
});
window.addEventListener('hashchange', () => syncView());
window.addEventListener('popstate', () => syncView());
syncView(location.hash === '#sugestoes');
