import store from '../main';

store.subscribe(isAdmin);

const coach = store.getState().coach;

export function isAdmin(){
    return coach['currentuser']['admin']
}
