import "./userlist.css"
import Transaction from "../transaction/transaction"

const Transactionlist = ({title}) => {
  return (
    <>
    
    <div className="list">
      <div className="listContainer">
      <div className="top">
          <h1>{title}</h1>
        </div>
        <Transaction/>      
      </div>
    </div>
    </>
  )
}

export default Transactionlist