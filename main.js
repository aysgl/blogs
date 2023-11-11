const boxes = document.querySelector(".boxes")
const proggress = document.querySelector(".progress");
const content = document.querySelector(".typewritter")
const moon = document.querySelector(".moon")
const sun = document.querySelector(".sun")
const text = content.innerText;
let idx = 0;

window.addEventListener("scroll", () => {
    const triggerButton = (window.innerHeight / 5) * 4
    const allBoxes = document.querySelectorAll('.box');

    allBoxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;
        if (boxTop < triggerButton) {
            box.classList.add("show");
        } else {
            box.classList.remove("show");
        }
    });
    proggressBar()
})

const getBlogs = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                let html = "";
                html = `
                <div class="box">
                    <div><img src=https://picsum.photos/1200/400?random=${item.id}"" alt="${item.title}"/></div>
                    <div class="box-title">${item.title}</div>
                    <div class="box-body">${item.body}</div>
                </div>
                `
                boxes.innerHTML += html
            });

        })
}

getBlogs()

const proggressBar = () => {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    proggress.style.width = scrolled + "%";
}

const writeText = () => {
    content.innerText = text.slice(0, idx);
    idx++;
    if (idx > text.length) {
        setTimeout(writeText, 500);
    } else {
        setTimeout(writeText, 100);
    }

};

writeText();

moon.addEventListener("click", () => {
    document.body.classList.add("dark-theme")
    moon.style.display = "none"
    sun.style.display = "block"
})

sun.addEventListener("click", () => {
    document.body.classList.remove("dark-theme")
    sun.style.display = "none"
    moon.style.display = "block"
})