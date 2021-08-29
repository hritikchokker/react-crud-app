import { INVENTORY_ACTIONS } from '../constants';
export function inventoryReducer(state, action) {
    switch (action.type) {
        case INVENTORY_ACTIONS.ADD_ITEM:
            if (state.inventoryList.find(el => el.name === action.payload.name)) {
                return { ...state }
            } else {
                state.inventoryList.push(action.payload)
                return { ...state }
            }
        case INVENTORY_ACTIONS.UPDATE_ITEM:
            const { index, data } = action.action;
            state.inventoryList.splice(index, 1, data);
            return { ...state }
        case INVENTORY_ACTIONS.SET_EDITABLE_ITEM: {
            const { index } = action.action;
            const itemDetail = state.inventoryList[index]
            state.currentEditableItem = itemDetail;
        }
            return { ...state, itemIsInUpdation: true }
        case INVENTORY_ACTIONS.REMOVE_EDITABLE_ITEM:
            return { ...state, itemIsInUpdation: false, currentEditableItem: null }
        case INVENTORY_ACTIONS.GET_DETAILS:
            const itemDetails = state.inventoryList.find(el => el.id === action.id);
            return { ...state, isCurrentEditableItem: itemDetails }
        case INVENTORY_ACTIONS.REMOVE_ITEM:
            state.inventoryList.splice(action.index, 1)
            return { ...state }
        default:
            return { ...state }
    }
}



