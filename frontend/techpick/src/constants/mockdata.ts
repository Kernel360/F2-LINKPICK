type Entry = {
  id: string;
  type: 'folder' | 'pick';
  children?: Entry[];
  name: string;
  folderId?: number; // folder에만 적용
  pickId?: number; // pick에만 적용
};

let id = 1;
let pickId = 1;
let folderId = 1;

const nextId = () => (id++).toString();
const nextPickId = () => pickId++;
const nextFolderId = () => folderId++;

const pick = (name: string): Entry => ({
  id: nextId(),
  name,
  type: 'pick',
  pickId: nextPickId(),
});

const folder = (name: string, ...children: Entry[]): Entry => ({
  id: nextId(),
  name,
  type: 'folder',
  folderId: nextFolderId(),
  children,
});

export const dynamicMockData = [
  folder('Favorites'),
  pick('React Hooks'),
  pick('aaa'),
  folder(
    'Frontend',
    folder(
      'React',
      pick('React Hooks'),
      pick('React Router'),
      pick('React Context')
    ),
    folder('TypeScript', pick('TypeScript Basics'), pick('Advanced Types')),
    folder('CSS', pick('Flexbox'), pick('Grid Layout'))
  ),
  folder(
    'Backend',
    folder('Node.js', pick('Express.js'), pick('Nest.js')),
    folder('Databases', pick('MongoDB'), pick('PostgreSQL')),
    folder('Docker', pick('Docker Basics'), pick('Docker Compose'))
  ),
  folder('Full Stack', folder('React'), folder('Node.js'), folder('Databases')),
];

export const mockData = [
  {
    id: '1',
    type: 'folder',
    data: { folderId: 1, name: 'Favorites', flag: 2 },
  },
  {
    id: '2',
    type: 'folder',
    data: { folderId: 1, name: 'Frontend', flag: 2 },
    children: [
      {
        id: '3',
        name: 'React',
        type: 'folder',
        children: [
          { id: 'b1a', name: 'React Hooks', type: 'link' },
          { id: 'b1b', name: 'React Router', type: 'link' },
          { id: 'b1c', name: 'React Context', type: 'link' },
        ],
      },
      {
        id: '4',
        name: 'TypeScript',
        type: 'folder',
      },
    ],
  },
  {
    id: '5',
    name: 'Full Stack',
    type: 'folder',
    children: [
      { id: 'd1', name: 'React', type: 'folder' },
      { id: 'd2', name: 'Node.js', type: 'folder' },
      { id: 'd3', name: 'Databases', type: 'folder' },
    ],
  },
];

export const newMockData = [
  {
    id: '1',
    type: 'folder',
    data: { folderId: 1, name: 'Favorites' },
  },
  {
    id: '2',
    type: 'folder',
    data: { folderId: 2, name: 'Frontend' },
    children: [
      {
        id: '3',
        type: 'folder',
        data: { folderId: 3, name: 'React' },
        children: [
          {
            id: '4',
            type: 'pick',
            data: { pickId: 4, name: 'React Hooks' },
          },
        ],
      },
      {
        id: '5',
        type: 'folder',
        data: { folderId: 5, name: 'TypeScript' },
      },
    ],
  },
];
