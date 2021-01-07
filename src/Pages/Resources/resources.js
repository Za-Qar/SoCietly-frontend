import style from "./resources.module.css";

export default function ResourcesPage() {
  return (
    <div>
      <h3>Resources</h3>
      <div id="links">
        <div id="Spinks">
          <a href="https://www.wearespinks.com/" rel="spinks link">
            Spinks
          </a>
          <p>
            Spinks are School Of Code's recruitment partner, see their website
            providing current job opportunities.
          </p>
        </div>
        <div id="W3Schools">
          <a href="https://www.w3schools.com/" rel="w3schools link">
            W3Schools
          </a>
          <p>The Worlds largest web developer site.</p>
        </div>
        <div id="MDNWeb">
          <a href="https://developer.mozilla.org/" rel="MDN Web Docs">
            MDN Web Docs
          </a>
          <p>Documentation repository for web developers.</p>
        </div>
        <div id="SOCBlog">
          <a href="https://blog.schoolofcode.co.uk/" rel="SOC blog">
            SOC Blog
          </a>
          <p>Check out School Of Codes blog.</p>
        </div>
      </div>
    </div>
  );
}
