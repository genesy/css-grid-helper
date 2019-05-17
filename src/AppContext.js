// TODO: turn into redux

import { useState, createContext } from 'react';

const defaultCss = (`html {
  background: red
}
`);

// const [css, setCss] = useState(defaultCss);
// const [settings, setSettings] = useState()



const AppContext = createContext()

export default AppContext;
