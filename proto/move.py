grid = [
    [1, 1, 1, 1, 2],
    [1, 2, 2, 1, 2],
    [2, 1, 1, 1, 2],
    [1, 1, 1, 2, 2],
    [1, 1, 1, 1, 2],
]

def neighbors(x, y):
    left = (x-1, y) if x > 0 else None
    right = (x+1, y) if x < len(grid[0])-1 else None
    up = (x, y-1) if y > 0 else None
    down = (x, y+1) if y < len(grid)-1 else None
    return [n for n in (left, right, up, down) if n]

class Path(object):
    def __init__(self, history):
        self.history = history
        self.move_cost = sum(grid[x][y] for x, y in history[1:])
    def __getitem__(self, index):
        return self.history[index]
    def __repr__(self):
        return str(self.history)
    # def step(new_point):
    #     self.history.append(new_point)
    #     self.move_cost += grid[new_point[0]][new_point[1]]

move_range = 2
position = (0, 0)
paths = []
base_paths = [Path([position])]

for i in range(move_range):
    new_base_paths = []
    for path in base_paths:
        for n in neighbors(*path[-1]):
            if n not in path:
                new_path = Path(path.history + [n])
                if new_path.move_cost < move_range:
                    new_base_paths.append(new_path)
                elif new_path.move_cost == move_range:
                    paths.append(new_path)
    paths.extend(base_paths)
    base_paths = new_base_paths

print(paths)
