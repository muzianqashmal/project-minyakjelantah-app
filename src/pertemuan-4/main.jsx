import { createRoot} from "react-dom/client";
import "./tailwindcss.css";
import FrameworkList from "./FrameworkList";
import FrameworkListSearchFilter from "./FrameworkListSearchFilter";
import ResponsiveDesign from "./ResponsiveDesign";

createRoot(document.getElementById("root")).render(
    <div>
        {/* <FrameworkList/> */}
        {/* <FrameworkListSearchFilter/> */}
        <ResponsiveDesign/>
        
    </div>
)