const createDiv = (index) => {
    const box = document.querySelector("#box-container");

    if (box.childElementCount >= index) {
        return;
    }

    const div = document.createElement("div");
    div.setAttribute("class", "white-background display-box");
    div.setAttribute("id", `box-${index}`);

    div.innerHTML = `
    <svg viewBox="0 0 1280 720">
        <foreignObject width="1280" height="720">
            <div class="inner-div"></div>
        </foreignObject>
    </svg>`;

    box.appendChild(div);
};

const getBoxContainer = (index) => {
    return document.querySelector(`#box-${index}`).children[0].children[0]
        .children[0];
};

const setBox = () => {
    const box = document.querySelector("#box-container");
    const size = box.childElementCount;

    for (let i = size; i > 1; i--) {
        box.removeChild(box.childNodes[i]);
    }
};

export const renderer = (tokens) => {
    setBox(tokens);
    let index = 1;
    let boxContainer = getBoxContainer(index);
    boxContainer.innerHTML = "";
    let htmlTag = "";
    tokens.map((data) => {
        if (data.tag === "<hr/>") {
            index++;
            createDiv(index);
            boxContainer = getBoxContainer(index);
            boxContainer.innerHTML = "";
        } else {
            htmlTag += data.tag;
        }
    });
    boxContainer.innerHTML = htmlTag;
};
