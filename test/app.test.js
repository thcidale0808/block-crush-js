import { expect } from 'chai';
import { BlockGrid, Block } from '../app/main';



describe("BlockGrid", function() {
  let blockGrid
  let grid
  let deleteBlocks  
  this.beforeEach(() => {
    blockGrid = new BlockGrid();
    grid =[]
    deleteBlocks =[]
    for (let x = 0; x < 10; x++) {
      const col = [];
      for (let y = 0; y < 10; y++) {
        const block = new Block(x, y)
        if ((y==0)&&(x>=1)&&(x<3)){
          block.colour = 'blue'
          deleteBlocks.push(block)
        }else{
          block.colour = 'yellow'
        }
        col.push(block);
      }
      grid.push(col);
    }
  })

  describe('getNeighbours', () =>{
    it('returns the neighbours to either side and above',() => {
      blockGrid.grid = [...grid]
      const block = new Block(2,1)
      const neighbours = blockGrid.getNeighbours(block)
      expect(neighbours.length).to.be.equal(4)
      let sides = 0
      let upOrDown = 0 
      neighbours.forEach((neighbour) => {
        if(neighbour.y ===block.y){
          sides+=1
        }else if (neighbour.x ===block.x){
          upOrDown+=1
        }
      })
      expect(sides).to.be.equal(2)
      expect(upOrDown).to.be.equal(2)
    });
  });


  describe('getSameColourNeighbours', () =>{
    it('returns the neighbours only on the sides with the same color',() => {
      blockGrid.grid = [...grid]
      const block = new Block(2,0)
      block.colour = 'blue'
      const neighbours = blockGrid.getSameColourNeighbours(block)
      console.log(neighbours)
      let sides = 0
      let upOrDown = 0 
      neighbours.forEach((neighbour) => {
        if(neighbour.y ===block.y){
          sides+=1
        }else if (neighbour.x ===block.x){
          upOrDown+=1
        }
      })
      expect(neighbours.length).to.be.equal(1)
      expect(sides).to.be.equal(1)
      expect(upOrDown).to.be.equal(0)
    });
  });

  describe('getAllBlocksToDelete', () =>{
    it('returns all blocks that need to be deleted',() => {
      blockGrid.grid = [...grid]
      const block = new Block(2,0)
      block.colour = 'blue'
      const blocksToDelete = blockGrid.getAllBlocksToDelete(block)
      
      expect(blocksToDelete.length).to.be.equal(3)
    });
  });

  describe('getTotalBlocksForColumn', () =>{
    it('returns correct quantity of cells that will be deleted for a column',() => {
      blockGrid.grid = [...grid]
      const blockOne = new Block(2,0)
      const blockTwo = new Block(2,1)
      const blockThree = new Block(1,1)
      const columnsToBeDeleted = []
      columnsToBeDeleted.push(...[blockOne, blockTwo, blockThree])
      const qtyCellsDeleted = blockGrid.getTotalBlocksForColumn(columnsToBeDeleted, 2)
      
      expect(qtyCellsDeleted).to.be.equal(2)
    });
  });

  describe('updateColumnsFromGrid', () => {
    it('should ensure that the 3 straight blue blocks in the first row are replaced by yellow blocks and respective columns are dropped one row',()=>{
      blockGrid.grid = [...grid]
      blockGrid.updateColumnsFromGrid(deleteBlocks)
      for (let x = 0; x < 10; x++) {
        const col = [];
        for (let y = 0; y < 10; y++) {
          if ((y==9)&&(x>=1)&&(x<3)){
            expect(blockGrid.grid[x][y].colour).to.be.equal('white')
            expect(blockGrid.grid[x][y].clickable).to.be.false
          }else{
            expect(blockGrid.grid[x][y].colour).to.be.equal('yellow')
            expect(blockGrid.grid[x][y].clickable).to.be.true
          }
        }
      }
    });
  });
});
