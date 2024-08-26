import 'animate.css';
import '../node_modules/animate.css/animate.css';
import '../public/main.scss';
import lightThemeImgSrc from '../public/light-mode-day-sun.svg';
import darkThemeImgSrc from '../public/dark-mode-night-moon.svg';
import $ from 'jquery';
// import all the exported members (components, functions, and utilities) from Bootstrap module
import * as bootstrap from 'bootstrap';

/* make jQuery accessible to any scripts or libraries that expect window.jQuery to be present 
(including Bootstrap.) */
window.jQuery = $;
// assigns the imported bootstrap namespace to the window object
window.bootstrap = bootstrap;

// on document ready
$(() => {
  // initialize the html to dark theme
  $('html').attr('data-bs-theme', 'dark');
  // fill color of symbols svg background
  $('g').attr('fill', '#000000');
  // disable submit button
  $('#submitButton').prop('disabled', true);
  /* initializes the tooltip on all elements with the data-bs-toggle="tooltip" attribute, using 
  the specified option, 'customClass', to apply 'custom-tooltip-dark' */
  $('[data-bs-toggle="tooltip"]').tooltip({
    customClass: 'custom-tooltip-dark',
  });
  // custom styling for 'amountInput' placeholder
  $('#amountInput').addClass('darkPlaceholder');
});

// toggle theme
$('#theme_toggle').on('click', () => {
  // change theme from dark mode to light mode on click
  if ($('html').attr('data-bs-theme') === 'dark') {
    $('html').attr('data-bs-theme', 'light');
    $('#theme_toggle_img').attr('src', darkThemeImgSrc);
    // toggle custom Bootsrap classes (night => day)
    $('.btn-outline-nightColor').toggleClass(
      'btn-outline-nightColor btn-outline-dayColor'
    );
    $('.text-nightColor').toggleClass('text-nightColor text-dayColor');
    $('.border-nightColor').toggleClass('border-nightColor border-dayColor');
    $('.btn-nightColor').toggleClass('btn-nightColor btn-dayColor');
    $('.btn-outline-light').toggleClass('btn-outline-light btn-outline-dark');
    $('#amountInput').toggleClass('darkPlaceholder lightPlaceholder');
    // change color of symbols svg background
    $('g').attr('fill', '#f0f0f5');
    // select all elements in the DOM that have the attribute data-bs-toggle="tooltip"
    const tooltipElement = $('[data-bs-toggle="tooltip"]');
    // retrieves the Bootstrap tooltip instance associated with a specific DOM element
    const tooltipInstance = bootstrap.Tooltip.getInstance(tooltipElement);
    /* destroy tooltip instance, remove any stored data and event handlers related to the 
    tooltip (necessary to reinitialize the tooltip with new configuration options) */
    tooltipInstance.dispose();
    // reinitialize tooltip using the option 'customClass' to apply 'custom-tooltip-light'
    $('[data-bs-toggle="tooltip"]').tooltip({
      customClass: 'custom-tooltip-light',
    });
    return;
  }

  // change theme from light mode to dark mode on click
  if ($('html').attr('data-bs-theme') === 'light') {
    $('html').attr('data-bs-theme', 'dark');
    $('#theme_toggle_img').attr('src', lightThemeImgSrc);
    // toggle custom Bootsrap classes (day => night)
    $('.btn-outline-dayColor').toggleClass(
      'btn-outline-dayColor btn-outline-nightColor'
    );
    $('.text-dayColor').toggleClass('text-dayColor text-nightColor');
    $('.border-dayColor').toggleClass('border-dayColor border-nightColor');
    $('.btn-dayColor').toggleClass('btn-dayColor btn-nightColor');
    $('.btn-outline-dark').toggleClass('btn-outline-dark btn-outline-light');
    $('#amountInput').toggleClass('lightPlaceholder darkPlaceholder');
    // change color of symbols svg background
    $('g').attr('fill', '#000000');
    // select all elements in the DOM that have the attribute data-bs-toggle="tooltip"
    const tooltipElement = $('[data-bs-toggle="tooltip"]');
    // retrieves the Bootstrap tooltip instance associated with a specific DOM element
    const tooltipInstance = bootstrap.Tooltip.getInstance(tooltipElement);
    /* destroy tooltip instance, remove any stored data and event handlers related to the 
    tooltip (necessary to reinitialize the tooltip with new configuration options) */
    tooltipInstance.dispose();
    // reinitialize tooltip using the option 'customClass' to apply 'custom-tooltip-light'
    $('[data-bs-toggle="tooltip"]').tooltip({
      customClass: 'custom-tooltip-dark',
    });
    return;
  }
});

// if the amount to convert is less than or equal to zero, alert user
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

// check if all user inputs are valid (leftInput last to be changed)
$('#leftInput').on('input', () => {
  leftInputValid = true;
  if (inputAmountValid && leftInputValid && rightInputValid) {
    $('#submitButton').prop('disabled', false);
  }
});

// check if all user inputs are valid (rightInput last to be changed)
$('#rightInput').on('input', () => {
  rightInputValid = true;
  if (inputAmountValid && leftInputValid && rightInputValid) {
    $('#submitButton').prop('disabled', false);
  }
});

// check if all user inputs are valid (amountInput last to be changed)
$('#amountInput').on('input', () => {
  if (Number($('#amountInput').val()) > 0) {
    inputAmountValid = true;
  } else {
    inputAmountValid = false;
    $('#submitButton').prop('disabled', true);
  }
  if (
    leftInputValid &&
    rightInputValid &&
    Number($('#amountInput').val()) > 0
  ) {
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

// prevent form submission if currencies selected are the same
$('#submit_conversion').on('submit', (event) => {
  if ($('#leftInput').val() === $('#rightInput').val()) {
    alert('Currencies may not be the same');
    event.preventDefault();
    return;
  }
});
