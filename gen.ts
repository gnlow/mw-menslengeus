type Shape = "-" | "|" | "\\" | "/"

const prop = {
    n: "{{{1|1}}}",
    size: "{{{size|8}}}",
}

const mul = (...xs: (string | number)[]) => `{{#expr: ${xs.join(" * ")} }}`

const shapeToNum = (shape: Shape) => ({
    "-": "1",
    "|": "4",
    "\\": "8",
    "/": "16",
}[shape])

const unit =
    (
        n: number,
        x: number,
        y: number,
        shape: Shape
    ) =>
    ""
    +`{{#ifeq: {{#expr: floor( ${prop.n} / 2^${n} ) mod 2 }} | 1 <!--\n-->`
    +`    | <div style="\n`
    +`          position: absolute;\n`
    +`          left: ${mul(0.8, prop.size, x)}px;\n`
    +`          top: ${mul(0.8, prop.size, y)}px;\n`
    +`          width: ${prop.size}px;\n`
    +`          height: ${prop.size}px;\n`
    +`         ">`
        +`[[그림:menslengeus-${shapeToNum(shape)}.svg|alt=${shape.replace("|", "{{!}}")}|${prop.size}px]]`
        +`</div> <!--\n-->`
    +`}}`

const units =
    (as: ([x: number, shape: Shape] | "\n")[]) => {
        let n = 0
        let y = 0
        return as
            .map(a => {
                if (a == "\n") {
                    y++
                } else {
                    const [x, shape] = a
                    return unit(n++, x, y, shape)
                }
            })
            .join("<!--\n-->")
    }
const result =
`<onlyinclude><div style="
    margin: 0 -${mul(0.8, prop.size)}px -${mul(0.8, prop.size)}px 0;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    width: ${mul(2.6, prop.size)}px;
    height: ${mul(2.6, prop.size)}px;
">${units([
    [0, "-"],
    [1, "-"],
    [0, "|"],
    [0, "\\"],
    [0, "/"],
    [1, "|"],
    [1, "\\"],
    [1, "/"],
    [2, "|"],
    "\n",
    [0, "-"],
    [1, "-"],
    [0, "|"],
    [0, "\\"],
    [0, "/"],
    [1, "|"],
    [1, "\\"],
    [1, "/"],
    [2, "|"],
    "\n",
    [0, "-"],
    [1, "-"],
])}</div></div></onlyinclude>

이 틀은 [https://github.com/gnlow/mw-menslengeus/blob/main/gen.ts 스크립트]를 이용해 생성되었습니다.<br>
size는 px단위이며, 기본값은 100입니다.
{{코드 보여주기||<nowiki>Hello,{{
:연습장:Gnlow/Expr|364896|size=8}}{{
:연습장:Gnlow/Expr|364896|size=12}}{{
:연습장:Gnlow/Expr|364896|size=16}}{{
:연습장:Gnlow/Expr|364896|size=20}}{{
:연습장:Gnlow/Expr|364896|size=24}}{{
:연습장:Gnlow/Expr|364896|size=28}}{{
:연습장:Gnlow/Expr|364896|size=32}}{{
:연습장:Gnlow/Expr|364896|size=36}}World!</nowiki>}}
{{코드 보여주기||<nowiki>abc{{:연습장:Gnlow/Expr|1048575|size=50}}def</nowiki>}}
`

await Deno.writeTextFile("main.mw", result)