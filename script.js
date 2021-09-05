let url = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json"

let gamesData



let svg = d3.select('#canvas')
let tooltip = d3.select('#tooltip')

let treeMap = () => {

let hierarchy = d3.hierarchy(gamesData, (node)=>{
    return node['children']
}).sum((node)=>{
    return node['value']
}).sort((node1,node2) => {
    return node2['value'] - node1['value']
})

let createTreeMap = d3.treemap()
                      .size([1000,600])

 createTreeMap(hierarchy)  

 //arrary of leaves

 let gamesTiles = hierarchy.leaves()
 //cant put text in svg elements    
 let block = svg.selectAll('g') 
    .data(gamesTiles)
    .enter()
    .append('g')
    .attr("transform",(game)=>{
        return 'translate(' +game['x0'] + ', ' + game['y0'] +')'
    })

    block.append('rect')
         .attr("class","tile")
         .attr('fill', (game)=>{
             let category = game['data']['category']
             if(category === "Wii"){
                 return "#C29BA3"
             }else if(category ==="NES"){
                 return "#FFE4C9"
             }else if(category ==="GB") {
                 return "#B7EAF7"
             }else if (category ==="DS"){
                 return "#8A9BA7"
             }else if(category === "X360"){
                 return "#E5BFB7"
             }else if (category === "PS3"){
                 return "#CAB3C1"
             }else {
                 return "#D7E2EA"
             }
         })
         .attr("data-name",(game)=>{
             return game['data']['name']
         })
         .attr("data-category",(game)=>{
            return game['data']['category']
        })
        .attr("data-value",(game)=>{
            return game['data']['value']
        })
        .attr("width",(game)=>{
            return game['x1']-game['x0']
        })
        .attr("height",(game)=>{
            return game['y1']-game['y0']
        })


        .on("mouseover",(game)=>{
            tooltip.transition()
            .style("visibility","visible")
            tooltip.text(game['data']['value'])
            tooltip.attr("data-value",(game['data']['value']))
        })      
        .on("mouseout",(game)=>{
            tooltip.transition()
            .style("visibility","hidden")
        })

         block.append('text')
              .text((game)=>{
                  return game['data']['name']
              })
              .attr("x",5)
              .attr('y',20)

        
              



}

d3.json(url).then(
    (data , error) => {
if (error){
    console.log(error)
} else {
    gamesData = data
    treeMap()
}
    }
)