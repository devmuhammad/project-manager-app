export interface Client {
    name: string;
    contactphone: string;
    contactemail: string; contactperson: string; weburl: string;
    id: number;
}
const initalState = {
    ELEMENT_DATA: [
        { id: 1, name: 'Wise Concept', contactphone: '08132090390', contactemail: 'ayowise@app.com', contactperson: 'Wise onoja', weburl: 'wiseman.com' },
        { id: 2, name: 'Luna works', contactphone: '090293929394', contactemail: 'luna@gmail.com', contactperson: 'Lunary man', weburl: 'luna.com' },
        { id: 3, name: 'Bajinatu Baleys', contactphone: '090302049539', contactemail: 'baleysb@app.com', contactperson: 'Baba Big', weburl: 'baleysb.com' },
        { id: 4, name: 'Apple world', contactphone: '+44109304993', contactemail: 'i@apple.com', contactperson: 'whiteguy', weburl: 'whiteguy.com' },
        { id: 5, name: 'Payroll System', contactphone: '+333423434', contactemail: 'pay@rolapp.com', contactperson: 'Pay manager', weburl: 'payrol@app.com' },
        { id: 6, name: 'Kid Schools', contactphone: '090320320404', contactemail: 'kidschoolz@app.com', contactperson: 'Principal ', weburl: 'kidz@school.com' },
        { id: 7, name: 'Songs Book', contactphone: ' +4343302030202', contactemail: 'admin@spngsbook.com', contactperson: 'Admin', weburl: 'songsappbook.com' },
        { id: 8, name: 'Traders Association', contactphone: '070353302204', contactemail: 'trades@gmail.com', contactperson: 'Trade Manager', weburl: 'trades.com.ng' }
    ]
};

export const clients = (state = initalState, action) => {
    return state;
};