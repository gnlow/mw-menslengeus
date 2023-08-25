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
        y: number,
        shape: Shape
    ) =>
    ""
    +`{{#ifeq: {{#expr: floor( {{{1|1}}} / 2^${n} ) mod 2 }} | 1 <!--\n-->`
    +`    | <div style="margin: ${80*y-100}px 0 0 ${80*x}px;">`
        +`[[그림:menslengeus-${shapeToNum(shape)}.svg|alt=${shape.replace("|", "{{!}}")}]]`
        +`</div> <!--\n-->`
    +`}}`

const units =
    (as: [x: number, y: number, shape: Shape][]) =>
    as  .map(([x, y, shape], n, l) =>
            unit(n, x, y-(l[n-1]?.[1] || 0), shape)
        )
        .join("<!--\n-->")

const result =
`<onlyinclude>
<div style="width: 100px; height: 100px;"> </div><!--
-->${units([
    [0, 0, "-"],
    [1, 0, "-"],
    [0, 0, "|"],
    [0, 0, "\\"],
    [0, 0, "/"],
    [1, 0, "|"],
    [1, 0, "\\"],
    [1, 0, "/"],
    [2, 0, "|"],
    [0, 1, "-"],
    [1, 1, "-"],
    [0, 1, "|"],
    [0, 1, "\\"],
    [0, 1, "/"],
    [1, 1, "|"],
    [1, 1, "\\"],
    [1, 1, "/"],
    [2, 1, "|"],
    [0, 2, "-"],
    [1, 2, "-"],
])}
</onlyinclude>

---
{{:연습장:Gnlow/Expr|3}}
`

await Deno.writeTextFile("main.mw", result)