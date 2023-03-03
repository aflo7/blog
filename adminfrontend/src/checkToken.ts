import axios from "axios"

function deletePost(_id: string) {
  const token: string | null = localStorage.getItem("token")

  if (_id == null) return
  if (token == null) return

  axios
    .delete(
      `http://localhost:5000/api/posts/${_id}`,

      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then((res) => {
      console.log(res)
      location.reload()
    })
    .catch((err) => {
      alert(err)
    })
}

function displayPosts(data: any) {
  const post_wrapper = document.getElementById("post_wrapper")
  if (post_wrapper == null) return

  const api_posts = data.posts
  let html_to_display = ""
  if (api_posts == null) {
    html_to_display = "<div>There are no posts</div>"
  } else {
    api_posts.forEach((post: any) => {
      let elem = document.createElement("div")
      elem.classList.add("individual_post_wrapper")
      html_to_display += `<div>${post.content}</div><div>Written by: ${post.poster}</div>`
      if (post.comments) {
        html_to_display += `<div class="comment_wrapper">`
        post.comments.forEach(
          (comment: any) =>
            (html_to_display += `<div class="individual_comment">
                                  <div>${comment.content}</div>
                                  <div> - ${comment.author}</div>
                                </div>`)
        )
      }

      elem.innerHTML = html_to_display
      let deleteBtn = document.createElement("button")
      deleteBtn.classList.add("delete")

      deleteBtn.innerHTML = `
      Delete Post
      `
      deleteBtn.addEventListener("click", function () {
        deletePost(`${post._id}`)
      })
      elem.appendChild(deleteBtn)

      html_to_display = ""

      post_wrapper.appendChild(elem)
    })
  }
}

function checkForToken(): void {
  const token: string | null = localStorage.getItem("token")
  if (token != null) {
    // render the screen to allow write, edit, and publish
    const postDiv = document.getElementById("post_wrapper")
    if (postDiv == null) return

    axios
      .post(
        "http://localhost:5000/api/posts/all",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((res) => {
        // successfully retrieved posts
        displayPosts(res.data)
        const login_wrapper = document.getElementById("login")

        if (login_wrapper == null) return
        login_wrapper.style.display = "none"

        const new_post_btn = document.getElementById("new_post_btn")
        if (new_post_btn == null) return
        new_post_btn.style.display = "block"
      })
      .catch((err) => {
        // token invalid!
        const new_post_btn = document.getElementById("new_post_btn")
        if (new_post_btn == null) return
        new_post_btn.style.display = "none"

        localStorage.removeItem("token")
        location.reload()
      })
  }
}

const toggleNewPostForm = () => {
  const create_post = document.getElementById("create_post")
  if (create_post == null) return

  if (create_post.innerText != "") {
    create_post.innerHTML = ""
  } else {
    create_post.innerHTML = `<form id="create_post_form">
   
    <label for="name">Name</label>
    <input type="text" name="poster" id="name" required />

    <label for="content">Content</label>
    <input type="text" name="content" id="content" required />

    <input type="submit" value="Create" />
  </form>`
    const token: string | null = localStorage.getItem("token")
    if (token == null) return

    const new_post_form = document.getElementById("create_post_form")
    if (new_post_form == null) return

    new_post_form.addEventListener("submit", (e) => {
      e.preventDefault()

      const nameInput = document.getElementById(
        "name"
      ) as HTMLFormElement | null
      const contentInput = document.getElementById(
        "content"
      ) as HTMLFormElement | null

      if (nameInput == null || contentInput == null) return

      const poster: string = nameInput.value
      const content: string = contentInput.value

      axios
        .post(
          "http://localhost:5000/api/posts",
          {
            poster,
            content
          },
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(function (response) {
          // console.log(response)
          location.reload()
        })
        .catch(function (error) {
          alert(error)
        })
    })
  }
}

const addEventListener = () => {
  const new_post_btn = document.getElementById("new_post_btn")
  if (new_post_btn == null) return

  new_post_btn.addEventListener("click", function () {
    toggleNewPostForm()
  })
}

window.addEventListener("load", function () {
  checkForToken()
  addEventListener()
})
