const testCaseInput = `v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>`;

const puzzleInput = `vv.vv...v>>>.v.>vv.>v>..>.....>.v>.>......v.>vvv.v.>.v.v>>>..v...>.v>.vv>..v>.>.>...>.v.v.>>>v>.>>>>........>..v>v.>v>>.....>.vv.>v..>....v
.>>v>vv.>v..>>vv.....>....v>>.vv>.>.v.>>v.v>.vvvvv.>.>>>>v.v...>.vv.vvvvv.>vv..>.v>..>..>>...vv....>>.v.>v>>v..v.>....vv....>.v.....>.v>>..
>..vvv...v>v>....v.>>v.......>v.....v.v....v.....vv.>>>.vv..>..>v....v...>.vv..>.v>>..>...v..v.....>..v>>....>v>v..v...v>......>..vv...>..>
.>.>.>..v>...>>vvv..v..>...>.v.v.vv>>vv..v.v..>..>vv>v....vv.v.v..>v.>..v.>>..v...v..v>v....vvv.>>.>.v.>vv>v.>vvv.>v>>...v>v..>.>.>...v.>>>
..>v.v..vv>.>v>..v.>>>>vvv..>.vv.v.v>>..>>>v>.>>>v.>>..vv.v...>>..v..v>v..>>vv..>v>>>v.v...>>.>.v.>.vv.>vv.>>.v>v.>v...v.v.>vv..>>....v>..v
v.>vv.>>..v>v..>v.v..>.>..vv.v.>...>>.>v..v..>>v.>v..vv>v.>v.>..vv....v>v..>>>....v>...>>..v.>.v>.v.v.>>..>..>...vv>..vv...v.>v.>.>.v..v.vv
>v..v.>v>>>..>v...>>..>....v.>....v.vv>..>v>.>>.>.....>>.vv>...>vv.v.>>v..v...>...vv...v>..v>>.>>.>..v.>....>.vv.v>.>.>..v..>v>v>>v.>>...>v
.vv.>v>>....>>..>v..v.v>...>v>.v..v.>.>>....>...>..vv.>>v>>v...v>.>.>.v.v...>...v>.v>>.>...>.v>...v....>..>v.>.v.>>..>vv>.v>..v.v.v..>>.>>.
v.v......v.>>.>.>vv>..v..>v........>..v.>>>>v>>>>.>v..>>.v>v>.v..v..vv..>..v...v.>v..vv........v..>v.>..v..v....>.v>v..>v.>.>>....v>..v>.vv
>v..v......>...>>..>.v..v>..v.>..>v....vv...v.v.>.>v.>...>>.v...>.>........>....>.>>..>....v..>..>v>...vv.v...>>.>v>>vvv.v>.>>....v...v....
v>.v>>>v>>>...>>>>.>..v>vv>v>.v>>.....>....>.....v.v>v>v....>>>v>v..v.....vv..v.v.>...>>>vv..>.vv.....v..>v.vv.v..vvvv.v>.>..v>>>>v>v>..>v.
>.>.>vv..>.>.v>>.v...>>v..v.v>...vv....v>.>.>.....vv>>vv>>v....vv...v.vv.v....>>.>v>>vv..>>..v...>..>.v>...v...v.>>.>v.>v..>v....v>.v>..v>.
>.vv.>.v>.>..>v>..vv>.>vv>.>..>v>v.>>vvvv...>..>..v>...>vv>vv.v.>.....>..v>.v>vv.v.>.>>.v.v.v>.>>..>vv..v.>...vv>>>v.......v.>..v.v..>.v.>v
....>.v>v..v.v.vv.v...>>v>.>>>...vvvv..>.....>..v..v....vvv....>..v.v.v.>...>v.>>..>v....v.....vv..v>..vv....v.>>vv.>..>vv...>>.v....>.>>..
.>..>vv.....>v>...vv>..>..>..>.>.>v.>v>.>.vv>vvv.v..v...>>>>v>..v>.>v>vv.>v.>..v>....>.v>vv.v.....v..>.v...v...>.vv.v.v.....v.>.>.>.>.v>v..
v.>vv.>vv.>v.v...>>...vv>..>v..>>....v.>>>.....vvv...vvv.....v>v..vv.v...v>...v....>.v..v..v>vv>>vv...>..v>.vv>..>>..>>.....>.>....v>.>.vv.
v.>.....vv...v>v>>v..v.>>vvvvv..vvv>v..v..>..v>..>>..v.vv>>vvv>>.>.>>v..>....vv.>v.>.v..v.>v>.v.v.......v>..vvv>.>v.>.>vvv>..v.v.>>.v>v>>>.
v>..v>>>.>>>.>v>>..v.>..v.v.>v....>v.>...>>..>..>.v..>>..vvv...>v>>vvvv..v.v....v>.>...vv.>.v.>.......v>.v.>v...>.>v>.v.vv>>.v..>v.>.v.v.v.
...>.v...v...v.vv>..>.>v..v..>v...>>v.>..v>.>...v.>.....>.>......>v.v..v..>..>>>...>.>>.>>.>.vv.>...>.vv.>.v..v.>.vvvv...>v..v.vv>>..vv>>v.
>>>>..v.>.....>..v.v>...vvv>..v.v>...>v..>>>v.....v>..v..>.v.v.>>>v..v..v>>v....vv>v...v>...>v...>.....>v..>vvv..v.....v....>.>..>..>v>v.>.
>...vv>..>>>v.v>..>.>>>.vv>>.>v>..v.v.v..v.vv.....>>vv>.>.>.v.v.>.>.>.v..>...v.v>....v>>.vv>>v.>v....v.v>.v...>.>>v...>vv..>.vv.v.vv..v>>v.
vv>v.>>v...>>>.v.v.vv>>..>.>.v....v..>.>v>...>>v>v..v.vv.v..v..>v>.>..v..vv.v..v.v.v.vv>v..vvv.vv..v...v>.>>.>....v.v..>..v>v..v..v.vvv.>..
..v.v>......>>...v..>.>v.>..>vv.....>>..v.v.>v.>.v.>vv.v..vv.>..v>v..>.>...v..v>v>..v.>>.>>>vv..>vvvvv>>vv.....>>>v>>vv..v>>v..v.v.v>>>v>v.
.>vv...>...>...v.v>.v.>v.>.v.....>>>.>v....v...v>>>v..>>v..>....>>vv.>>vv.>vvvv>.>..v........vv.>.v.>v..vvv..>..v..>v.v>.>.>.>>..>.>.>..>>.
v.>...>v>.>.vv>.v>>v..v.....>>vv.v..v.>vvv>..v......>v>...v>..v..v...>v.v>>..v..v.v..>.>>v......vv..vv.>>v>>vv...>..>.>......>.>>v.>.....v.
...vv..v...vv....>>...>.....>.v>>>>>>.vv....>.v.>.>>..>v.v.....>v....v.>....>.v.v>>.v.v..>>.>..v>>.>>v.v>...v.v..>vv.>v...>>.v.v.>.vv.vv>..
>.>.>v..v>....>.>.v>v.......vv.v.v..>.>.>...vv.>.>>vvv>..>v..vvv>..>..v>v>..v..v>>>.v.>....>v..vv.>.>.>..>>.>>v>>.vv>vv...vv.>v>.v.v>.>vvv.
>>...v..v.>..vv.v...>.>..>>v.>.....>v.v.v>.v>v......>vv>>v....v>.....v........v>.>..v......>v.>v>..>vv..>....v...vvv.>v>.>>v.vv.>..>...vvvv
..v..vvv..>..>v>.>>..>v>..v..>v...>>v.....>>.>>>v.......v..>.>.vv.v..>v>.v.....vvv..vv.v...>.v..>v...>vv..v.>v.v.>..>.>>v>.>>.>.>v>v..v.>.v
.>vv>>v>>..v>vv....>.>..v.>..v>.v..v.vv.>>vv>vvv>...v.>>.v..>v.vv.>v.>v.>v>v.vv......>..>.....v>.>.v>v.>.......v>>>......>v.>.v..v>.>v..vv.
>...v.v>...>>..vvv.>>.>v.>.vv.v.>.>.vv>.vv>.v>>.>.v...vvv.>.v..vvv.>.v.vv.v..v.>>.v>v..vv>.>..vv.v.v.>vv..v>>>vvv>...>.v..>..v>..v.>>.vv.>.
.>....v..>.>...v......vv>>.>..>>>....>>.vvv>>v>....v.>vv>..v>vvv>.vv>>....v......>.>......v.>..v..v.vv...v>.>......v.v..v.>.vv....vv>.v>.>>
.v..vv>.>>v.>>>>>>.>v.v.>..>>.v...>.....>.>....v.v>>vvvvv.>..>.>...>...>..v...v>>..>>.>.....>.v.>.>v.....>.>v......v>vv..>>..vv..v..>.v...>
v..v.v.>vvv.>.>>>>vvv.>vv..v.vv>.>vv..>.v>>.>..v....v>.>.v..>..vv.v..>>>.>..v>>>..v>..>v.v>v....>>....v......>>..>>>...>.v.v...>>...>>.vv.>
...v>.>...v.>v..>.>>>..>v....vvv>vv.vvv..>v>v.>v..>vv>...vv.>...v.>>vv...vv>v>vv>vvv.>>vv>>>.v..v.>.>...>.v>v...v>.>>.......>>.>...v..v..vv
....vv.vv....>.v..v...v...v.v.v>v.v.vvvv>..v..vvvv>>>.v.v.>vv.>v.>>..>..>>.>..>....v>...>v>v.>vv.v>>v.>.>.>.v.>....v>>v...vv.>..>>v>...v..v
>>>.v>..v>v.v.>.v.v.....vv.vvvv>v.v..>vvv>.>vv......v...>v...>>.......v>v.v...vv.>>v>>v.>.>..>...v...>....>.v.>.....>..>vv>.v.>.>..v>vvvvv.
v>v..v..>>.>v......v.v>vv...vv.v>...vv>>.v>.vv>>v>v>......>v.v.v..>>..>.>>.>.>..v>..v..>.v>v...v>.v.v.v.>.>>vv..v.v.>....>.>>......>>>>v>..
>.vv>.v.>..v.vvvvv>v>>..vv>...>v>.v..v>.v>v.v>....v.v>>>.v...v...v>.v>>>v.>.>v.v.....v>>>v.>.>..v.v..>vv>v..>..v......v.>...v.>>v...>.v..v>
v.v>>>>>..>..v.>vv.v.>..>.>>...>v.>...v.v...>v.>..vv.>...v>.>.>vv.vv...>>>.>.....>...>.>.vv.>.>..>.v>.>..>...v.vv...v.v..vv>>.>.v..v.>v.>>.
.....vv>.....v.>.v......>.v.>v..>..vv.vv>>>>>..>v.....vv.v...v>v>.>.>v>...>v..>>....>>>>v..>.v>>..>...>>v>v.vvv....v>>v...>.v....v>.....>>.
.>>...vv>....>.v>...>v..vvvvvvv.>...>.v>vv.>>...>>v.>>..vv....v...>...v>.>>.....vv.>..>..v>v.v>.vv.vvv.>v>>>.vvvv.>...>.v....v.>...>v..vvv.
.......v>>v.v..vv>>v..v......vv.v....v.v>.>>.>...v>..v.v>......>v>..>>...>>..>.v.>>....vv.v.>.>>.>....>.v>v..v>..>..>...v.vvv.>.vvv.>v...>.
.v.v...>>v>..>.>>>.v.>.>v.v.>v.>>>.>.vv.v>v.>.>.>...v>>....>..v>.....v.>............v....vv.v...v>.v>>v..vv..v>.v....>.....v..v.v>.>>>...>.
vv..>>vvvv....v..v>v.>..v>v..v.....v>....>.>vvv...>>>v>vv.v>....v>vv.v>.v>.>vv..v>>.v..vv..>v..>.>.v..>..vv>>.>vv..........vv.>v..v.v>...v.
v>.......v>v.>v..>...>>..v.v.>v......v>v.>..v>...v..>>v.>.v..v....v..v>.>...vv>v>.>v..v>v.>..>..v.v.>>v.>..v>.>>vvv...v>>v>>.v.>v>v..>.>v.>
.>>....v.v...>.vv>..>....>...>>>..>vv>v>v..>>..>v.>..v..>>.>vv.......>..>>.>v.v>v.vv>.....vvv..v>.v>..v.vv>..>..vv.>>.v>.....v.v.>v>>v>>>v.
v>vv...vv.>v>..>.v..>.v...v.>v..>vv.>>...>>>>.v..>...vv>>vv.>.vv>..v>>v>>.>>v.v..>.>.v>...>.......>>.....vvv>.v.>..>>>.........v>.v.>v.....
...>>>vv.>>.>.vv>..v.>.v>...>>>..>.....v>>..>..>..v>..v>>v..v.>.v...>.>>.>>.>>v....>..>.>.vv....>....v.v...>>>.v...v.v.>>..>>.>.>.>v>v>>>>v
.v.....vv..>.>v>...v.v.>.v..vv.>vvv..>..>v.>vvv.>>.>.v>.v>v.v..>>..>>>.v>.vv..v.v>>v>v...>..>..>..>>..vvvv...>.vv.vvv>.>.>....v..>..>>.vvv>
>vv.>v>...v.>vvv..>v>v...v.vvv.>vv.>vv..>vv.v..v.v........>..vv>..v>v>...>.>...>v..>.v>vvv...>...>.>........>.>.v.>vvv>v>....vv>v...>..>..>
>..>>..>...v...vvv.>.>.v>vv>>v>>..v>>..vvv.>vv>>v..v.......v.>.v.>v>...>>.>>.>v.v>v.v>>.vv.>>.>>v>...v.v>...vv.vvv...vv..>.v>...v>.>..>>vv>
...>>>v>..v.v>.vvv.v.>...v..>......v.>.v..>>..>>.v.>v.>...v..v.>..vv>>vv...>vv.v..vv..vv>>v.>...v>.....v.>.>v>>.v.>v>.>...>.vvv....>.......
.>v>.>....>...>>vv..v..>...v.....>v..>...v.v.vvv>.vv..>.>>>vv>v....>....>v>v..........v.>.>.>.>..>v>.vvv..v>..>.vv>.v>.>>>v>.....>.v..>v...
.vv..v..>.>..v.>.>..v>..>>v>v...v.v.vv>.>v>.>v>>v..v.v...>.v..v>>v.v>>.>....v.>..v>>....v>>.>>....v....v..>...>.>>..v>>v........>v.v.v>>.>.
....>>....>.v>v.>...v..>.vv.v.v>v>>....vv.v..v.v>.>v..>..v...>.>>>...v.>vv>.vvv.>..vvvvvv.>>v.>v....v>..vv.v...>..vv>>..v.....>>>.v.....>>.
v.v..>...v..>v...v..>v..v.vv.>vvv...vv..vv.v...v.v>.>.v.v>.>>.v>.>.>>>.>>....v.........>.....>.v>.vvv...vvv>......>.....>v..>...>..>......>
v>...vv....vv.vv.>v..>>..>..>.>....v.vvv>.>v>vv>>.....>>...v>v.>>...vv>vvv.v.>>.v.......v..>vv>.>.....vvv.v.vv..v>>v.v.vv.v>...v.v..>v..>>v
.v.>v.v>.>.vv..>.>vvv..v>>vvv...>vv>v>v>>..v>>>>>.>.v.>........>..>.vv.vvv>>v.....v.>>vv>>vv...vvv>.>.....>.v..vv>.>v..v...vvv>.v>v..v>>.v>
..v.....v>v...vv..v...v.vv>.>>>vvvv......v>.....v>v>>...v..v..v>.>v>.>..>v....v>.>..>.>.>.v...>>v>.v>...v..>>.>v..vvvv>vvv>v.>.>vvv>>>v...>
v>vvvv>.v...>>.>>.>v>.>v.>v..>>>vv>>vv.>>>.>>.v.v..v...>.vv.>.>.>>...v>>.v.>v.>>....v>.....>v..v........>>>>..>....vv.>>.>..vvv...v.v.>>..v
....v.>>v>.v.v..>v..>...v....>>.....>.v>.v>v..v.>.>>v.>.v..v..v..vv>>.vv>...vv>..>vv.>vv.>>.v>.>.>..>>>...>.>.v.v.>>.v>>.>.v.v>.vv..v.>>>>>
..>>..>..>>..>v.v>.>..v...>..vvvv....v....v.>>vv....v.v>v>....>>..>>>v.v>.v>.....v..v.>>..>.v>v>.v..>vvvv..>v....v.....v>....>.>...v.vv...>
v.v>>v......vv.vv>>..>.v.v>..>>v...>v..vvvv>.v>v>v.v.vv..v...>..vv.v>.>vv...v...v..>..v..>v..vv...vvvvv>v..>v..v....v.>>.>v>v...>.........v
..v.v.>..v>vvv.>.>>.>>v.>.>>v..vvvv>>>v>.>..v...>>..>>..v.>.>>v>....>...>.v.>.>.>>vv.>>..>>>...vv.v.v.>..>.>.vv>.>v..>vv...>..>>.v..>vvv>..
.>.v...>..v>>>>.>...v>.v.>..>...>..>vv.vvv.v.v....v..>v>>...v.v.>vv>>>.>.>.>>.vv>>..>v.v.vv...v..vv>...........v>.v>.v.v.>...v..v.vv..vv>.v
v>v....v.....v>>..>..v.....>.v.>v>.v.vvvvv..>v.vv....>.v.>.v...v....>>..v......vv.>.vv>..vvv..v.>.v.>..>v.>..vv>..vv....>.......v>>>...vv>v
........v.>...v.>>>..v.v>vv>v.>..v>.vv..>>.v>.v>v>..v>......v.>...v.>>v>...v.vv..>>..vv.>v.>.v...vv.>.>.....v....v.v.v..v>v>..>>...v>>>v>>>
.v>.v.>..>v..>v.v>..>v>..v...vv>.v.>vv>.v..v.>...>>....>>vv...>v>.v>.....v.....v>....>.v..v..v..v....>v...>.>.....v.v...>>...vv.>v.v.v...v.
....>....>>....>.>>..>v..>......>.v>.>.>>>.v.....>>.>v..vvv.v.....>.v.>.>.>>v.>v.>vv...>>vvvv>.v>.v.>v.>.v>v...vv.......>>.>.>.>vvv.>..v.>.
..v..>..v>.>..v.>>..vvv>.>v>>.v>>>>>...>>>.>>....>v.v>v.>v.>>.v>.v.>>>v>.v>v.v>vvv.vv..>v..>>v>>.....>>>.>vv..>v..>v>....v>>v.vv>..>...v...
v.>..v...v....>vv..v...>.v>....v>v.v>.v.>>.vvv.v...>.vv.>v..>v.v>....>.v.v>.>>.>.vv..v>.v..>>v...v>>..v>>..>v.>....v>>vvv>>.>..v..>..v.....
v>.vv.>...v>v.>.v...>....v.>.v.v.>.v..>>.v>>.>>vv>vvv..>.vvv>v.>.>..>..v>.>..>>..>v>.vv.>...vv.v.>>.v.>..v>.v>......>v>v.>.vvv..>>.vvvvvv.>
>vv.vv..vv..>vv..vv.>>..vv.>v..>>>vv.vvv.v.>.vv.vv......>....>.vv.v>.v.vv>.>.>>>vvvv.>vv>>.v..>>..vv..v..>v.>v...vv>>>v.v>>v..v..>>.v..>v..
.>v..>.>.v.v>>>>.v.v..v..vv.>v>v..>.....>...vv....>.v..>>.>.....vvvv..vv.vv...v>v.v>....>v.......vvv>..v....vv.>.>>.v>..v..>..>..v>v....v.>
>>.v....>v........v>..>v...>vv>v>>...>.v.v.>>.v.>v>v..>.v.vv..>>..v>>.vv>v>v.>...>>v>v.v>>....>.>>v.>..v>.>>v...>...v>..v>>v..v>.>>.v.>..v>
.....>.>.>..>>>>.v...>>v>vv.>.v>.>..>v...>>.>v........>vvvv.>v..vvv.>>..>.v..v..>.vvv>>.v>>.>>.>>..>.....v.v..>>>.v.>v....>.v..v.>v.>>vvvv>
...>v>>>>>>v>.>>v.v>>vvv.v.>....>>.v....vvvv..>...>.....v..>>....v.v>..>v.>.v.>>...>v....>>>.>..>v..v.v.>..v.>>......v..v..>v.v..v.>.v..>..
.v.vvv...v..>.vvv.v..>>>.>v.v>.v>..v....v..>v..v.>.>>vv..v..v..v>.vv....>>>>..>.v>.v>v>v.v..v..>.>.>.v>>.v....>>vv>.>....>>.v.v.v.>.>.>>.vv
.>vvv.>.>>vv>>>v.>......>v..v>v....v...>>>>..>.>..>v.>>.v...>...v.>v..>.v>.>.vvvv..v.v.>>.v...v....>vvvv.v>vv.>>.vv>>.v.v>..>.vv.>...>v.v>v
vvvv>.v>.>vv....>vv>>.v.>>...>v>vv>...>v.>.v.>>..>v.v..v.>...>vv>...>...v..>>....>v>>v....v.v.>....v>v..>v>v..vv>vvvv.v.v>.>.v.>.>.vv>v..>v
..>..v>v>>.v.>...vvv.v>v.vvv.>>.vv.>.v.v>.>.v>...vv.>v.>.v>.>.v.....v.....>vv>...v..v.>>..>.vv.v..v...>>..>v...vv>>.vv.v>...vv..vv..v.>>vv.
>.>....v..>v>>>.>>.v>v>v..>v.>>v.vv...>...v>.vvv.>v.>.v>v.>.v>.....v..>...>v.>....vv>...v.>...v...>vv..>.>v.vvv>>>>.>....>vv..>.v.>...vv>.>
v.v>>.v>..>>.vv>.v>..>.v.v.>.....>>.>v>..>>...v..>..v..>>>..v.>..vv...v.>..v..v..vv..>>>v>..>...v>>>..vvv>>..v...>..v..vv>v...>.>.v..>v....
v.>>>.>v......v>vv...>vvv.v.>.v.v.....v>.>.v>>.>v.>v.>.>.>>>>vv...v..vv>.>....>...>....>>>..v.vv>v.v.>v..v...>vv>..>...v.>..>..v>..>.>..v.v
vv>.v..v>.v.>...v..vv.>v...>..>.>>..vvvvv>.>>>>.>.....vv..>>...>v...>..>v.>>..v>>.>.vv.>>.>vv>>.>v..vv..>>>.....>....v.......vvv>>v....vv.v
v......vv.vvv.v.vv..>>>.v.v>vv>vvvvvv..>.>..>v>>>....v.v..>.>.>.>...>>.>..>.>v....v.v.>...>.v........>v.>>..>v.>...v>vv>.....v>.v..v.....>.
>.>.>>>.>>v..>..v.....>v.vvv>v.>.....>.v..v...v...vv.v....v>..v>v...vv.v..v>.v>...v....>>....v>v.v>.>v>v..v...v.....v.v>>>..>...>..........
...v.vvv..>>>..v.v>>.......v>>>...>>>.v.v>.v...v.>v>v.v>>>v>>>.>..v...>.vv>>......v.>.>>..>v..vv>.>.v.vv.v>..v..>....v.v>v.....>>v.v.>>v>>v
v>v.v>>.v>>.v.v.v.>.v>vvv>>>.>>vv.v>...v>>>.>v>v..>v.v>>.>.....>>vv..v..>>v>.v....v.vvv...v>vv>...>>..v>v..>>>>v>>...>>v..v>.v.>vv>.v..>.v.
.>v..>...v...v.>....>>>.v...v>vv....v.>...v>.>>.>.......v>>..v>..v....>vv..v..............>.v..v>>.v..>v.v..>.>..>v>.>.vv>..v>.....>>>.v.v.
...>v.v.v.vvv>.>..>>.vvv..>v..v..>>v....v>.>>.v.v....>>.>>.>>.....v.......v>.....v...>v>v.>...v>...v>.v>.>>>...>..>>>v.vv.v>.....v.>.......
vvvv>vv.v.v.>..>vvv......>v.v>vv...vvv.....v>vv...v.vv..>vv.v.vv.>.v>v>..v>.vv.>v>>.v.v..vv.v..v..vv..>v.v.v.>>v.v..v.....>....v.>......>>.
...vv...>.>>......v..v>..v>.v.vv.v..>..vv...>..v.v>...>.>.........>v.>.>...v...v>.>v>.vvv.v>..vv>>.>...>vvv.....>....v.vv.>>>v......>....vv
vvv>>...>.>>vv...v>>>vv>v>>.vv.v>>.>.v....>v>.v>>.vv.>.>.v.v...>>>..v.v.v..>v.>..vv....>.vv>.>v.>>>.vvv.>..v>.vv.>...>......>>v...>vv....>.
.>...>.>v>>.......>..>v>v..>>..v.vv>>>....>>.v......v...>.v...>>>v....>.....>..vv>.v.v.>...>..v>vv>.>.v>v.v...>v..>.......>..v>....v>....v>
>>v..>.v.>.>...v.vv.v>>v>>.>.>.v>.....>..>>.vv>v>vv...v>.v>...v.v.....>.>...>.>.v.vv...>>>v.....>.v....v.>...vv>..v.>v.>.>........>...>...v
.......v>>..>......>v.>..vv...>.>.>vv>>v.>>v.>..>vv>..v.>...>vv.>>..>v>>>>vvv>.v.vv>.>....>v..>v..>vv.>v>.>...>....vv......vv...>vv...vv...
.>v>..>.....v>..>.....>>>...vvvv>..v.vv>.v.>vv>>v>v>.>>>v.vv...>>>>.>.vvv.>>.>..v>.v>v.v>>>>..vv.>.>.........>.vvv.>.v.......v.>......v>..>
.vvv.v.....v.......v>v.vvvv.v>.v>>v>>..>....v>.vv...>v>.v>>>>..v..>>....>.>.v>vvv.vv.vv.vv>.>...vv.v..>v.vv>>>>.v.vv>......v>v>....>...>>.v
...v...>v>vvv>..>>>.>>.>.>>v...vv.v>...v..>v...v.>>.v>>.>.v>.>...v.v.v>...v.>>.....v.v.v>v>v...>..v..>.v.>>v.v..>>.>>..v.vv.>...v>v.>..vvv.
.>.>......>.>..v..>...v.>v>.>......v.vvvv>.>>>.vv.>..>v..>..>..>>...vv>v.>>......vvvv>v...>>..>>>..>vv>..>.>.v...>vvv>>.>>..v>vv>>>vv.vv>>.
...>>>v.>v.v.>.vv.vvv>.v>>.vvv>....>v.v..v.>>v...>v>..vv..>.>>...>v>..vv.>.>v.vvv.v..vv.....vv..>vv>>>>>.vv>.>>>v..>v.v>...>.>>.>>v..vv.>>>
.>v...vv.....>v>.v>>.v....>.....v>.v>.>v>>.....v..v..>>>......>>>.....vv..v...vvv..vv>......>.....>>>...>..vvv....>v.>.>.>.v....v..>...>v>.
v>vvv...>...>>>..v..>....v.v....v>>v>v.>.>>>vv.>.v..>>>.vv....v>>>......v>v.v.>>.v....vv...v>>.v>.>..v..>v.>vv>..v.v.>.vvv..vvvvvv>.>v.>.v.
.vv.vv..vv....>v>.v>>...v.>v>.v>.>..v...>.>.vvv.>.v>..>v.>>v..v.....>vvv.vv.v..>..>v..>..>....v......>.v....>v.>.v>.>v.vvv.v.v..v>>>..>....
.>v>vvv>.>..v...>>.>>v.v..>>...>vv..>vvv.vvv.v.vv.vv..v.>>v.>>>....>>.v.>.....>.>....>>v>......>>..>v....v>...v.......>vv..>.v.v.v.v.v.vv..
>v..v....v>.>v>>...>v....vv>vvv>v..>vvv.v..>vv>.v>..>>vvvv>>.>...>>>>.>.v..>..v...>>..v>>>>.v.>vvv>>.v..v.v.vv.>>v>.>v...v>>...v.v.v....vv.
>.vv>...v.>.>.>.v.vvv>v.>>.>vvv>>.>v>v.v.>>>.>>>v.vv...>..>.>>..>vv...>..v.v.>......>.....vv>v.....vv.>v.>>>vv..v.....v>.v......v>.....v>>v
v..v>>.vv>>>.>>.v..>.vv>.....v>.....vv.>..>v.vv>.>>>.>.>v.v>>.v.>v....>v.vv.......>.>..v>>>....v...>..>>..>..v..>....>>..>..vv.v.>.v.>>>.v>
.>>>>>.>...>>...vv.v>...>>>..>v.vv....>.vv>.>>>>v..vvv.......v...vv...>.v.>....v..v>v>..v.>...>vvvvvv>v...v>.>..>vv..v>v>>..>.>v.v.>>..v...
>vvv>...>v...v>..v..>.>>..vvv.>.v.>>>...>.vv...>v......>>>>vvv>>.>.........>vv.vv..>vv.>>>..>>v>.>.v..v..v.>.>.>.vv.>..>>..v>>.v.>...>...v.
.v..v.>.>>...>>v.v.>.>.>>...>......vv>v..>.v>vvv.vv...>...v.v>>v..v....v.vv>vv>.>>...v.>v>v>.>.v..>v.....>....v.v>.vv.>.v.>v>>.>>....vv.v..
>...v.v.>..v..v>.>.vvv>....>.vv..>v>..>v.>..>>>.>v>>v...v.vv>>v.>v.vv...>v.>vvv..v.>>>.>.v>.>..>>..>..>.>.v....v>..>>.v>v.>...v>>v>...v.>.>
>..v>....>.v>.>vvv.>...>.v....>....>>v..v.v.>.vv>..>.vv>>.v>vv.v>.>v>.>v>>vv.>...vv..>v.>..>..>.....v.v>.>..vvvv.>.vv.vv>.>>..>.vvv..vv.v.v
.>v>v...>..vv..>vv>>..>v...v>>v.>>v..>v>vv...vv..>...vvvvv.....>.>>.>v..>>.>...>.>.v..>.>...>v.....vvv>.>>..>v>>>>.v.>.vvv>.>.>>v>v..v>v..v
..v.vv.v>...v..>.>vv....v.>>.vvv..v.v.v.v.>.v...v>>.>.>>.....>........>vv.>..>>v.>.vv>.v>.vv.....>....>v.v>>.......>.vv..v..v..>.>v..>..v>>
.v>v.>>>v>v....>>vv>....v.>..v>v.v.v>>>v..vv.v>...v>.....v.>..v.>vvvv>v.v.>>v>>vvvv>>>.>.v.>.>...>..v>>...v....>.v..v..v.vvv>.v.>v..v..>>>>
...>v>....>......>>.>..>.>>>.v>.vv.......>..>>>v...>.>.>v>>.>..>v>.>>>>.>...>.>>v>.v.>.vv.v.vv.>.vv....v.vv.v.......>.>>..v.v.vv.>v.vvv>>>.
>.>v.>...>.v>>.>.>........>.v.v.v.>>.....>v.>..v.>.v>>.....>v..vv......v..v.v>vv.v.........v>...>vv..>>>..>v.v.....>vv>....>vv.vv.>v.v..>.>
....>v>>...v.v.v>...>>>v..vv..>.v.v...v>.....>>>..>..>..>.>.>v>v.v.vvv>.......vv.>.>v.v..>>...>..>.v>v.v..v>vvv.....vv..>...>>vv>>>v....>.v
.>v.>v...v..v...>..vvvv.>>....>...>..v..>..>..vvv..v...vv.>..>v.>.....v.v.....v>..>.v.vv..>...vvvv.v...>>>v>.>v>vv>v...>..>>.>>vv..v.vvv.>.
.v>.>v.vv.>.v.v..v.v>v..v>v..>.v...........>.>....>>>...>>>..vvv.>.>.>.>>...v.v>..v>.>>v>.>vvv.>>.>..v..>>>v......>.>.>.v...v>v..v.v>v..>v.
>vv>>v..v..>>v..vv..>.>..>>>.>>vv.v..>v.v.>vvvv>v....>.>.v...v>..v.v....>.>.>vv....>v>v.v.v..v>>>.>>......v..>v>v.v.>>.v>......v..>.vvv>vv.
>>v.>.v>>.>.>.vvv..>v..>.....v.>....vvvv.v>>>.>v>>>v.v...>v.v>..>v..>v..v.vv.>...>v>..v>..v..>>.....>.>.>>.v.v.v>v>.v.vv.v.....v...>v..>>v.
.v.>.....>...>..v.>>.vvv..>v>..>>..>>..>.v......v>>..>v.>vv.....v...v.>>.v....v>.v>.v...vv.v>v.v.vv>vv>vvvv.v.>>.....v>v>...>.v>..>.v.vv>..
.vv.v>>>.vv>.>>.v.v.....>>.....vv.v.>>..v>..v...>...v..v.v.v>..>.v>>...v.v>...v.v>>v.>.v>.>v>>>v.v.>v>v..vv>....>vv.>.v>vvvvv.>v..>v>>...>v
v......v.....>..v>..v>>v..>v.>..>>.v.....v...v.v..>.v.>v>>>>...v>vv....v>.v.v>.vvv...v>>..v>.vv>vv>v.>>...v...>v>>>v>v.>...>.v>v..vv.vv.>..
..>vv.>.....v..v.v>..>..>..>..>v>.>>.>v.v>..>.v.....>v..>v.v..>...v...v>>...>>v..>vv>v......>..v>..>v.>..v.vv.v.v.>>....v..vvvv.>v>>...>>.v
vvv.>v>>v>>>vv>..v.v.>.vv>v.>>v.v...>vvv......>..vv..>v.>>>v....>.>.>>.>.vvvvv.....v>vv.v.vvv>..>vvv..>>>.>......>>v.v.>..>...>.>v.v.....>.
>>.>>...>v..vv.>.vv.v>..v..vv......v>.v>.v>>>>..>v.v..vv.>>>..>.v>.vv>...v.>>v..v>.vv...vv>>.>>.v.>v.>..v..vvvvv..>>v...>v>>vv.vv..v>.>..>.
>vv>>..v>.v>v..>v>>.....>...>..v....vv......>..v...>>v.v>>....>.v.>..vv.v..v>.>....v>>.......vv>..>>>......v.vv...v>>>.>.v>.v>.>..vv..v...v
vv>v...vv.v....>>v.vv.v...vv.>v>.>>>v>.v>v>v......v>.>>..vv.>v>...v.>.v>..>....>.>..>.>.v>....>>..>v.v.....v.vv.>..>.>v.>..v>v>...vv...vv..
.vvvv>..v...v>..>v.v.>>.vv>..v..vv.v>v..v>v...v...v.v>>..v.v....>>>>>vv>>.vvv.....v>v>v>vv.>.v>v>..>>.v.>>.>...>v..>.v..>>.vvv..v.>v.......
v>>vv>.v.v>.vv...>vv...>..v>..vv.>.....v.>>....>..v>..>..vv.>>.>v.vv>>.>..>>vv..>v..>....>>..v.>...v..v.>v>vv.v.......v>>.>>>v.....>>v...vv
vv......v>v>.vvv.>..>v...>...vv...v..>.>..>v>.v...vv.v>..v>v>vv..>v>>vv>..v....v..>v>>>.>.v>.>>v..v...v..v>.>v.>.>>v>....>.>.>.v>.>vv....v>
.>.>>v.>v>..v>v>.>.>..>>v..>...v...>.v>..>>..vv.v.>....v...>>v>>v..>..vv..vv.>.>..v...v>..v.v.>..v.>.vv.>>..vvv.>.>.>>..v.>...>v>.v>>.>.v>v`;

