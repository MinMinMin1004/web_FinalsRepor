// 添加样式
const style = document.createElement('style');
style.textContent = `
.img-magnifier-container {
    position: relative;
    display: inline-block;
}

.img-magnifier-glass {
    position: absolute;
    border: 3px solid #000;
    border-radius: 50%;
    cursor: none;
    width: 100px;
    height: 100px;
    display: none;
}
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach((img, index) => {
        // 为每个图片创建容器
        const container = document.createElement('div');
        container.className = 'img-magnifier-container';
        img.parentElement.insertBefore(container, img);
        container.appendChild(img);
        
        // 设置唯一ID
        img.id = `magnify-img-${index}`;
        
        // 应用放大镜效果
        magnify(img.id, 3);
    });
});

function magnify(imgID, zoom) {
    let img = document.getElementById(imgID);
    let glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");
    img.parentElement.insertBefore(glass, img);

    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";

    let w = glass.offsetWidth / 2;
    let h = glass.offsetHeight / 2;
    let bw = 3;

    function moveMagnifier(e) {
        let pos = getCursorPos(e);
        let x = pos.x;
        let y = pos.y;
        
        if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
        if (x < w / zoom) {x = w / zoom;}
        if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
        if (y < h / zoom) {y = h / zoom;}
        
        glass.style.left = (x - w) + "px";
        glass.style.top = (y - h) + "px";
        glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }

    function getCursorPos(e) {
        let a = img.getBoundingClientRect();
        let x = e.pageX - a.left - window.pageXOffset;
        let y = e.pageY - a.top - window.pageYOffset;
        return {x : x, y : y};
    }

    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mouseenter", () => glass.style.display = "block");
    img.addEventListener("mouseleave", () => glass.style.display = "none");
}