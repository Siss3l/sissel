import Particle from "./Particle.tsx";
import Term from "./Term.jsx";


function App() {
    /**
     * This functional component accepts data in the form of `props` (as `children` being a special `prop`) and returns React elements.
     * 
     * @default React.ReactElement
     */
    return (
        <div>
            <Particle/>
            <Term/>
        </div>
    );
}

export default App;