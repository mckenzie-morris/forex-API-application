// import 'animate.css';
// import '../node_modules/animate.css/animate.css';
// import '../public/main.scss';
// import $ from 'jquery';
// import 'bootstrap';

const lightThemeImgSrc = 'light-mode-day-sun.svg';
const darkThemeImgSrc = 'dark-mode-night-moon.svg';

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

$('#amountInput').on('focusout', () => {
  const amountInput = $('#amountInput').val();
  if (amountInput.length && Number(amountInput) <= 0) {
    $('#amountInput').val('');
    return alert('Please enter a valid amount');
  }
});

let leftInputValid;
let rightInputValid;
let inputAmountValid;

$('#leftInput').on('input', () => {
  leftInputValid = true;
  if (inputAmountValid && leftInputValid && rightInputValid) {
    $('#submitButton').prop('disabled', false);
  }
});

$('#rightInput').on('input', () => {
  rightInputValid = true;
  if (inputAmountValid && leftInputValid && rightInputValid) {
    $('#submitButton').prop('disabled', false);
  }
});

$('#amountInput').on('change', () => {
  if (Number($('#amountInput').val()) > 0) {
    inputAmountValid = true;
  } else {
    inputAmountValid = false;
  }
  if (inputAmountValid && leftInputValid && rightInputValid) {
    $('#submitButton').prop('disabled', false);
  }
});

// populate input fields from dropdowns
$('.currCode').on('click', function () {
  const listItemElmt = $(this).data('list_item_elmt');
  const whichInput = $(this).data('which_input');
  $(whichInput).val(listItemElmt).trigger('input');
  return;
});

$('#submit_conversion').on('submit', (event) => {
  if ($('#leftInput').val() === $('#rightInput').val()) {
    alert('Currencies may not be the same')
    event.preventDefault();
    return;
  }
});
