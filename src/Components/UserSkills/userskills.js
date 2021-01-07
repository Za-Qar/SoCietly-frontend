//styling
import style from "./userSkills.module.css";

export default function UserSkills({ user }) {
  const { skills } = user;

  return (
    skills && (
      <div>
        <h3>Skills: </h3>
        <ul>
          {skills.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      </div>
    )
  );
}
