const COLOURS = ['red', 'green', 'blue', 'yellow'];
const MAX_X = 10;
const MAX_Y = 10;

export class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
    this.clickable = true;
  }
}

export class BlockGrid {
  constructor() {
    this.grid = [];

    for (let x = 0; x < MAX_X; x++) {
      const col = [];
      for (let y = 0; y < MAX_Y; y++) {
        col.push(new Block(x, y));
      }

      this.grid.push(col);
    }
  }

  redrawBlock(blockEl, block) {
    const { x, y, colour } = block;

    blockEl.id = `block__${x}x${y}`;
    blockEl.className = `block block__${colour}`;
  }

  getNeighbours(block) {
    
    const neighbours= this.grid.reduce((result, row) =>{
      const neighbours = row.filter((rowBlock) => {
        return (((rowBlock.x === block.x+1) || (rowBlock.x === block.x-1))&&(rowBlock.y===block.y)) 
          || (((rowBlock.y === block.y+1)||(rowBlock.y === block.y-1))&&(rowBlock.x === block.x))
      })
      result.push(... neighbours)
      return result
    },[])
    return neighbours
  }

  getSameColourNeighbours(block) {
    
    const sameColorsBlocks = []
    const allNeigbours = this.getNeighbours(block)
    return allNeigbours.filter((possibleBlock) => {
      
      return possibleBlock.colour === block.colour
    })
  }

  render(grid = document.querySelector('#gridEl')) {
    const el = grid.cloneNode(false);

    grid.parentNode.replaceChild(el, grid);
    
    for (let x = 0; x < MAX_X; x++) {
      const id = 'col_' + x;
      const colEl = document.createElement('div');
      colEl.className = 'col';
      colEl.id = id;
      el.appendChild(colEl);

      for (let y = MAX_Y - 1; y >= 0; y--) {
        const block = this.grid[x][y];
        const blockEl = document.createElement('div');

        if (block.clickable) {
          blockEl.addEventListener('click', (evt) =>
            this.blockClicked(evt, block)
          );
        }

        colEl.appendChild(blockEl);
        this.redrawBlock(blockEl, block);
      }
    }

    return this;
  }

  getAllBlocksToDelete(block){
    const blocksToBeRemove =[]
    const sameColorNeighbours = this.getSameColourNeighbours(block)||[]
    
    let queueBlockPath = [].concat(sameColorNeighbours)
    
    if (sameColorNeighbours.length>0){
      blocksToBeRemove.push(...[block,...sameColorNeighbours])  
    }

    while (queueBlockPath.length >0){
      let neighbours = this.getSameColourNeighbours(queueBlockPath[0])
      if (neighbours.length>0){
        let filteredNeighbours = neighbours.filter((blockNeighbour) => {
          return blocksToBeRemove.indexOf(blockNeighbour)<0
        })
        queueBlockPath.push(...filteredNeighbours) 
        blocksToBeRemove.push(...filteredNeighbours)
      }
      queueBlockPath.shift()
    }
    return blocksToBeRemove
  }
  
  getTotalBlocksForColumn(blocksToBeRemove, x){
    
    const qtyColumns = blocksToBeRemove.reduce((total, block) =>{
      if (block.x === x){
        total+=1
      }
      return total
    }, 0)
    return qtyColumns
  }

  updateColumnsFromGrid (blocks){
    
    const queueMoves =[]
    queueMoves.push(...blocks)
    while (queueMoves.length >0){
      const toRemoveBlock = queueMoves[0]
      const y = toRemoveBlock.y+this.getTotalBlocksForColumn(blocks, toRemoveBlock.x)
      if (y < MAX_Y){
        this.grid[toRemoveBlock.x][toRemoveBlock.y].colour = this.grid[toRemoveBlock.x][y].colour
        queueMoves.push(this.grid[toRemoveBlock.x][y])
      }else{
        this.grid[toRemoveBlock.x][toRemoveBlock.y].colour = 'white'
        this.grid[toRemoveBlock.x][toRemoveBlock.y].clickable = false
      }
      queueMoves.shift()
    }
  }

  blockClicked(e, block) {
    //Get a list of blocks which has all neighbours with the same color
    const blocksToRemove = this.getAllBlocksToDelete(block)
    
    //Update grid to remove blocks and drop respective columns 
    this.updateColumnsFromGrid(blocksToRemove)
    
    this.render();
  }
}
