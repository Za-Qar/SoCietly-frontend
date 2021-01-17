//components
import Logo from "../SocialMedia/logo";
import Photo from "../Photos/photos";

//styling
import style from "./intro.module.css";

export default function Intro({ name }) {
  switch (name) {
    case "soc":
      return (
        <div className={style.main}>
          <Photo photo="soc" />
          <h3>School of Code</h3>
          <p>
            Birmingham's Number 1 Tech Bootcamp!
            <br />
            <br />
            Our School of Code Bootcamp is a free 16 week coding course which
            takes people from absolute scratch all the way through to
            professional developer and helps them into jobs. Our online
            prototype platform has seen over 100k users play and learn coding
            skills.
          </p>
          <div className={style.socials}>
            <a
              href="https://www.schoolofcode.co.uk/"
              rel="noreferrer"
              target="_blank"
            >
              <Logo logo="soc" />
            </a>
            &nbsp; {/*this means nonbreaking space and creates a white space*/}
            <a
              href="https://www.linkedin.com/school/school-of-code/"
              rel="noreferrer"
              target="_blank"
            >
              <Logo logo="linkedin" />
            </a>
            &nbsp;&nbsp;
            <a
              href="https://twitter.com/theSchoolOfCode"
              rel="noreferrer"
              target="_blank"
            >
              <Logo logo="twitter" />
            </a>
            &nbsp;
            <a
              href="https://www.instagram.com/theschoolofcode/?hl=en"
              rel="noreferrer"
              target="_blank"
            >
              <Logo logo="instagram" />
            </a>
            &nbsp;
            <a
              href="https://www.facebook.com/schoolofcode/"
              rel="noreferrer"
              target="_blank"
            >
              <Logo logo="fb" />
            </a>
            &nbsp;
            <a
              href="https://blog.schoolofcode.co.uk/"
              rel="noreferrer"
              target="_blank"
            >
              <Logo logo="medium" />
            </a>
          </div>
          <p>
            For direct enquiries, you can also email us on:{" "}
            <a href="mailto: bootcamp@schoolofcode.co.uk">
              bootcamp@schoolofcode.co.uk
            </a>
          </p>
        </div>
      );
    case "ben":
      return (
        <div className={style.main}>
          <Photo photo="ben" />
          <h3>Ben Lee</h3>
          <p>
            Code Coach
            <br />
            <br />
            Hi I’m Ben. I love making things. I used to make music but now I’m
            into tech so that I can make a living.
          </p>
          <div className={style.socials}>
            <a
              href="https://www.linkedin.com/in/b-e-n-l-e-e/"
              rel="noreferrer"
              target="_blank"
            >
              <Logo logo="linkedin" />
            </a>
            &nbsp;&nbsp;
            <a
              href="https://twitter.com/mrbenbot"
              rel="noreferrer"
              target="_blank"
            >
              <Logo logo="twitter" />
            </a>
          </div>
        </div>
      );
    case "chris":
      return (
        <div className={style.main}>
          <Photo photo="chris" />
          <h3>Chris Meah</h3>
          <p>
            Founder and CEO
            <br />
            <br />
            Hi, I'm Chris. My aim is to push technology forwards to benefit
            everyone and help more and different types of people become top tech
            talent. Through the School of Code, we are changing the way people
            learn to code, making it fun, social, and accessible to everyone.
          </p>
          <div className={style.socials}>
            <a
              href="https://www.linkedin.com/in/chrismeah/"
              rel="noreferrer"
              target="_blank"
            >
              <Logo logo="linkedin" />
            </a>
            &nbsp;&nbsp;
            <a
              href="https://twitter.com/TheMeahCat"
              rel="noreferrer"
              target="_blank"
            >
              <Logo logo="twitter" />
            </a>
          </div>
        </div>
      );
    case "devon":
      return (
        <div className={style.main}>
          <Photo photo="devon" />
          <h3>Devon Geary</h3>
          <p>
            Project Manager
            <br />
            <br />I care about connecting people to build businesses, enhance
            team performance, and facilitate inclusive and socially responsible
            growth.
            <br /> Broadly speaking, I enhance performance through
            collaboration.
            <br /> I’m an energetic, enthusiastic, and encouraging leader who
            brings a fair dose of redheaded spunk to my teams to keep things
            fun. I have expertise in trauma-informed Tech and theatre practice
            (TBRIs, specifically) and am passionate about integrating diversity
            and inclusion into every corner of professional life.
          </p>
          <div className={style.socials}>
            <a
              href="linkedin.com/in/devon-geary"
              rel="noreferrer"
              target="_blank"
            >
              <Logo logo="linkedin" />
            </a>
          </div>
        </div>
      );
    case "james":
      return (
        <div className={style.main}>
          <Photo photo="james" />
          <h3>James Greygoose</h3>
          <p>
            Course Assistant
            <br />
            <br />
            Hello, I'm James. I used to be a primary school teacher before
            enrolling on the School of Code in January 2020. I now work as a
            course assistant with the School of Code, helping people to break
            into the awesome world of software development!
          </p>
          <div className={style.socials}>
            <a
              href="https://www.linkedin.com/in/jamesgreygoose/"
              rel="noreferrer"
              target="_blank"
            >
              <Logo logo="linkedin" />
            </a>
            &nbsp;&nbsp;
            <a
              href="https://twitter.com/JamesGreygoose"
              rel="noreferrer"
              target="_blank"
            >
              <Logo logo="twitter" />
            </a>
          </div>
        </div>
      );
    case "kyle":
      return (
        <div className={style.main}>
          <Photo photo="kyle" />
          <h3>Kyle Semple</h3>
          <p>
            Business Development Representative
            <br />
            <br />
            I’m Kyle and my role is to grow the School of Code Network by
            building relationships with forward-thinking businesses across the
            West Midlands!
          </p>
          <div className={style.socials}>
            <a
              href="https://www.linkedin.com/in/kyle-semple-561584171/"
              rel="noreferrer"
              target="_blank"
            >
              <Logo logo="linkedin" />
            </a>
          </div>
        </div>
      );
    case "liz":
      return (
        <div className={style.main}>
          <Photo photo="liz" />
          <h3>Liz Kaufman</h3>
          <p>
            Code Coach
            <br />
            <br />
            Hi, I'm Liz. I studied history and archaeology at uni, which was
            about as useful as it sounds in the project management roles I held
            in offices after that. I learned to code with the School of Code's
            cohort three because code is the closest thing to magic in real
            life, and now I'm a coach at the School of Code sharing that magic
            with our new bootcampers.
          </p>
          <div className={style.socials}>
            <a
              href="https://www.linkedin.com/in/liz-kaufman/"
              rel="noreferrer"
              target="_blank"
            >
              <Logo logo="linkedin" />
            </a>
            &nbsp;&nbsp;
            <a
              href="https://twitter.com/codingbumblebee"
              rel="noreferrer"
              target="_blank"
            >
              <Logo logo="twitter" />
            </a>
          </div>
        </div>
      );
    case "lizzie":
      return (
        <div className={style.main}>
          <Photo photo="lizzie" />
          <h3>Liz Edrop</h3>
          <p>
            Marketing Executive
            <br />
            <br />
            Hey I'm Liz and I work in marketing at the School of Code. Part of
            my job is to help tell the bootcampers' stories and to show their
            progress on this life changing journey that they are on!
          </p>
          <div className={style.socials}>
            <a
              href="https://www.linkedin.com/in/elizabeth-edrop/"
              rel="noreferrer"
              target="_blank"
            >
              <Logo logo="linkedin" />
            </a>
            &nbsp;&nbsp;
            <a
              href="https://twitter.com/EdropLiz"
              rel="noreferrer"
              target="_blank"
            >
              <Logo logo="twitter" />
            </a>
          </div>
        </div>
      );
    case "lucyrose":
      return (
        <div className={style.main}>
          <Photo photo="lucyrose" />
          <h3>Lucy-Rose Walker</h3>
          <p>
            Chief Operating Officer
            <br />
            <br />
            With a background in psychology and a history of working with
            business start-ups I co-founded Entrepreneurial Spark (ES) in 2012
            enabling the mindset of over 4000 entrepreneurs in 12 accelerator
            Hubs across the UK. I’m now supporting the entrepreneurial teaching
            of tech to diverse groups of people at School of Code, helping get
            more and different people into tech. I love long walks with my fur
            baby and cooking (and eating!) Mexican food.
          </p>
          <div className={style.socials}>
            <a
              href="https://www.linkedin.com/in/lucyrosewalker/"
              rel="noreferrer"
              target="_blank"
            >
              <Logo logo="linkedin" />
            </a>
            &nbsp;&nbsp;
            <a
              href="https://twitter.com/LucyRoseW"
              rel="noreferrer"
              target="_blank"
            >
              <Logo logo="twitter" />
            </a>
          </div>
        </div>
      );
    case "patrick":
      return (
        <div className={style.main}>
          <Photo photo="patrick" />
          <h3>Patrick Young</h3>
          <p>
            Business Development Representative
            <br />
            <br />
            Hi I'm Patrick, I used to be in recruitment, but I knew it wasn't
            for me long term as I wanted to build cool apps!
          </p>
          <div className={style.socials}>
            <a
              href="https://www.linkedin.com/in/patrick-young-375960144/"
              rel="noreferrer"
              target="_blank"
            >
              <Logo logo="linkedin" />
            </a>
            &nbsp;&nbsp;
            <a
              href="https://twitter.com/patrickkyoung1"
              rel="noreferrer"
              target="_blank"
            >
              <Logo logo="twitter" />
            </a>
          </div>
        </div>
      );
    case "tao":
      return (
        <div className={style.main}>
          <Photo photo="tao" />
          <h3>Tao Sharma</h3>
          <p>
            Code Coach
            <br />
            <br />
            Hello, my name's Tao. I used to be a social worker. I still want to
            help people, but now I want to do that through code.
          </p>
          <div className={style.socials}>
            <a
              href="https://www.linkedin.com/in/taosharma/"
              rel="noreferrer"
              target="_blank"
            >
              <Logo logo="linkedin" />
            </a>
          </div>
        </div>
      );
    case "tim":
      return (
        <div className={style.main}>
          <Photo photo="tim" />
          <h3>Tim Knight</h3>
          <p>
            Lead Coach
            <br />
            <br />
            Hi I'm Tim, I used to Study Rocks, and now I teach people to make
            Rocks think! I've had 9 years working in the Software Industry and
            look forward to passing on my nuggets of knowledge to new
            Developers.
          </p>
          <div className={style.socials}>
            <a
              href="https://www.linkedin.com/in/knighttp/"
              rel="noreferrer"
              target="_blank"
            >
              <Logo logo="linkedin" />
            </a>
          </div>
        </div>
      );
    default:
      return null;
  }
}
