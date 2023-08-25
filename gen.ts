type Shape = "-" | "|" | "\\" | "/"

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
    +`{{#ifeq: {{#expr: floor( {{{1|1}}} / 2^${n} ) mod 2 }} | 1 <!--\n-->`
    +`    | <div style="margin: -100px 0 0 ${80*x}px;">`
        +`[[그림:menslengeus-${shapeToNum(shape)}.svg|alt=${shape.replace("|", "{{!}}")}]]`
        +`</div> <!--\n-->`
    +`}}`

const units =
    (start: number, as: [x: number, shape: Shape][]) =>
    as  .map(([x, shape], n) =>
            unit(start+n, x, shape)
        )
        .join("<!--\n-->")

const result =
`<onlyinclude>
<div style="width: 100px; height: 100px;"> </div><!--
-->${units(0,[
    [0, "-"],
    [1, "-"],
    [0, "|"],
    [0, "\\"],
    [0, "/"],
    [1, "|"],
    [1, "\\"],
    [1, "/"],
    [2, "|"],
])}<div style="width: 100px; height: 100px; margin: -20px 0 0 0;"> </div><!--
-->${units(9,[
    [0, "-"],
    [1, "-"],
    [0, "|"],
    [0, "\\"],
    [0, "/"],
    [1, "|"],
    [1, "\\"],
    [1, "/"],
    [2, "|"],
])}<div style="width: 100px; height: 100px; margin: -20px 0 0 0;"> </div><!--
-->${units(18,[
    [0, "-"],
    [1, "-"],
])}
</onlyinclude>

---
{{코드 보여주기||<nowiki>{{:연습장:Gnlow/Expr|364896}}</nowiki>}}
{{코드 보여주기||<nowiki>{{:연습장:Gnlow/Expr|1048575}}</nowiki>}}
`

await Deno.writeTextFile("main.mw", result)