const mainImg0 = document.getElementsByClassName("backImg0")[0];
const mainImg1 = document.getElementsByClassName("backImg1")[0];
const mainImg2 = document.getElementsByClassName("backImg2")[0];
const mainImg3 = document.getElementsByClassName("backImg3")[0];
let n = 0;

setInterval(() => {
    if (n < 3) {
        if (n > 0) {
            eval("mainImg" + (n - 1) + ".style.opacity = 0;");
        } else {
            mainImg3.style.opacity = 0;
        }
        eval("mainImg" + n + ".style.opacity = 1;");
        n++;
    } else {
        eval("mainImg" + (n - 1) + ".style.opacity = 0;");
        eval("mainImg" + n + ".style.opacity = 1;");
        n = 0;
    }
}, 3000);
