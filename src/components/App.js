import { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';

import foodsSrc from '../foods.json';

import Foodbox from './Foodbox';
import Form from './Form';
import SearchBar from './SearchBar';
import TodaysFoods from './TodaysFoods';

function App() {
  const [foodsBkp, setFoodsBkp] = useState(foodsSrc);
  const [foods, setFoods] = useState(foodsSrc);
  const [showForm, setShowForm] = useState(false);
  const [todaysFoods, setTodaysFoods] = useState([]);

  // Toda vez que o foodBkp receber uma nova comida, atualize também o foods
  useEffect(() => {
    setFoods([...foodsBkp]);
  }, [foodsBkp]);

  function filterFoods(searchTerm) {
    // Jogando o state de comidas atuais pra ser a lista completa novamente (resetando pra lista completa) quando a busca estiver vazia

    const filtered = foodsBkp.filter((currentFoodObj) => {
      return (
        currentFoodObj.name
          .toLowerCase()
          // O includes sempre retorna true quando recebe uma string vazia para comparar
          .includes(searchTerm.toLowerCase())
      );
    });

    setFoods(filtered);
  }

  function addTodaysFood(foodObj) {
    setTodaysFoods([...todaysFoods, foodObj]);
  }

  return (
    <div className="container">
      <h1 className="title">IronNutrition</h1>
      <div>
        <SearchBar filterFoods={filterFoods} />
      </div>
      <div className="column">
        <button
          onClick={() => setShowForm(!showForm)}
          className="button is-link"
        >
          Add Food
        </button>
        {showForm ? <Form foods={foodsBkp} setFoods={setFoodsBkp} /> : null}
      </div>

      <div className="columns">
        <div className="column">
          {foods.map((currentFoodObj) => (
            <Foodbox
              key={currentFoodObj.name}
              name={currentFoodObj.name}
              calories={currentFoodObj.calories}
              image={currentFoodObj.image}
              addTodaysFood={addTodaysFood}
            />
          ))}
        </div>
        <div className="column content">
          <TodaysFoods todaysFoods={todaysFoods} />
        </div>
      </div>
    </div>
  );
}

export default App;
