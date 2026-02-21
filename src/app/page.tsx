import React from "react";

import { Button } from "@/components/ui/button";

const Home = (): React.JSX.Element => (
  <div className="h-screen w-max flex justify-center items-center">
    <Button href={"/about"}>About</Button>
  </div>
);

export default Home;
