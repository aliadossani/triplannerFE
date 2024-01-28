import { IconEdit, IconTrash } from '@tabler/icons-react';

import classes from "../styles/GroceryList.module.css";

const GroceryList = ({trip, handleDeleteGrocery, handleEditGroceryModal}) => {
    if(!trip?.groceries?.length) return  <p>No groceries available.</p>;
    return (
      <>
      <h3>Grocery List</h3>
      {
        trip.groceries.map((grocery, index) => (
            <div className={classes.groceryCard} key={index}>
            <div className={classes.cardContent}>
                <div className={classes.groceryHeaderCtn}>
                    <p className={classes.groceryName}>{grocery.name} ({grocery.quantity})</p>
                </div>
                <div className={classes.groceryLabelCtn}>
                    <p className={grocery.label === "Needs to be purchased" ? classes.groceryRedLabel : classes.groceryGreenLabel}>{grocery.label}</p>
                </div>
                </div>
            <div>
                <IconTrash className={classes.ctaBtn} onClick={() => handleDeleteGrocery(grocery._id)} />
                <IconEdit className={classes.ctaBtn} onClick={() => handleEditGroceryModal(grocery)}  />
            </div>
         </div>
        ))
        }
    </>  
    )

};

export default GroceryList;