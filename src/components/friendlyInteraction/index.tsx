import * as React from "react";
import PieNotice from "./modules/PieNotice";
import PieDrag from "./modules/PieDrag";
import AreaSelect from "./modules/AreaSelect";

export default class FriendlyInteraction extends React.Component {
  public render() {
    return <div>
      <AreaSelect />
      <PieDrag />
      <PieNotice />
    </div>
  }
}