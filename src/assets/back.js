// Event listener listening for back link clicks.
document.querySelector('#back-link').addEventListener('click', goBack);

/**
 * Function to go backwards through page history.
 *
 * @returns {boolean} Always returns false, needed for Chrome.
 */
function goBack() {
  history.go(-1);
  return false;
}
