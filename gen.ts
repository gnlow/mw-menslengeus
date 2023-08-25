type Shape = "-" | "|" | "\\" | "/"

const prop = {
    n: "{{{1|1}}}",
    size: "{{{size|100}}}",
    gap: "{{#expr: {{{size|100}}} * 0.8 }}"
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
        shape: Shape
    ) =>
    ""
    +`{{#ifeq: {{#expr: floor( ${prop.n} / 2^${n} ) mod 2 }} | 1 <!--\n-->`
    +`    | <div style="margin: -${prop.size}px 0 0 ${mul(0.8, prop.size, x)}px;">`
        +`[[그림:menslengeus-${shapeToNum(shape)}.svg|alt=${shape.replace("|", "{{!}}")}]|${prop.size}px]]`
        +`</div> <!--\n-->`
    +`}}`

const units =
    (as: ([x: number, shape: Shape] | "\n")[]) => {
        let n = 0
        return as
            .map(a => {
                if (a == "\n") {
                    return `<div style="width: ${prop.size}px; height: ${prop.size}px; margin: -${mul(0.2, prop.size)}px 0 0 0;"> </div>`
                } else {
                    const [x, shape] = a
                    return unit(n++, x, shape)
                }
            })
            .join("<!--\n-->")
    }
const result =
`<onlyinclude>
<div style="margin: 0 -${mul(0.8, prop.size)}px -${mul(0.8, prop.size)}px 0;">
<div style="width: ${prop.size}px; height: ${prop.size}px;"> </div><!--
-->${units([
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
])}
</div>
</onlyinclude>

이 틀은 [https://github.com/gnlow/mw-menslengeus/blob/main/gen.ts 스크립트]를 이용해 생성되었습니다.<br>
size는 px단위이며, 기본값은 100입니다.
{{코드 보여주기||<nowiki>{{:연습장:Gnlow/Expr|364896}}</nowiki>}}
{{코드 보여주기||<nowiki>{{:연습장:Gnlow/Expr|1048575|size=50}}</nowiki>}}
`

await Deno.writeTextFile("main.mw", result)