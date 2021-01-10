//styling
import "./loading.css";

import SignInSVG from "../../Pages/SignInUser/background";

export default function Loading() {
  return (
    <div>
      <SignInSVG />
      <div className="loading-container">
        <div class="sk-swing sk-center">
          <div class="sk-swing-dot"></div>
          <div class="sk-swing-dot"></div>
        </div>
      </div>
    </div>
  );
}
