import { useState, useRef } from "react";
import ClientDetails from "./components/ClientDetails";
import Dates from "./components/Dates";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainDetails from "./components/MainDetails";
import Notes from "./components/Notes";
import Table from "./components/Table";
import TableForm from "./components/TableForm";
import ReactToPrint from "react-to-print";
import './invoice.css'


function Invoice({title}) {
  const [showInvoice, setShowInvoice] = useState(false)
  const [name] = useState("Admin")
  const [address] = useState("92 Willow St. Harmony Hills Subd 1")
  const [email] = useState("HarmonyHAdmin@gmail.com")
  const [phone] = useState("09284718271")
  const [bankName] = useState("Gcash / Paymaya")
  const [bankAccount] = useState("0928-471-8271 / 4834-4291-3982-0942")
  const [website] = useState("www.facebook/harmonyhills1")
  const [clientName, setClientName] = useState("")
  const [clientAddress, setClientAddress] = useState("")
  const [invoiceNumber, setInvoiceNumber] = useState("")
  const [invoiceDate, setInvoiceDate] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [notes, setNotes] = useState("")
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [amount, setAmount] = useState("")
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)

  const componentRef = useRef()



  
  const handlePrint = () => {
    window.print()
  }

  return (
    <>
      <main className="m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white rounded shadow">
      
      {showInvoice ?   (
          <> 

        <ReactToPrint trigger={() => <button className="bg-green-500 ml-5 text-white font-bold py-2 px-8 rounded shadow border-2 border-green-500 
        hover:bg-transparent hover:text-green-500 transition-all duration-300">
          Print</button>} content={() => componentRef.current}/>

        <div ref={componentRef} className="p-5">
        <Header handlePrint={handlePrint}/>
        <MainDetails name={name} address={address} />
        <ClientDetails clientName={clientName} clientAddress={clientAddress}/>
        <Dates invoiceNumber={invoiceNumber} invoiceDate={invoiceDate} dueDate={dueDate}/>
        <Table description={description} quantity={quantity} price={price} amount={amount} list={list} setList={setList}
        total={total} setTotal={setTotal}/>
        <Notes notes={notes}/>
        <Footer name={name} address={address} website={website} email={email} phone={phone} bankAccount={bankAccount} bankName={bankName}/>
        </div> 

          <button onClick={() => setShowInvoice (false)} className="mt-5 bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 
         transition-all duration-300">Edit Information</button>
          </>
       ) : (
          <>
          {/**name, address, email,Phone number, bank acc, client name, client address, invoice number, invoice date, due date, notes,  */}
         
          <div className="flex flex-col justify center">
      

    
              <article className="md:grid grid-cols-2 gap-10 md:mt-16">
                <div className="flex flex-col">
                  <label htmlFor="clientName">Enter your client's name</label>
                  <input
                    type="text"
                    name="clientName"
                    id="clientName"
                    placeholder="Enter your client's name"
                    autoComplete="off"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="clientAddress">
                    Enter your client's address
                  </label>
                  <input
                    type="text"
                    name="clientAddress"
                    id="clientAddress"
                    placeholder="Enter your client's address"
                    autoComplete="off"
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                  />
                </div>
              </article>

              <article className="md:grid grid-cols-3 gap-10">
                <div className="flex flex-col">
                  <label htmlFor="invoiceNumber">Invoice Number</label>
                  <input
                    type="text"
                    name="invoiceNumber"
                    id="invoiceNumber"
                    placeholder="Invoice Number"
                    autoComplete="off"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="invoiceDate">Invoice Date</label>
                  <input
                    type="date"
                    name="invoiceDate"
                    id="invoiceDate"
                    placeholder="Invoice Date"
                    autoComplete="off"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="dueDate">Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    id="dueDate"
                    placeholder="Invoice Date"
                    autoComplete="off"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </article>

              <article>
                <TableForm description={description}
                setDescription={setDescription}
                quantity={quantity}
                setQuantity={setQuantity}
                price={price}
                setPrice={setPrice}
                amount={amount}
                setAmount={setAmount}
                list={list}
                setList={setList}
                total={total} 
                setTotal={setTotal}
                />
              </article>

              <label htmlFor="notes">Additional Notes</label>
              <textarea
                name="notes"
                id="notes"
                cols="30"
                rows="10"
                placeholder="Additional notes to the client"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>




          <button onClick={() => setShowInvoice (true)}className="bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 
          transition-all duration-300">Preview Invoice</button>
          </div>
          </>
        )}

      
      </main>

    </>
  );
}


export default Invoice;