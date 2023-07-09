
const baseUrl = 'https://jsonplaceholder.typicode.com';

const submitBtn = document.getElementById('submit');
const postIdInput = document.getElementById('post-id');
const postContainer = document.getElementById('post-container');
const commentsContainer = document.getElementById('comments-container');

submitBtn.addEventListener('click',() => {
    const postId =  postIdInput.value;

    if (postId < 1 || postId > 100) {
        alert('Please enter a valid post ID between 1 and 100');
    return;
    }

    getPostById(postId)
    .then((post) => {
        displayPost(post);
        const commentsBtn = document.getElementById('comments-button');
        commentsBtn.addEventListener('click', () => {
            getCommentsByPostId(postId)
            .then((comments) => {
                 displayComments(comments);
            })
            .catch((error) => {
                console.log('Error:', error);
                commentsContainer.textContent = 'Failed to load comments.';
            });
         })
      })
    .catch((error) => {
        console.log('Error:', error);
        postContainer.textContent = 'Failed to load post.';
        commentsContainer.textContent = '';
    })  
})

function getPostById(postId) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            throw new Error(`Failed to fetch post: ${error.message}`);
        });
}

function getCommentsByPostId(postId) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            throw new Error(`Failed to fetch comments: ${error.message}`);
        });
}

function displayPost(post) {
    postContainer.textContent = '';

    const postTitle = document.createElement('h2');
    postTitle.textContent = post.title;
    postContainer.appendChild(postTitle);

    const postBody = document.createElement('p');
    postBody.textContent = post.body;
    postContainer.appendChild(postBody);

    const commentsBtn = document.createElement('button');
    commentsBtn.textContent = 'Load Comments';
    commentsBtn.id = 'comments-button';
    postContainer.appendChild(commentsBtn);
}

function displayComments(comments) {
    commentsContainer.textContent = '';

    comments.forEach((comment) => {
        const commentDiv = document.createElement('div');

        const commentName = document.createElement('h3');
        commentName.textContent = comment.name;
        commentDiv.appendChild(commentName);

        const commentBody = document.createElement('p');
        commentBody.textContent = comment.body;
        commentDiv.appendChild(commentBody);

        commentsContainer.appendChild(commentDiv);
    })
}
