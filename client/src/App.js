import Landing from './pages/Landing/Landing'
import Home from './pages/Home/Home';
import MobileChatWindow from './pages/MobileChatWindow/MobileChatWindow';
import FriendRequests from './pages/FriendRequests/FriendRequests';
import "./App.css"
import { BrowserRouter, Route, Routes} from "react-router-dom"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/"                     element={<Landing />} />
                <Route exact path="/home"                 element={<Home />} />
                <Route       path="/home/:username"       element={<MobileChatWindow />} />
                <Route exact path="/home/friend-requests" element={<FriendRequests />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
