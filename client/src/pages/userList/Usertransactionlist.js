import "./userlist.css"
import UserTransaction from "../transaction/Usertransaction"

const UserTransactionlist = ({title}) => {
  return (
    <>
    
    <div className="list">
      <div className="listContainer">
      <div className="top">
          <h1>{title}</h1>
        </div>
        <UserTransaction/>      
      </div>
    </div>
    </>
  )
}

export default UserTransactionlist