const favoriteThings = ["Cleo", 420, true, "\u2606"];

//console.log(favoriteThings);

//write a .forEach loop
favoriteThings.forEach((element, index, array) => console.log(element, index));

//turn tem all to strings and make them say: "Ooh I like " + favoriteThing

/*
favoriteThings.forEach((favoriteThing, index) => {
    favoriteThings[index] = "Ooh I like " + favoriteThing;
});
*/

const newFavoriteThings = [];

favoriteThings.forEach(favoriteThing => newFavoriteThings
    .push(`Ooh I like ${favoriteThing}`));

//console.log(favoriteThings)
//console.log(newFavoriteThings)
 
//map retunere en ny liste uden side effects. auto paralissers ens liste.
const subjectiveFavoriteThings = favoriteThings
.map(favoriteThing => (`Ooh I like ${favoriteThing}`));
//console.log(subjectiveFavoriteThings);

//console.log(favoriteThings.find(420))

const longFavoriteThings = favoriteThings
.filter(favoriteThing => favoriteThing.length > 3);
//console.log(longFavoriteThings);
