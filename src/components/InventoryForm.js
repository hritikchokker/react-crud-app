import {
    InputField,
    Button
} from '../common';
import {
    useState,
    useContext,
    useEffect
} from 'react';
import { INVENTORY_ACTIONS } from '../constants';
import {
    InventoryDispatchContext,
    InventoryContext
} from '../store';
import '../form.css';
export function InventoryForm(props) {
    const numberRegex = new RegExp(/^[0-9]*$/);
    const initialState = {
        name: '',
        description: '',
        price: 0
    }
    const [isEdit, setisEdit] = useState(false)
    const [getError, setError] = useState({});
    const inventoryDispatcher = useContext(InventoryDispatchContext)
    const { currentEditableItem, itemIsInUpdation, inventoryList } = useContext(InventoryContext)
    const [formFields, setFormFields] = useState(initialState)
    const handleSubmit = (e) => {
        e.preventDefault();
        const flag = handleValidations();
        if (!flag) {
            if (itemIsInUpdation) {
                const index = inventoryList.findIndex(el => el.name === formFields['name'] || el.description === formFields['description']);
                inventoryDispatcher({ type: INVENTORY_ACTIONS.UPDATE_ITEM, action: { index, data: { ...formFields } } })
                inventoryDispatcher({ type: INVENTORY_ACTIONS.REMOVE_EDITABLE_ITEM })
            } else {
                inventoryDispatcher({ type: INVENTORY_ACTIONS.ADD_ITEM, payload: { ...formFields } })
            }
            setFormFields(initialState);
            console.log(formFields, 'state obk')
        } else {
            return;
        }
    }
    const handleValidations = () => {
        const errors = {};
        let flag = false;
        if (formFields['name'] === '') {
            errors['name'] = 'Name is Required';
            flag = true;
        }
        if (formFields['description'] === '') {
            errors['description'] = 'Description is Required';
            flag = true;
        }
        if (formFields['price'] == 0) {
            errors['price'] = 'Description is Required';
            flag = true;
        } else {
            if (!numberRegex.test(formFields['price'])) {
                errors['price'] = 'Price Must can only contain a number';
                flag = true;
            }
        }
        setError(errors);
        return flag;
    }
    useEffect(() => {
    }, [formFields])
    useEffect(() => {
        if (itemIsInUpdation) {
            setisEdit(true)
            setFormFields({ ...currentEditableItem })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemIsInUpdation, isEdit])
    return (
        <>
            <form onSubmit={handleSubmit}>
                <InputField
                    name="name"
                    value={formFields['name']}
                    valueUpdator={(tn, tv) => setFormFields({ ...formFields, [tn]: tv })}
                    validationArr={['required', 'minLength']}
                    fieldSetter={setFormFields}
                    type="text"
                    placeholder="Name"
                />
                {
                    getError && getError['name'] && getError['name'].length > 0 ?
                        <p>{getError['name']}</p> : null
                }
                <InputField
                    name="description"
                    value={formFields['description']}
                    valueUpdator={(tn, tv) => setFormFields({ ...formFields, [tn]: tv })}
                    validationArr={['required', 'minLength']}
                    fieldSetter={setFormFields}
                    type="text"
                    placeholder="Description"
                />
                {
                    getError && getError['description'] && getError['description'].length > 0 ?
                        <p>{getError['description']}</p> : null
                }
                <InputField
                    fieldSetter={setFormFields}
                    type="text"
                    value={formFields['price']}
                    validationArr={['required', 'minLength', 'pattern']}
                    pattern={'^[0-9]*$'}
                    valueUpdator={(tn, tv) => setFormFields({ ...formFields, [tn]: tv })}
                    name="price"
                    placeholder="Price"
                />
                {
                    getError && getError['price'] && getError['price'].length > 0 ?
                        <p>{getError['price']}</p> : null
                }
                <Button className="inventory-submit" type="submit" text={isEdit ? 'Edit' : 'Add'} />
            </form>
        </>
    )
}