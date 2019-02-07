const add_Gun = '加机关枪';
const remove_Gun = '减机关枪';

// reducer
export function counter(state=0, action) {
    switch (action.type) {
        case add_Gun:
            return state + 1;
        case remove_Gun:
            return state - 1;    
        default:
            return 10;
    }
}

export function addGun() {
    return {type: add_Gun}
}

export function removeGun(){
    return {type: remove_Gun}
}

export function addGunAsync() {
    return dispatch => {
        setTimeout(() => {
            dispatch(addGun()) 
        }, 2000);       
    }
}