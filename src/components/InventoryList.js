import { useContext, useEffect } from "react";
import { InventoryContext } from '../store/InventoryContext';
import InventoryItem from './InventoryItem';
import '../common/table-style.css';
export function InventoryList(props) {
    const { inventoryList } = useContext(InventoryContext);
    useEffect(() => {
        console.log(inventoryList, 'what is context')
    }, [inventoryList])
    return (
        <>
            {
                inventoryList.length > 0 ?
                    <div>
                        <table id="inventory">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            {inventoryList.map((el, index) => (
                                <InventoryItem index={index} key={index} data={el} />
                            ))}
                        </table>
                    </div>
                    :
                    <div>
                        <h4>No Item Found in Inventory</h4>
                    </div>
            }
        </>
    )
}
