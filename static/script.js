const btnAddPost = document.querySelector('.add-post__btn');
const formAddPost = document.querySelector('#add-post');

if (btnAddPost) {
  btnAddPost.addEventListener('click', async (e) => {
    e.preventDefault();
    const url = `/posts/add`;

    const body = {
      title: formAddPost.title.value,
      description: formAddPost.description.value,
    };

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        location.assign('/user-post/' + data.post_id);
      })
      .catch((err) => console.error(err));
  });
}
