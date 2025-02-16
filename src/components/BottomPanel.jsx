import ItemsTable from './ItemsTable';
import '../styles/components/BottomPanel.css'
import { useSelector } from 'react-redux';


function BottomPanel(params) {

  const items = useSelector((state) => state.selections.filteredItems);

  
    return (
      <div className = "bottom-panel">
        <ItemsTable items = {items}/>
      </div>
    );
  }
  
  export default BottomPanel;
  