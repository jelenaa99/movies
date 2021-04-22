const searchIcon = document.querySelector('.icon');

searchIcon.addEventListener('click', () => {
    document.querySelector('.search-input').classList.toggle('active');
});