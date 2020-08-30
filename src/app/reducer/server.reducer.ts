export interface ServerAccount {
    [index: number]: { id: number; provider: string; charges: number };
}

export interface serverCredentials {
  [index: number]: { id: number; username: string; password:string; ipAddress: string,OS:string,servername:string,Type:string,accountid:number };
}
export interface serverTools {
  [index: number]: { utilid: number; Database: string; applicationserver:string; credentialid: number };
}

export interface serverApplications {
  [index: number]: {appid:number, utilid: number; applicationname: string; };
}

const initalState ={
  ACCOUNT:[
  {id: 1, name: 'ComsoftLtd.net', provider: 'AWS', charges: '24054'},
  {id: 2, name: 'Demo.comsoft.ng', provider: 'QServers Ltd', charges: '4300'},
  {id: 3, name: 'ComsoftLtd.com', provider: 'Blue Ocean', charges: '650050'},
  // {id: 4, name: 'Taxmanager.zar', provider: 'Dubai Saat', charges: '32019'},
  // {id: 5, name: 'Payroll.com', provider: 'CongLi Net', charges: '10949'},
  // {id: 6, name: 'Schoool.edu', provider:'Beng Moub' , charges: '4094'},
  // {id: 7, name: 'Payment Gateway', provider: 'Pega Lion', charges: '5060'},
  // {id: 8, name: 'doorsat.com', provider: 'doors and Net', charges: 'In 12300'},
  // {id: 9, name: 'potfolio.com', provider: 'Personal Content', charges: '50000'},
  // {id: 10, name: 'webgammer.io', provider: 'Convicts.io', charges: '300'}
],
CREDENTIALS:[
  {id: 1, username: 'aliyu@appmail.com', password:'p*****',ipAddress:'192.0.0.80.101',OS:'windows',servername:'PortO1',Type:'TESTING',accountid:'1'},
  {id: 2, username: 'muhammad@comsoftltd.com', password:'pa*****',ipAddress:'192.2.0.80.102',OS:'Ubuntu',servername:'Port20',Type:'PRODUCTION',accountid:'2'},
  {id: 3, username: 'dauda@appmail.com', password:'xx*****',ipAddress:'192.0.0.80.103',OS:'windows',servername:'Port11',Type:'TESTING',accountid:'3'},
  {id: 4, username: 'yackub@appmail.com', password:'xc*****',ipAddress:'192.0.0.80.104',OS:'Mac Os',servername:'DOca2',Type:'STAGING',accountid:'5'},
  // {id: 5, username: 'embash@gmail.com', password:'x*****',ipAddress:'192.0.0.80.105',OS:'',servername:'Bold',Type:'TESTING',accountid:'4',},
  // {id: 6, username: 'cert@school.edu.ng', password:'c*****',ipAddress:'192.0.0.80.106',OS:'windows',servername:'Port23',Type:'PRODUCTION',accountid:'6'},
  // {id: 7, username: 'james@comsoftltd.com', password:'c*****',ipAddress:'192.0.0.80.107',OS:'windows',servername:'Port32',Type:'PRODUCTION',accountid:'8'},
  // {id: 8, username: 'doorsat@appmail.com', password:'s*****',ipAddress:'192.0.0.80.109',OS:'Ubuntu',servername:'Port22',Type:'STAGING',accountid:'7',},
  // {id: 9, username: 'fahaddotin@gmail.com', password:'d*****',ipAddress:'192.1.0.80.1',OS:'Ubuntu',servername:'Hostweb',Type:'PRODUCTION',accountid:'9'},
  // {id: 10, username: 'mubby@gmail.com', password:'q*****',ipAddress:'192.0.2.80.102',OS:'windows',servername:'Hostinger',Type:'TESTING',accountid:'10'},
],
TOOLS:[
  {utilid:1,Database:'Postgres',applicationserver:'Apache',credentialid:'2'},
  {utilid:2,Database:'Monogodb',applicationserver:'Resin',credentialid:'1'},
  {utilid:3,Database:'Mysql',applicationserver:'Wildfly',credentialid:'3'},
  {utilid:4,Database:'Firebase',applicationserver:'Glass fish',credentialid:'4'},
  {utilid:5,Database:'Graphql',applicationserver:'JBoss Enterprise Application',credentialid:'5'},
],
APPLICATIONS:[
  {appid:1,utilid:1,applicationname:'Capsole Project'},
  {appid:2,utilid:4,applicationname:'Comsoft School Portal'},
  {appid:3,utilid:2,applicationname:'Document Manager'},
  {appid:4,utilid:3,applicationname:'Payroll'},
  {appid:5,utilid:6,applicationname:'To Do App'},
]
}

export const server = (state = initalState, action) => {
  // switch (action.type) {
  //   case 'NEW_PROJECT':
  //     return state;
  //   default:
  //     return state;
  // }
  return state;
}
