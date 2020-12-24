const createRenderBox = (index, htmlTag) => {
    const divTag = `
    <div class="white-background display-box" id="render-box-${index}">
        <svg viewBox="0 0 1280 720">
            <foreignObject width="1280" height="720">
                <div class="inner-div" id="inner-box-${index}">
                    ${htmlTag}
                </div>
            </foreignObject>
        </svg>
    </div>`;

    return divTag;
};

export const renderer = (tokens) => {
    let count = 1;

    let htmlTag = "";
    let boxInnerTag = "";

    tokens.forEach((data) => {
        if (data.tag === "<hr/>") {
            count++;

            const divTag = createRenderBox(count, htmlTag);
            boxInnerTag += divTag;
            htmlTag = "";
        } else {
            htmlTag += data.tag;
        }
    });
    boxInnerTag += createRenderBox(count, htmlTag);
    const box = document.querySelector("#render-box-container");
    box.innerHTML = boxInnerTag;
};
