function validate() {
  if (document.getElementById("flexSwitchCheckDefault").checked) {
    document.getElementById("dark").disabled = false
  } else {
    document.getElementById("dark").disabled = true
  }
}