const parseInput = (inputString) => inputString.split('\n').map((oneLine) => oneLine.split(''));

const move = (map) => {

  // Check which eastward-facing sea cucumbers can move
  var whoCanMoveEast = [];
  for (let rowCounter = 0; rowCounter < map.length; rowCounter++) {
    for (let colCounter = 0; colCounter < map[rowCounter].length; colCounter++) {
      const colToCheck = colCounter < map[rowCounter].length - 1 ? colCounter + 1 : 0;
      const currentSpot = map[rowCounter][colCounter];
      const targetSpot = map[rowCounter][colToCheck];
      if (currentSpot === '>' && targetSpot === '.') {
        whoCanMoveEast.push({
          row: rowCounter,
          col: colCounter,
        });
      }
    }
  }
  // Move eastward-facing sea cucumbers
  for (let i = 0; i < whoCanMoveEast.length; i++) {
    const { row, col } = whoCanMoveEast[i];
    const colToCheck = col < map[row].length - 1 ? col + 1 : 0;
    map[row][col] = '.';
    map[row][colToCheck] = '>';
  }
  // Check which south-facing sea cukes can move
  var whoCanMoveWest = [];
  for (let rowCounter = 0; rowCounter < map.length; rowCounter++) {
    for (let colCounter = 0; colCounter < map[rowCounter].length; colCounter++) {
      const rowToCheck = rowCounter < map.length - 1 ? rowCounter + 1 : 0;
      const currentSpot = map[rowCounter][colCounter];
      const targetSpot = map[rowToCheck][colCounter];
      if (currentSpot === 'v' && targetSpot === '.') {
        whoCanMoveWest.push({
          row: rowCounter,
          col: colCounter,
        });
      }
    }
  }
  // Move south-facing sea cukes
  for (let i = 0; i < whoCanMoveWest.length; i++) {
    const { row, col } = whoCanMoveWest[i];
    const rowToCheck = row < map.length - 1 ? row + 1 : 0;
    map[row][col] = '.';
    map[rowToCheck][col] = 'v';
  }

  const numberOfMoves = whoCanMoveEast.length + whoCanMoveWest.length;

  return numberOfMoves;
}

const iterateTillNoMoves = (passedMap) => {
  const referenceMap = JSON.parse(JSON.stringify(passedMap));
  var numberOfMoves = 0;
  var resultingMoves = 1;
  while (resultingMoves > 0) {
    numberOfMoves++;
    resultingMoves = move(referenceMap);
  }
  return numberOfMoves;
}

const printMap = (map) => console.log(map.map((oneRow) => oneRow.join('')).join('\n'));

const testCaseMap = parseInput(testCaseInput);
console.assert(iterateTillNoMoves(testCaseMap) === 58);
console.log(iterateTillNoMoves(parseInput(puzzleInput)));