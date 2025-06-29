import levels from '../level data/levels.json'
export function getLevelDataById(id) {
  return levels.find(level => level.id === Number(id)) || null;
}