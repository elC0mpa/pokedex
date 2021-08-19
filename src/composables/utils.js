const getColorFromType = (type) => {
  let color = "";
  switch (type.toLowerCase()) {
    case "grass":
      color = "darkgreen";
      break;

    case "fire":
      color = "tomato";
      break;

    case "water":
      color = "rgb(50, 189, 235)";
      break;

    case "bug":
      color = "rgb(11, 139, 11)";
      break;

    case "poison":
      color = "purple";
      break;

    case "normal":
      color = "grey";
      break;

    case "flying":
      color = "rgb(81, 166, 199)";
      break;

    case "dark":
      color = "darkgray";
      break;

    case "dragon":
      color = "darkblue";
      break;

    case "electric":
      color = "rgb(255, 176, 29)";
      break;

    case "fairy":
      color = "pink";
      break;

    case "fighting":
      color = "crimson";
      break;

    case "ghost":
      color = "blueviolet";
      break;

    case "ground":
      color = "peru";
      break;

    case "ice":
      color = "rgb(51, 127, 129)";
      break;

    case "psychic":
      color = "palevioletred";
      break;

    case "rock":
      color = "sandybrown";
      break;

    case "steel":
      color = "steelblue";
      break;

    default:
      break;
  }
  return color;
};

export { getColorFromType };
