//styling
import style from "./userSkills.module.css";
import cn from "classnames";
import Tags from "../../MaterialUi/tags/tags";

export default function UserSkills({ user }) {
  const { skills } = user;

  return (
    skills && (
      <div>
        <div name="skills" className={cn(style.container)}>
          <p className={cn(style.labelHeader)}>Skills</p>
          <ul className={cn(style.skillContainer)}>
            {skills.map((item) => {
              return (
                <div className={cn(style.skillTag)}>
                  <Tags item={item} showDelete />
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    )
  );
}
