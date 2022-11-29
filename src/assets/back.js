document.querySelector('#back-link').addEventListener('click', goBack);

// Needed as history.back() fails in Chrome.
function goBack() {
  history.go(-1);
  return false;
}
