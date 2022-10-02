import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy,setFilterBy] = useState("All");

  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    setFoods([...foods,newFood]);
    console.log(newFood);
  }

  const foodsToDisplay = foods.filter((food)=> {
    if(filterBy === "All"){
      return true;
    }
    else {
      return food.cuisine === filterBy;
    }
  })

  function handleClick(id){
    const newFoodArray = foods.filter((food) => food.id !== id);
    setFoods(newFoodArray);
  }

  function addHeat(id){
    const newFoodArray = foods.map((food) => {
      if (food.id === id) {
        return {
          ...food,
          heatLevel: food.heatLevel + 1,
        };
      } else {
        return food;
      }
    });
    setFoods(newFoodArray);
  }

  function handleFilterChange(event){
    setFilterBy(event.target.value)
  }

  const foodList = foodsToDisplay.map((food) => (
    <div key={food.id} style={{"display" : "flex"}}>
      <li onClick={() => addHeat(food.id)}>
        {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
      </li>
        <button onClick={() => handleClick(food.id)}>Remove Meal</button>
    </div>
  ));

  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <select name="filter" onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="American">American</option>
          <option value="Sichuan">Sichuan</option>
          <option value="Thai">Thai</option>
          <option value="Mexican">Mexican</option>
    </select>

      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;
