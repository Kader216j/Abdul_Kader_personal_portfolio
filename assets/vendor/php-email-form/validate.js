 (function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      let thisForm = this;
      let loading = thisForm.querySelector('.loading');
      let errorMsg = thisForm.querySelector('.error-message');
      let successMsg = thisForm.querySelector('.sent-message');

      // Show loading, hide old messages
      loading.classList.add('d-block');
      errorMsg.classList.remove('d-block');
      successMsg.classList.remove('d-block');

      let formData = new FormData(thisForm);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          loading.classList.remove('d-block');
          if (data.success) {
            successMsg.classList.add('d-block');
            thisForm.reset();

            // Hide success message after 10 seconds
            setTimeout(() => {
              successMsg.classList.remove('d-block');
            }, 5000);
          } else {
            throw new Error(data.message || "Form submission failed!");
          }
        })
        .catch(error => {
          displayError(thisForm, error.message);
        });
    });
  });

  function displayError(thisForm, error) {
    let loading = thisForm.querySelector('.loading');
    let errorMsg = thisForm.querySelector('.error-message');

    loading.classList.remove('d-block');
    errorMsg.innerText = error;
    errorMsg.classList.add('d-block');
  }
})();

