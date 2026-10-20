const siteShareData = {
  title: 'Auto Escola Condutor',
  text: 'Avalie sua experiência com a Auto Escola Condutor.',
  url: 'https://avaliacoescondutor.danielmagri66.chatgpt.site/'
};
document.querySelectorAll('[data-share]').forEach(button => {
  // Only show sharing where the device offers its native share sheet.
  if (typeof navigator.share !== 'function') {
    button.hidden = true;
    return;
  }
  button.addEventListener('click', async () => {
    try {
      await navigator.share(siteShareData);
    } catch (error) {
      // Closing the native sheet needs no further action or custom menu.
      if (error.name !== 'AbortError') console.warn('Compartilhamento nativo indisponível.');
    }
  });
});
