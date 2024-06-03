import React from 'react';
import MainComponent from "./component/MainComponent";
import { SpeedInsights } from "@vercel/speed-insights/react"
function App() {
  return (
      <div className="">
          {/*<RegisteredUsers />*/}
        <MainComponent />
          <SpeedInsights />

      </div>
  );
}

export default App;
