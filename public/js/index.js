const taxSwitch = document.getElementById("flexSwitchCheckDefault");
    taxSwitch.addEventListener("change", function(){
      const state = taxSwitch.checked;
      localStorage.setItem("toggleState", state);
        const withTax = document.getElementsByClassName("with-tax");
        const basePrice = document.getElementsByClassName("base-price");
        localStorage.getItem("toggleSwitch", state);
        for (let ele of basePrice) {
          ele.style.display = state ? "none" : "inline";
        }
        for (let ele of withTax) {
          ele.style.display = state ? "inline" : "none";
        }
    })

    // for loop bcz there are multiple listings and each listings need to show 
    // if only 1 element we can directly call using id and set style
    // and getElementByClassName return HTMLCollection => multiple objects

    window.onload = () => {
      const storedState = localStorage.getItem("toggleState");

      if(storedState === "true"){
        document.getElementById("flexSwitchCheckDefault").checked = true;
      }
    };