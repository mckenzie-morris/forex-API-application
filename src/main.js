import 'animate.css';
import '../public/main.scss';
import $ from 'jquery';
import 'bootstrap';

const lightThemeImgSrc = 'light-mode-day-sun.svg';
const darkThemeImgSrc = 'dark-mode-night-moon.svg';

$(() => {
  // initialize the html to dark theme
  $('html').attr('data-bs-theme', 'dark');
  $('.hasText').attr('style', 'color: #0DFF00;');
});
// Toggle theme
$('#theme_toggle').on('click', () => {
  // change theme from dark mode to light mode on click
  if ($('html').attr('data-bs-theme') === 'dark') {
    $('html').removeAttr('data-bs-theme');
    $('html').attr('data-bs-theme', 'light');
    $('#theme_toggle_img').removeAttr('src');
    $('#theme_toggle_img').attr('src', darkThemeImgSrc);
    $('.hasText').attr('style', 'color: #ff7300;');
    return;
  }
  // change theme from light mode to dark mode on click
  if ($('html').attr('data-bs-theme') === 'light') {
    $('html').removeAttr('data-bs-theme');
    $('html').attr('data-bs-theme', 'dark');
    $('#theme_toggle_img').removeAttr('src');
    $('#theme_toggle_img').attr('src', lightThemeImgSrc);
    $('.hasText').attr('style', 'color: #0DFF00;');
    return;
  }
});

$('li').on('click', function () {
  const listItemElmt = $(this).data('list_item_elmt');
  console.log(listItemElmt)
})
