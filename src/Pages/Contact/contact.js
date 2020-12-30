//staff images
import ben from "../../Images/BenLee.jpeg";
import joe from "../../Images/JoeTrodden.jpeg";

//components
import Logo from "../../Components/SocialMedia/logo";

export default function Contact() {
  return (
    <div>
      <h3>School of Code</h3>
      <p>Accounts for Birmingham's Number 1 Tech Bootcamp</p>
      <a
        href="https://www.schoolofcode.co.uk/"
        rel="noreferrer"
        target="_blank"
      >
        <Logo logo="soc" />
      </a>
      <a
        href="https://www.linkedin.com/school/school-of-code/"
        rel="noreferrer"
        target="_blank"
      >
        <Logo logo="linkedin" />
      </a>
      <a
        href="https://twitter.com/theSchoolOfCode"
        rel="noreferrer"
        target="_blank"
      >
        <Logo logo="twitter" />
      </a>
      <a
        href="https://www.instagram.com/theschoolofcode/?hl=en"
        rel="noreferrer"
        target="_blank"
      >
        <Logo logo="instagram" />
      </a>
      <a
        href="https://www.facebook.com/schoolofcode/"
        rel="noreferrer"
        target="_blank"
      >
        <Logo logo="fb" />
      </a>
      <a
        href="https://blog.schoolofcode.co.uk/"
        rel="noreferrer"
        target="_blank"
      >
        <Logo logo="medium" />
      </a>
      <p>
        For direct enquiries, you can also email us on:{" "}
        <a href="mailto: bootcamp@schoolofcode.co.uk">
          bootcamp@schoolofcode.co.uk
        </a>
      </p>
      <h3>Chris Meah</h3>
      <p>Founder and Lead Coach</p>
      <a
        href="https://www.linkedin.com/in/chrismeah/"
        rel="noreferrer"
        target="_blank"
      >
        <Logo logo="linkedin" />
      </a>
      <a href="https://twitter.com/TheMeahCat" rel="noreferrer" target="_blank">
        <Logo logo="twitter" />
      </a>
      <br />
      <img src={ben} height="100" width="100" alt="Ben Lee" />
      <h3>Ben Lee</h3>
      <p>Code Coach</p>
      <a
        href="https://www.linkedin.com/in/b-e-n-l-e-e/"
        rel="noreferrer"
        target="_blank"
      >
        <Logo logo="linkedin" />
      </a>
      <a href="https://twitter.com/mrbenbot" rel="noreferrer" target="_blank">
        <Logo logo="twitter" />
      </a>
      <h3>Liz Kaufman</h3>
      <p>Course Assistant/Coach</p>
      <a
        href="https://www.linkedin.com/in/liz-kaufman/"
        rel="noreferrer"
        target="_blank"
      >
        <Logo logo="linkedin" />
      </a>
      <a
        href="https://twitter.com/codingbumblebee"
        rel="noreferrer"
        target="_blank"
      >
        <Logo logo="twitter" />
      </a>
      <h3>Tao Sharma</h3>
      <p>Course Assistant/Coach</p>
      <a
        href="https://www.linkedin.com/in/taosharma/"
        rel="noreferrer"
        target="_blank"
      >
        <Logo logo="linkedin" />
      </a>
      <h3>Liz Edrop</h3>
      <p>Marketing Executive</p>
      <a
        href="https://www.linkedin.com/in/elizabeth-edrop/"
        rel="noreferrer"
        target="_blank"
      >
        <Logo logo="linkedin" />
      </a>
      <a href="https://twitter.com/EdropLiz" rel="noreferrer" target="_blank">
        <Logo logo="twitter" />
      </a>
      <h3>Kyle Semple</h3>
      <p>Business Development Representative</p>
      <a
        href="https://www.linkedin.com/in/kyle-semple-561584171/"
        rel="noreferrer"
        target="_blank"
      >
        <Logo logo="linkedin" />
      </a>
      <h3>Patrick Young</h3>
      <p>Representative</p>
      <a
        href="https://www.linkedin.com/in/patrick-young-375960144/"
        rel="noreferrer"
        target="_blank"
      >
        <Logo logo="linkedin" />
      </a>
      <a
        href="https://twitter.com/patrickkyoung1"
        rel="noreferrer"
        target="_blank"
      >
        <Logo logo="twitter" />
      </a>
      <h3>James Greygoose</h3>
      <p>Representative</p>
      <a
        href="https://www.linkedin.com/in/jamesgreygoose/"
        rel="noreferrer"
        target="_blank"
      >
        <Logo logo="linkedin" />
      </a>
      <a
        href="https://twitter.com/JamesGreygoose"
        rel="noreferrer"
        target="_blank"
      >
        <Logo logo="twitter" />
      </a>
      <br />
      <img src={joe} height="100" width="100" alt="Joe Trodden" />
      <h3>Joe Trodden</h3>
      <p>CEO - The Entrepreneur's Ally</p>
      <a
        href="https://www.linkedin.com/in/joetrodden/"
        rel="noreferrer"
        target="_blank"
      >
        <Logo logo="linkedin" />
      </a>
    </div>
  );
}
