// import 'animate.css';
// import '../node_modules/animate.css/animate.css';
// import '../public/main.scss';
// import $ from 'jquery';
// import 'bootstrap';
import { currenciesArr } from '/currencies.js';

const lightThemeImgSrc = 'light-mode-day-sun.svg';
const darkThemeImgSrc = 'dark-mode-night-moon.svg';

let leftInputValid = false;
let rightInputValid = false;
let amountInputValid = false;

$(() => {
  initializeTooltips();
  // initialize the html to dark theme and disable submit button
  $('html').attr('data-bs-theme', 'dark');
  $('g').attr('fill', '#000000');
  $('#submitButton').prop('disabled', true);
});

function initializeTooltips() {
  $('[data-bs-toggle="tooltip"]').each(function () {
    var tooltip = new bootstrap.Tooltip($(this)[0]);
    $(this).on('inserted.bs.tooltip', function () {
      const currentTheme = $('html').attr('data-bs-theme');
      const tooltipClass =
        currentTheme === 'dark'
          ? 'custom-tooltip-dark'
          : 'custom-tooltip-light';
      $('.tooltip').addClass(tooltipClass);
    });
  });
}

// toggle theme
$('#theme_toggle').on('click', () => {
  // change theme from dark mode to light mode on click
  if ($('html').attr('data-bs-theme') === 'dark') {
    $('html').removeAttr('data-bs-theme');
    $('html').attr('data-bs-theme', 'light');
    $('#theme_toggle_img').removeAttr('src');
    $('#theme_toggle_img').attr('src', darkThemeImgSrc);
    // toggle custom Bootsrap classes (night => day)
    $('.btn-outline-nightColor').toggleClass(
      'btn-outline-nightColor btn-outline-dayColor'
    );
    $('.text-nightColor').toggleClass('text-nightColor text-dayColor');
    $('.border-nightColor').toggleClass('border-nightColor border-dayColor');
    $('.btn-nightColor').toggleClass('btn-nightColor btn-dayColor');
    $('.btn-outline-light').toggleClass('btn-outline-light btn-outline-dark');

    // Update tooltip classes
    $('.tooltip')
      .removeClass('custom-tooltip-dark')
      .addClass('custom-tooltip-light');

    // change color of symbols svg background
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
    $('.btn-outline-dayColor').toggleClass(
      'btn-outline-dayColor btn-outline-nightColor'
    );
    $('.text-dayColor').toggleClass('text-dayColor text-nightColor');
    $('.border-dayColor').toggleClass('border-dayColor border-nightColor');
    $('.btn-dayColor').toggleClass('btn-dayColor btn-nightColor');
    $('.btn-outline-dark').toggleClass('btn-outline-dark btn-outline-light');

    // Update tooltip classes
    $('.tooltip')
      .removeClass('custom-tooltip-light')
      .addClass('custom-tooltip-dark');

    // change color of symbols svg background
    $('g').removeAttr('fill');
    $('g').attr('fill', '#000000');
    return;
  }

  // Reinitialize tooltips to apply the new styles
  $('[data-bs-toggle="tooltip"]').tooltip('dispose');
  initializeTooltips();
});



$('#leftInput').on('focusout', () => {
  const regEx = /^[a-z]+$/i;
  const leftInput = $('#leftInput').val();
  if ((leftInput.length && !regEx.test(leftInput)) || leftInput.length > 3) {
    $('#leftInput').val('');
    return alert('Please Enter a Valid Currency Code');
  } else if (currenciesArr.includes(leftInput.toUpperCase())) {
    $('#leftInput').val(leftInput.toUpperCase());
    return (leftInputValid = true);
  }
});

$('#rightInput').on('focusout', () => {
  const regEx = /^[a-z]+$/i;
  const rightInput = $('#rightInput').val();
  if ((rightInput.length && !regEx.test(rightInput)) || rightInput.length > 3) {
    $('#rightInput').val('');
    return alert('Please Enter a Valid Currency Code');
  } else if (currenciesArr.includes(rightInput.toUpperCase())) {
    $('#rightInput').val(rightInput.toUpperCase());
    return (rightInputValid = true);
  }
});

$('#amountInput').on('focusout', () => {
  const amountInput = $('#amountInput').val();
  if (amountInput.length && Number(amountInput) > 0) {
    return (amountInputValid = true);
  } else if (amountInput.length) {
    $('#amountInput').val('');
    return alert('Please Enter a Valid Amount');
  }
});



// populate input fields from dropdowns
$('.currCode').on('click', function () {
  const listItemElmt = $(this).data('list_item_elmt');
  const whichInput = $(this).data('which_input');
  if (whichInput === '#leftInput') {
    leftInputValid = true;
    console.log(leftInputValid)
  }
  else {
    rightInputValid = true;
    console.log(rightInputValid)
  }
  $(whichInput).val(listItemElmt);
  return;
});
