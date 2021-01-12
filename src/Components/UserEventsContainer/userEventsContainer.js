import MyEvents from "../../Pages/MyEvents/myEvents";

//styling
import style from "./userEvents.module.css";
import cn from "classnames";

export default function UserEventsContainer() {
  return (
    <div>
      <div className={cn(style.container)}>
        <p className={cn(style.labelHeader)}>My Events</p>
        <MyEvents profile />
      </div>
    </div>
  );
}
