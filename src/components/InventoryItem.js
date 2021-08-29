
import { useContext, useEffect, useState } from "react";
import { InventoryDispatchContext, InventoryContext } from '../store';
import { INVENTORY_ACTIONS } from '../constants';
export default function InventoryItem({ index, data: { name, description, price } }) {
    const { itemIsInUpdation, currentEditableItem } = useContext(InventoryContext);
    const [btnDisabled, setbtnDisabled] = useState(false)
    const dispatcher = useContext(InventoryDispatchContext)
    useEffect(() => {
        if (itemIsInUpdation) {
            if (currentEditableItem.name === name || currentEditableItem.description === description || currentEditableItem.price === price) {
                setbtnDisabled(true);
            }
        } else {
            setbtnDisabled(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemIsInUpdation, currentEditableItem])
    const handleEdit = (e) => {
        e.preventDefault()
        dispatcher({ type: INVENTORY_ACTIONS.SET_EDITABLE_ITEM, action: { index } })
    }
    const handleDelete = (e) => {
        e.preventDefault();
        dispatcher({ type: INVENTORY_ACTIONS.REMOVE_ITEM, action: { index } })
    }
    return (
        <>
            <tbody >
                <tr>
                    <td>{name}</td>
                    <td>{description}</td>
                    <td>{price}</td>
                    <td>
                        <button disabled={btnDisabled} onClick={handleEdit} >Edit</button>
                        <button disabled={btnDisabled} onClick={handleDelete} >Delete</button>
                    </td>
                </tr>
            </tbody>
        </>
    )
}
