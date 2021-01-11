import MyEvents from "../../Pages/MyEvents/myEvents";

//styling
import style from "./userEvents.module.css";
import cn from "classnames";

export default function UserEventsContainer() {
  return (
    <div>
      <label for="skills" className={cn(style.labelHeader)}>
        My Events
      </label>
      <div className={cn(style.container)}>
        <MyEvents profile />
      </div>
    </div>
  );
}
