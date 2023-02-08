import React, { useState, useEffect } from "react";

const EcoHero = () => {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [lives, setLives] = useState(3);

  const [items, setItems] = useState([
    { id: 1, type: "recyclable", image: "https://www.linkpicture.com/q/902104_s00022.jpg" },
    { id: 2, type: "non-recyclable", image: "https://www.linkpicture.com/q/istockphoto-119104612-612x612.jpg" },
    { id: 3, type: "recyclable", image: "https://www.linkpicture.com/q/horizon-reduced-fate.jpg" },
    // More items...
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!selectedItem) {
        const randomIndex = Math.floor(Math.random() * items.length);
        setSelectedItem(items[randomIndex]);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [selectedItem, items]);

  // Function to handle item selection
  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  const handleSort = (category) => {
    if (selectedItem && selectedItem.type === category) {
      setScore(score + 1);
      setSelectedItem(null);
    } else {
      setLives(lives - 1);
      if (lives === 0) {
        setTime(0);
      }
    }
  };


  useEffect(() => {
    if (time === 0) {
      setGameOver(true);
    }
  }, [time]);

  if (gameOver) {
    return (
      <div>
        <h1>Game Over!</h1>
        <p>Your final score is {score}</p>
        <button onClick={() => window.location.reload()}>
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Eco Hero</h1>
      <p>Sort the items into recyclable or non-recyclable categories</p>
      <p>Time remaining: {time}</p>
      <p>Score: {score}</p>
      <div>
      <div>
      {/* Rest of component code omitted for brevity */}
      <div>Lives: {lives}</div>
      <div>
        {selectedItem ? (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img
            src={selectedItem.image}
            onClick={() => handleSelect(selectedItem)}
            alt={`Image of ${selectedItem.type} item`}
          />
        ) : null}
      </div>
      <div>
        <button onClick={() => handleSort("recyclable")}>Recyclable</button>
        <button onClick={() => handleSort("non-recyclable")}>
          Non-Recyclable
        </button>
      </div>
    </div>
      </div>
    </div>
  );
};

export default EcoHero;
