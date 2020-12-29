export default function SocialMedia({ social }) {
  return (
    social && (
      <div>
        <h5>Social Media</h5>
        <ul>
          {social.map((item) => {
            const newItem = JSON.parse(item);
            const [[social, link]] = Object.entries(newItem);

            return (
              <a href={link} rel="noreferrer" target="_blank">
                {" "}
                <h6 key={item}>{social}</h6>{" "}
              </a>
            );
          })}
        </ul>
      </div>
    )
  );
}
