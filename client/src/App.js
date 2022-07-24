import Landing from './pages/Landing/Landing'
import Home from './pages/Home/Home';
import "./App.css"
import { BrowserRouter, Route, Routes} from "react-router-dom"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/"     element={<Landing />}/>
                <Route exact path="/home" element={<Home />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
