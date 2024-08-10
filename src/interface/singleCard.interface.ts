import { choice } from "./common.interface";

export interface props {
  card: choice;
  handleChoice: (value: choice) => void;
  flipped: boolean;
  disabled: boolean;
}
