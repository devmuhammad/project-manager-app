export interface ProgrammingLanguages {
  name: string;
  position: number;
  paradigm: string;
  symbol: string;
}
const initalState ={
  ELEMENT_DATA:[
  {position: 1, name: 'Introduction to C#', paradigm: 'OOP', symbol: 'C#'},
  {position: 2, name: 'Angular', paradigm: 'Scrypting', symbol: 'A'},
  {position: 3, name: 'React', paradigm: 'Scrypting', symbol: 'React'},
  {position: 4, name: 'Redux', paradigm: 'State Manager', symbol: 'RR'},
  {position: 5, name: 'ECMA Script', paradigm: 'Scrypting', symbol: 'ES'},
  {position: 6, name: 'Waterfall', paradigm:'Model' , symbol: 'W'},
  {position: 7, name: 'Prototyping', paradigm: 'Model', symbol: 'P'},
  {position: 8, name: 'SDLC', paradigm: 'Process', symbol: 'SDLC'},
  {position: 9, name: 'Mongo Db', paradigm: 'Database', symbol: 'MGDB'},
  {position: 10, name: 'GraphSql', paradigm: 'Database', symbol: 'GSql'}] as ProgrammingLanguages[]
}

export const project = (state = initalState, action) => {
  switch (action.type) {
    case 'NEW_PROJECT':
      return state;
    default:
      return state;
  }
}
