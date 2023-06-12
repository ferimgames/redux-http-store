import { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import Card from "../UI/Card/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const { isLoading, error, sendRequest } = useHttp();
  useEffect(() => {
    const transformMeals = (mealObj) => {
      const loadedMeals = [];

      for (const mealKey in mealObj) {
        loadedMeals.push({
          id: mealKey,
          name: mealObj[mealKey].name,
          description: mealObj[mealKey].description,
          price: mealObj[mealKey].price,
        });
      }
      setMeals(loadedMeals);
    };
    sendRequest(
      {
        url: "https://react-http-6513c-default-rtdb.firebaseio.com/Meals.json",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      transformMeals
    );
  }, [sendRequest]);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      {!isLoading && !error && (
        <Card>
          <ul> {mealsList}</ul>{" "}
        </Card>
      )}

      {isLoading && <p> Is Loading ....</p>}
      {error && <p>{error}</p>}
    </section>
  );
};

export default AvailableMeals;
