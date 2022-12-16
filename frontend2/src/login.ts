import axios from "axios"

// tsc --watch
const loginForm = document.getElementById("login-form") as HTMLFormElement | null


loginForm?.addEventListener("submit", (e) => {
  e.preventDefault()

  const usernameInput = document.getElementById(
    "username"
  ) as HTMLFormElement | null
  const passwordInput = document.getElementById(
    "password"
  ) as HTMLFormElement | null

  if (usernameInput == null || passwordInput == null) return

  const username: string = usernameInput.value
  const password: string = passwordInput.value

  axios
    .post(
      "http://localhost:5000/api/login",
      {
        username,
        password
      },
      {
        headers: {
          "content-type": "application/json"
        }
      }
    )
    .then(function (response) {
      // console.log(response)
      if (response.data.token) {
        localStorage.setItem("token", response.data.token)
      }
      location.reload()
    })
    .catch(function (error) {
      alert(error)
    })
})
