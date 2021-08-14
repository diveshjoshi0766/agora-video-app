import {
  blue,
  cyan,
  deepOrange,
  deepPurple,
  green,
  orange,
  pink,
  red,
  teal,
  yellow,
} from "@material-ui/core/colors";

export namespace UiUtils {
  const colors = [
    deepOrange[500],
    deepPurple[500],
    green[500],
    yellow[900],
    red[500],
    pink[500],
    teal[500],
    blue[500],
    cyan[900],
    teal[700],
    orange[700],
  ];

  export const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];
}
