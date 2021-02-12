const createGuest = ():string => {
  const animals = ['Giraffe', 'Penguin', 'Dog', 'Cat', 'Lion', 'Zebra', 'Turtle', 'Goldfish', 'Eagle'];
  const adjectives = ['Big', 'Small', 'Hairy', 'Smelly', 'Ninja', 'Sniper', 'Vegan', 'President', 'God'];
  const animalChoice = animals[Math.floor(Math.random() * (animals.length - 1))];
  const adjectiveChoice = adjectives[Math.floor(Math.random() * (adjectives.length - 1))];
  const string = adjectiveChoice + animalChoice + Math.floor(Math.random() * 100);
  return string;
};

export default createGuest;
