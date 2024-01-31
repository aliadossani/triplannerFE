import { useState } from "react";
import { TextInput, Button, Select } from "@mantine/core";

const ChangeGrocery = ({
  handleAddGrocery,
  handleEditGrocery,
  userId,
  trip,
  grocery = {},
  setGroceryAdded,
}) => {
  const { name, quantity, label, image } = grocery;
  const [newGrocery, setNewGrocery] = useState({
    name: name || "",
    quantity: quantity || "",
    label: label || "",
    image: image || "",
  });


  const handleChange = async (event) => {
    const { name, value } = event.target;
    setNewGrocery((prevGrocery) => ({ ...prevGrocery, [name]: value }));
  };

    return (
        <>
            <div>
                <TextInput label="Name" name="name" defaultValue={newGrocery.name} onChange={handleChange} />
                <TextInput label="Quantity" name="quantity" defaultValue={newGrocery.quantity} onChange={handleChange} />
                <TextInput label="Image" name="image" defaultValue={newGrocery.image} onChange={handleChange} />
                <Select
                    label="Label"
                    name="label"
                    placeholder="Select a label"
                    defaultValue={newGrocery.label}
                    data={['Someone will bring it', 'Needs to be purchased']}
                    onChange={(event) => setNewGrocery((prevGrocery) => ({ ...prevGrocery, "label": event }))}
                />
                <Button mt="md" fullWidth onClick={(event) => {
                    if(grocery?.name) {
                        handleEditGrocery(event, newGrocery)
                    } else {
                        handleAddGrocery(event, newGrocery)
                        setGroceryAdded(true);
                    }
                    }}>
                    {
                        grocery?.name ? "Edit Grocery" : "Add Grocery"
                    }
                </Button>
            </div>
        </>
    )
}

export default ChangeGrocery;
