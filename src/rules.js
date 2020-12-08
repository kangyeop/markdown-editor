export const Paragraph = {
    name: "Paragraph",
    rule: /(.*)/,
    parse: (line) => line.replace(Paragraph.rule, "<p>$1</p>"),
};

const Heading = {
    name: "Heading",
    rule: /^(#{1,6})\s(.*)/,
    parse: (line) => {
        const [heading] = line.split(/\s/);
        return line.replace(
            Heading.rule,
            `<h${heading.length}>$2</h${heading.length}>`
        );
    },
};

const Hr = {
    name: "Hr",
    rule: /^---$/,
    parse: (line) => line.replace(Hr.rule, "<hr/>"),
};

const Blockquote = {
    name: "Blockquote",
    rule: /^>\s(.*)/,
    parse: (line) =>
        line.replace(Blockquote.rule, "<blockquote>$1</blockquote>"),
};

const OrderedList = {
    name: "OrderedList",
    rule: /^\d+\.\s(.*)/,
    parse: (line) => line.replace(OrderedList.rule, "<li>$1</li>"),
};

const UnorderedList = {
    name: "UnorderedList",
    rule: /^[*-]\s(.*)/,
    parse: (line) => line.replace(UnorderedList.rule, "<li>$1</li>"),
};

const Strong = {
    name: "Strong",
    rule: /(\*\*|__)(.+)\1/,
    parse: (line) => line.replace(Strong.rule, "<strong>$2</strong>"),
};

const Em = {
    name: "Em",
    rule: /([*_])(.+)\1/,
    parse: (line) => line.replace(Em.rule, "<em>$2</em>"),
};

const Strike = {
    name: "Strike",
    rule: /(~~)(.+)\1/,
    parse: (line) => line.replace(Strike.rule, "<strike>$2</strike>"),
};

const Link = {
    name: "Link",
    rule: /\[(.*)\]\((.*)\)/,
    parse: (line) => line.replace(Link.rule, '<a href="$2">$1</a>'),
};

const Img = {
    name: "Link",
    rule: /!\[(.*)\]\((.*)\)/,
    parse: (line) => line.replace(Img.rule, '<img src="$2" alt="$1" />'),
};

export const rulesBlock = [UnorderedList, OrderedList, Hr, Heading, Blockquote];

export const rulesInline = [Strong, Em, Strike, Img, Link];
