const initialState = {
    formData: {},
};

function formReducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_FORM_DATA':
            return {
                ...state,
                formData: action.payload,
            };
        default:
            return state;
    }
}

export default formReducer;