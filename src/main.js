// import 'animate.css';
// import '../node_modules/animate.css/animate.css';
// import '../public/main.scss';
// import $ from 'jquery';
// import 'bootstrap';

const lightThemeImgSrc = 'light-mode-day-sun.svg';
const darkThemeImgSrc = 'dark-mode-night-moon.svg';

$(() => {
  // initialize the html to dark theme
  $('html').attr('data-bs-theme', 'dark');
  $('g').attr('fill', '#000000');
});
// toggle theme
$('#theme_toggle').on('click', () => {
  // change theme from dark mode to light mode on click
  if ($('html').attr('data-bs-theme') === 'dark') {
    $('html').removeAttr('data-bs-theme');
    $('html').attr('data-bs-theme', 'light');
    $('#theme_toggle_img').removeAttr('src');
    $('#theme_toggle_img').attr('src', darkThemeImgSrc);
    // toggle custom Bootsrap classes (night => day)
    $('.btn-outline-nightColor').toggleClass('btn-outline-nightColor btn-outline-dayColor');
    $('.text-nightColor').toggleClass('text-nightColor text-dayColor');
    $('.border-nightColor').toggleClass('border-nightColor border-dayColor');
    $('.btn-nightColor').toggleClass('btn-nightColor btn-dayColor');

    $('.btn-outline-light').toggleClass('btn-outline-light btn-outline-dark')

    $('g').removeAttr('fill');
    $('g').attr('fill', '#f0f0f5');
    return;
  }
  // change theme from light mode to dark mode on click
  if ($('html').attr('data-bs-theme') === 'light') {
    $('html').removeAttr('data-bs-theme');
    $('html').attr('data-bs-theme', 'dark');
    $('#theme_toggle_img').removeAttr('src');
    $('#theme_toggle_img').attr('src', lightThemeImgSrc);
    // toggle custom Bootsrap classes (day => night)
    $('.btn-outline-dayColor').toggleClass('btn-outline-dayColor btn-outline-nightColor');
    $('.text-dayColor').toggleClass('text-dayColor text-nightColor');
    $('.border-dayColor').toggleClass('border-dayColor border-nightColor');
    $('.btn-dayColor').toggleClass('btn-dayColor btn-nightColor');

    $('.btn-outline-dark').toggleClass('btn-outline-dark btn-outline-light')

    $('g').removeAttr('fill');
    $('g').attr('fill', '#000000');
    return;
  }
});



$('.currCode').on('click', function () {
  const listItemElmt = $(this).data('list_item_elmt');
  const whichInput = $(this).data('which_input');
  console.log(whichInput);
  console.log(listItemElmt);
  $(whichInput).val(listItemElmt);
});

