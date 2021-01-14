//images
import codingheroes from "../../Images/coding.png";
import codenewbie from "../../Images/codenewbie.png";
import itch from "../../Images/itch.jpg";
import medium from "../../Images/Medium.png";
import mdn from "../../Images/mdn.png";
import spinks from "../../Images/spinks.png";
import stack from "../../Images/stackoverflow.png";
import stackify from "../../Images/stackify.jpg";
import syntax from "../../Images/syntax.png";
import testing from "../../Images/testing.png";
import ui from "../../Images/ui.png";
import w3 from "../../Images/w3.png";

import style from "./resources.module.css";

export default function ResourcesPage() {
  return (
    <div>
      <h3>Resources</h3>
      <div className={style.links}>
        <div className={style.card}>
          <a
            href="https://blog.schoolofcode.co.uk/"
            rel="noreferrer"
            target="_blank"
          >
            <img src={medium} alt="Medium logo" height="250" />
          </a>
          <h4>Check out School Of Codes blog.</h4>
          <p>
            Medium is an open platform where readers find dynamic thinking, and
            where expert and undiscovered voices can share their writing on any
            topic. Keep up to date with the School of Code and follow their
            blogs for community events and cohort updates.
          </p>
        </div>
        <div className={style.card}>
          <a
            href="https://www.wearespinks.com/"
            rel="noreferrer"
            target="_blank"
          >
            <img src={spinks} alt="Spinks logo" />
          </a>
          <h4>
            Spinks are School Of Code's recruitment partner, see their website
            providing current job opportunities.
          </h4>
          <p>
            At Spinks, we connect talent with a growth mindset to industry
            disruptors and leaders across the technology landscape. We pride
            ourselves on continually adapting our solutions to meet the specific
            needs of the start-up and scale-up market.
            <br />
            <br />
            Our commitment to inclusion and diversity has been championed for
            over a decade through our initiative, #YouEqualTech and annual
            Diversity & Inclusion events.
          </p>
        </div>
        <div className={style.card}>
          <a href="https://www.w3schools.com/" rel="noreferrer" target="_blank">
            <img src={w3} alt="W3 Schools logo" height="250" />
          </a>
          <h4>The Worlds largest web developer site.</h4>
          <p>
            W3Schools is a training website for learning web technologies
            online. Content includes tutorials and references relating to HTML,
            CSS, JavaScript, JSON, PHP, Python, AngularJS, React.js, SQL,
            Bootstrap, Sass, Node.js, jQuery, XQuery, AJAX, XML, Raspberry Pi,
            C++, C# and Java.
          </p>
        </div>
        <div className={style.card}>
          <a
            href="https://developer.mozilla.org/"
            rel="noreferrer"
            target="_blank"
          >
            <img src={mdn} alt="MDN Web logo" height="250" />
          </a>
          <h4>Documentation repository for web developers.</h4>
          <p>
            MDN Web Docs are provided to provide developers with the information
            they need to easily build projects on the web platform. They
            envision a world where everyone developing for the web follows open
            standards. MDN provide a resource to learn and improve your tech
            skills.
          </p>
        </div>
        <div className={style.card}>
          <a
            href="http://codingheroes.io/resources/"
            rel="noreferrer"
            target="_blank"
          >
            <img src={codingheroes} alt="Coding heroes logo" height="300" />
          </a>
          <h4>Coding tutorials for everyone.</h4>
          <p>
            All courses are structured around real-world projects, so that you
            get the real coding experience that you need. Learn and understand
            more code, with personal support offered by the course tutors.
            Perfect for coders at all levels!
          </p>
        </div>
        <div className={style.card}>
          <a
            href="https://insights.stackoverflow.com/survey/2020"
            rel="noreferrer"
            target="_blank"
          >
            <img src={stack} alt="Stack Overflow logo" width="300" />
          </a>
          <br />
          <h4>
            The largest, most trusted online community for developers to learn,
            share​ ​their programming ​knowledge, and build their careers.
          </h4>
          <p>
            Stack Overflow is a question and answer site for professional and
            enthusiast programmers. You are encouraged to participate on here to
            improve your coding knowledge and meet other tech enthusiastics! Ask
            dev help questions when you are unsure, and pay back by helping
            others where possible!
          </p>
        </div>
        <div className={style.card}>
          <a
            href="https://stackify.com/pair-programming-advantages/"
            rel="noreferrer"
            target="_blank"
          >
            <img src={stackify} alt="Stackify logo" width="300" />
          </a>
          <h4>Better code, better deployments, fewer fires.</h4>
          <p>
            Find assistance in troubleshooting your code and seeking advice for
            working in the tech community. Validate the behaviour of your code,
            catching problems before production using QA and DevOps, and deploy
            your application with confidence!
          </p>
        </div>
        <div className={style.card}>
          <a
            href="https://www.codenewbie.org/"
            rel="noreferrer"
            target="_blank"
          >
            <img src={codenewbie} alt="CodeNewbie logo" width="300" />
          </a>
          <h4>
            A support community of programmers and people learning to code.
          </h4>
          <p>
            An amazing resource for programmers just starting in their new
            career. Listen to podcasts from experienced coders, read blog posts
            to gain knowledge and show your support to other users who are also
            starting out on their journey. Be part of an awesome community!
          </p>
        </div>
        <div className={style.card}>
          <a
            href="https://ui.dev/newsletters/react/"
            rel="noreferrer"
            target="_blank"
          >
            <img src={ui} alt="UI DEV logo" width="300" />
          </a>
          <h4>Master the JavaScript ecosystem.</h4>
          <p>
            An incredible resource for expanding your knowledge and learning
            more. UI.Dev offers courses for TypeScript, React with TypeScript,
            React, React Hooks, Modern JS, Advanced JS, Redux, React Router v4
            and React Router v5.{" "}
          </p>
        </div>
        <div className={style.card}>
          <a href="https://syntax.fm/" rel="noreferrer" target="_blank">
            <img src={syntax} alt="Syntax logo" width="300" />
          </a>
          <h4>A tasty treats podcast for web developers.</h4>
          <p>
            Led by two seasoned web developers, Syntax offers not only a
            podcast, but a Reactathon Live where experienced programmers share
            their knowledge with listeners. A great resource, particularly for
            those who prefer to listen and absorb. Syntax can be accessed almost
            anywhere!
          </p>
        </div>
        <div className={style.card}>
          <a
            href="https://testing-library.com/docs/react-testing-library/cheatsheet/"
            rel="noreferrer"
            target="_blank"
          >
            <img src={testing} alt="Testing Library logo" height="200" />
          </a>
          <h4>
            Simple and complete testing utilities that encourage good testing
            practices.
          </h4>
          <p>
            Use this brilliant testing resource to write maintainable tests and
            develop with confidence using features that are accessible by
            default. Built-in selectors find elements the way users do to help
            you write inclusive code. The Testing Library is a light-weight
            solution for testing without all the implementation details!{" "}
          </p>
        </div>
        <div className={style.card}>
          <a href="https://itch.io/jams" rel="noreferrer" target="_blank">
            <img src={itch} alt="Game Jams logo" height="200" />
          </a>
          <h4>Make cool games with other gameplay programmers.</h4>
          <p>
            At itch.io, Game Jams allow you to work on games within a specified
            time limit. You can work alone or in a team, but the idea must be
            fresh and you can't use old content! Participants make a video game
            from scratch and usually consist of programmers, game designers,
            artists, writers, and others in game development-related fields.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
