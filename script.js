let usersData = [];
let postsData = [];
let commentsData = [];


const defaultAvatar = "https://randomuser.me/api/portraits/men/"; 

async function fetchData() {
    try {
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments');

        usersData = await usersResponse.json();
        postsData = await postsResponse.json();
        commentsData = await commentsResponse.json();

        usersData = usersData.map((user, index) => ({
            ...user,
            avatar: `${defaultAvatar}${index + 1}.jpg`
        }));
    } catch (error) {
        console.error('Ma\'lumotlarni olishda xatolik:', error);
    }
}

function renderUsers() {
    const dataDisplay = document.getElementById('dataDisplay');
    dataDisplay.innerHTML = '<h2>Users</h2>' + '<div class="dataDisplay">' + usersData.map(user => `
        <div class="user">
            <img src="${user.avatar}" alt="${user.name}'s Avatar">
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <p>Website: <a href="http://${user.website}" target="_blank">${user.website}</a></p>
        </div>
    `).join('') + '</div>';
}

function renderPosts() {
    const dataDisplay = document.getElementById('dataDisplay');
    dataDisplay.innerHTML = '<h2>Posts</h2>' + '<div class="dataDisplay">' + postsData.map(post => `
        <div class="post">
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        </div>
    `).slice(0, 10).join('') + '</div>';
}

function renderComments() {
    const dataDisplay = document.getElementById('dataDisplay');
    dataDisplay.innerHTML = '<h2>Comments</h2>' + '<div class="dataDisplay">' + commentsData.map(comment => `
        <div class="comment">
            <p><strong>${comment.name}</strong> (${comment.email})</p>
            <p>${comment.body}</p>
        </div>
    `).slice(0, 10).join('') + '</div>'; 
}

document.getElementById('usersBtn').addEventListener('click', renderUsers);
document.getElementById('postsBtn').addEventListener('click', renderPosts);
document.getElementById('commentsBtn').addEventListener('click', renderComments);

fetchData(); 

