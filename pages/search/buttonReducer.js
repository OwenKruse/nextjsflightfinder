import { combineReducers } from 'redux';
import reducer from "./reducer";

const initialState = {
    buttonClicked: false,
};

function buttonReducer(state = initialState, action) {
    switch (action.type) {
        case 'BUTTON_CLICKED':
            return {
                ...state,
                buttonClicked: true,
            };
        default:
            return state;
    }
}

export default combineReducers({
    button: buttonReducer,
    reducer,
});

