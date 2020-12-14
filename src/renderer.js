const createRenderBox = (index) => {
    const box = document.querySelector("#render-box-container");

    if (box.childElementCount >= index) {
        return;
    }

    const div = document.createElement("div");
    div.setAttribute("class", "white-background display-box");
    div.setAttribute("id", `render-box-${index}`);

    div.innerHTML = `
    <svg viewBox="0 0 1280 720">
        <foreignObject width="1280" height="720">
            <div class="inner-div" id="inner-box-${index}"></div>
        </foreignObject>
    </svg>`;

    box.appendChild(div);
};

const getInnerBox = (index) => {
    return document.querySelector(`#inner-box-${index}`);
};

const setBox = () => {
    const box = document.querySelector("#render-box-container");
    const size = box.childElementCount;

    for (let i = size; i > 1; i--) {
        box.removeChild(box.childNodes[i]);
    }
};

export const renderer = (tokens) => {
    setBox();
    let index = 1;

    let innerBox = getInnerBox(index);
    innerBox.innerHTML = "";

    let htmlTag = "";

    tokens.forEach((data) => {
        if (data.tag === "<hr/>") {
            index++;

            innerBox.innerHTML = htmlTag;
            htmlTag = "";

            createRenderBox(index);
            innerBox = getInnerBox(index);
            innerBox.innerHTML = "";
        } else {
            htmlTag += data.tag;
        }
    });
    innerBox.innerHTML = htmlTag;
};
