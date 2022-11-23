const mainImg = document.getElementsByClassName("mainBackImg");
const mainText = document.getElementsByClassName("mainText_b");
const nextBtn = document.getElementsByClassName("nextBtn")[0];
let n = 0;

setInterval(() => {
    if (n < 3) {
        if (n > 0) {
            mainImg[n - 1].style.opacity = 0;
        } else {
            mainImg[3].style.opacity = 0;
        }
        mainImg[n].style.opacity = 1;
        n++;
    } else {
        mainImg[n - 1].style.opacity = 0;
        mainImg[n].style.opacity = 1;
        n = 0;
    }
}, 3000);

// window.addEventListener("mousemove", (e) => {
//     for (let i = 0; i < 4; i++) {
//         mainText[i].style.left = `${e.x / 5 + i * 5}px`;
//     }
// });
