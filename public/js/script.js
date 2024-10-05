(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

const taxSwitch = document.getElementById("flexSwitchCheckDefault");
    taxSwitch.addEventListener("change", function(){
        const withTax = document.getElementsByClassName("with-tax");
        const basePrice = document.getElementsByClassName("base-price");
        for (let ele of basePrice) {
          ele.style.display = this.checked ? "none" : "inline";
        }
        for (let ele of withTax) {
          ele.style.display = this.checked ? "inline" : "none";
        }
    })