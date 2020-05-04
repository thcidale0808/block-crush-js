# Front-end code task
### Getting started

```sh
# Install dependencies
yarn
# Start the app in watch mode on port 3001
yarn start
# Start the tests in watch mode on port 3002
yarn test
```

Your task is to create a game similar to candy crush.

When you click on a block with one or more neighbours of the same colour, blocks with matching color are removed.
If the same-color neighbours of the block you clicked have same color neighbours, remove these too.
After you removed the blocks, the remaining blocks above the ones removed need to fall down.

Feel free to use whatever libs you need to make it all work.

### Example

Given the following simplified 5x5 game grid:

![game grid](https://bitbucket.org/xmachinas/front-end-code-task/raw/e2abea37ea9a19c7e4be6632c08b2d783a7a2b73/example/game_grid_start.png)

After clicking any of the yellow blocks in the blue highlighted area:

![game grid](https://bitbucket.org/xmachinas/front-end-code-task/raw/e2abea37ea9a19c7e4be6632c08b2d783a7a2b73/example/game_grid_start_highlighted.png)

You should end up with a grid that looks like this:

![game grid](https://bitbucket.org/xmachinas/front-end-code-task/raw/e2abea37ea9a19c7e4be6632c08b2d783a7a2b73/example/game_grid_first_click.png)

After clicking any of the remaining red blocks you should end up with this:

![game grid](https://bitbucket.org/xmachinas/front-end-code-task/raw/9208d5c922341a47f9c08e248f760910eb4d850c/example/game_grid_second_click.png)

After clicking any of the remaining yellow blocks you should end up with an empty grid.

