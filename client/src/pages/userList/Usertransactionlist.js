import "./userlist.css"
import UserTransaction from "../transaction/Usertransaction"

const UserTransactionlist = ({title}) => {
  return (
    <>
    
    <div className="listuser">
      <div className="listContainer">
        
        <UserTransaction/>      
      </div>
    </div>
    </>
  )
}

export default UserTransactionlist